class WalletAssets extends HTMLElement {

    shadow = this.attachShadow({ mode: "open" });

    constructor() {
        super();

        this.shadow.appendChild(this.createHTML());
        this.createStyles("../app/components/walletAssets/walletAssets-style.css");
        this.showModal()
    }

    createHTML() {
        const template = `
            <div class="modal-overlay" id="modalOverlay">
           
                <div class="modal-content">
                    <button class="close-button" id="closeButton">&times;</button>
                    <h2 id="titleAssets">Detalhes dos Ativos</h2>
                    <div class="wait">
                        <spinner-component></spinner-component>
                    </div>
                    <canvas id="assetChart"></canvas>
                </div>
            </div>
        `;

        const componentRoot = document.createElement("div");
        componentRoot.setAttribute("class", "wallet-assets-component");
        componentRoot.innerHTML = template;
        return componentRoot;
    }

    createStyles(...linksUser) {
        linksUser.forEach(e => {
            const link = this.createLink(e);
            this.shadow.appendChild(link);
        });
    }

    createLink(linkStyle) {
        const link = document.createElement("link");
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("href", linkStyle);
        return link;
    }

    showModal() {
        const modalOverlay = this.shadow.querySelector("#modalOverlay");
        modalOverlay.classList.add("active");
        const closeButton = this.shadow.querySelector("#closeButton");
        closeButton.addEventListener("click", () => {
            modalOverlay.classList.remove("active");
        });
        this.renderChart();
    }

    async renderChart() {
        let assetArray = JSON.parse(localStorage.getItem("walletAssets"));
        if(assetArray === null){
            this.shadow.querySelector("#assetChart").remove()
            this.shadow.querySelector(".wait").remove()
            this.shadow.querySelector("#titleAssets").innerHTML = "Nenhum ativo encontrado"
            return
        }
    
        const ctx = this.shadow.querySelector("#assetChart").getContext("2d");
    
        const resolvedData = await Promise.all(
            assetArray.map(async asset => {
                const valueAsset = await this.getValueAsset(asset.AssetName, asset.AssetType);
                let finalValue = valueAsset * asset.AssetQuantity ;
                return Number(finalValue).toFixed(2); 
            })
        );
        this.shadow.querySelector(".wait").remove()
    
        const labels = assetArray.map(asset => asset.AssetName);
    
        new Chart(ctx, {
            type: "pie",
            data: {
                labels: labels,
                datasets: [{
                    data: resolvedData,
                    backgroundColor: [
                        "#4BC0C0",
                        "#36A2EB",
                        "#FFCE56",
                        "#FF9F40",
                        "#9966FF",
                        "#FF6384"
                    ],
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: "bottom",
                    },
                    labels: {
                        color: "#FF9F40",
                        boxWidth: 50,
                        boxHeight: 20, 
                        padding: 10 
                    },
                    tooltip: {
                        callbacks: {
                            label: function (tooltipItem) {
                                return `${tooltipItem.label}: ${tooltipItem.raw}`;
                            }
                        }
                    }
                }
            }
        });
    }
    
    async getValueAsset(name, type) {
        const url = this.buildUrl(type, name);
        if (url === "") {
            return 1; 
        }
    
        try {
            const response = await fetch(url);
            if (!response.ok) {
                console.error("Erro na requisição");
                return 1; 
            }
    
            const data = await response.json();
            if (type === "SHARE") {
                return data['CloseShare'];
            }
            if (type === "COIN") {
                name = name.replace("-", "");
                return data[name]?.bid || 1;
            }
            if (type === "CRYPTO") {
                return data[0]?.last || 1;
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
            return 1; 
        }
    }
    
    buildUrl(type,name) {
        let url = ""
        if (type === "SHARE") {
            url = `${getUrl()}/data/share/?shareName=${name}`
        } else if (type === "COIN") {
            url = `https://economia.awesomeapi.com.br/json/last/${name}`
        } else if (type === "CRYPTO") {
            url = `https://api.mercadobitcoin.net/api/v4/tickers?symbols=${name}`
        }else{
            url = ""
        }

        return url
    }
}

customElements.define("wallet-component", WalletAssets);

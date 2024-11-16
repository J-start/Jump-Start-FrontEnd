class AssetGraphic extends HTMLElement {
    shadow = this.attachShadow({ mode: "open" });

    constructor() {
        super();

        this.shadow.appendChild(this.createHTML());
        this.createStyles("app/components/assetGraphic/assetGraphic-style.css");
        this.createStyles("app/components/assetGraphic/assetGraphic-style-responsive.css");

       
    }

    createHTML() {
        const template = `
        <div class="containerGraphic">
            <canvas id="bidChart" width="400" height="200"></canvas> 
            </div>
        `;

        const componentRoot = document.createElement("div");
        componentRoot.setAttribute("class", "graphic-component");
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

    async makeRequest(urlparam) {
        try {
            const response = await fetch(urlparam);
    
            if (!response.ok) {
                throw new Error("Erro na requisição: " + response.statusText);
            }
    
            return await response.json();
        } catch (error) {
            console.error("Erro na requisição:", error);
            return []; 
        }
    }

    connectedCallback() {
        this.makeGraphic(); 
    }

    filterDatas(data) {
        if (!Array.isArray(data) || data.length === 0) {
            console.error("Os dados fornecidos são inválidos ou vazios.");
            return [];
        }
    
        let datas = [];
        const assetType = localStorage.getItem("assetType");
    
        if (assetType === "SHARE") {
            datas = data.map(item => {
                return { "date": item.DateShare, "value": parseFloat(item.CloseShare).toFixed(3) };
            });
        } else if (assetType === "COIN") {
            datas = data.map(item => {
                return { "date": this.fomatDataTimestamp(item.timestamp), "value": parseFloat(item.bid).toFixed(3) };
            });
        } else {
            const step = Math.floor(data.length / 30);
            let atualPosition = 0;
            let dataAux = [];
    
            for (let i = 0; i < 30; i++) {
                dataAux.push(data[atualPosition]);
                atualPosition += step;
            }
    
            datas = dataAux.map(item => {
                return { "date": this.fomatDataTimestamp(item.date), "value": parseFloat(item.price).toFixed(3) };
            });
        }
    
        return datas.reverse();
    }
    
    async makeGraphic() {
        const response = await this.makeRequest(this.buildUrl());
    
        if (!response || response.length === 0) {
            console.error("Nenhum dado retornado ou falha na requisição.");
            return;
        }
    
        const data = this.filterDatas(response);
    
        if (data.length === 0) {
            console.error("Nenhum dado válido para exibir no gráfico.");
            return;
        }
    
        this.initChart(data);
    }

    initChart(data) {

        const labels = data.map(item => item.date);
        const bids = data.map(item => item.value);

        const canvas = this.shadow.getElementById('bidChart'); 
        const ctx = canvas.getContext('2d');

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: '',
                    data: bids,
                    borderColor: '#1465FF',
                    backgroundColor: '#C6FE1F',
                    borderWidth: 2,
                    pointBackgroundColor: '#C6FE1F',
                    pointBorderColor: '#C6FE1F',
                }]
            },
            options: {
                responsive: true, 
                maintainAspectRatio: false, 
                plugins: {
                    legend: {
                        display: false 
                    }
                },
                scales: {
                    x: {
                        ticks: {
                            color: 'white' 
                        }
                    },
                    y: {
                        ticks: {
                            color: 'white' 
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        }
                    }
                }
            }
        });
    }


    fomatDataTimestamp(timestamp){
        const date = new Date(timestamp * 1000);
        return date.toLocaleDateString("pt-BR");
    }

    buildUrl(){
        let url = ""
        let asset = localStorage.getItem("assetCode")
    
        if(localStorage.getItem("assetType") === "SHARE"){
            url = `http://localhost:8080/datas/share/?shareName=${asset}`
        }else if(localStorage.getItem("assetType") === "COIN"){
             url = `https://economia.awesomeapi.com.br/json/daily/${asset}/30`
        }else{
            url = `https://api.mercadobitcoin.net/api/v4/${asset}/trades?limit=1000&from=1729032425&to=1731710825000`
        }

        return url
    }

}

customElements.define("graphic-component", AssetGraphic);

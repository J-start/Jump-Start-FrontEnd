class HeaderWallet extends HTMLElement {

    shadow = this.attachShadow({ mode: "open" });

    constructor() {
        super();

        this.shadow.appendChild(this.createHTML());
        this.createStyles("app/components/headerWallet/headerWallet-style.css");
        this.createStyles("app/components/headerWallet/headerWallet-style-responsive.css");
        this.makeRequest();
        this.updateBalance();

        document.addEventListener("visibilitychange", () => {
            if (document.visibilityState === "visible") {
                this.makeRequest(); 
                this.updateBalance(); 
            }
        });
        this.shadow.querySelector("#seeGraphic").addEventListener("click", () => {
            this.insertGraphic()
        })
        this.shadow.querySelector("#buttonAssetOperation").addEventListener("click", () => {
            this.addHistoryAssetsComponent()
        })
    }

    createHTML() {
        const template = `
            <div class="wrapAll">
                <div class="containerAllElementsHeader">
                    <div class="containerAllElementsBalance">
                        <div class="containerTitleBalance">
                            <h2>Seu saldo</h2>
                        </div>
                        <div class="line"></div>
                        <div class="containerBalance">
                            <h2 id="balance"></h2>
                            <a id="seeGraphic" href="#">Ver detalhes</a>
                        </div>
                        <div class="containerButtons">
                            <button id="buttonWithDraw">Sacar</button>
                            <button id="buttonDeposit">Depositar</button>
                        </div>
                    </div>
                    <div class="containerAllElementsHistory">
                        <button id="buttonAssetOperation">Histórico de compra e venda</button>
                        <button id="buttonWalletOperation">Histórico de saque e depósito</button>
                    </div>
                </div>
            
            </div>
                <div class="containerHistory">
                    
                </div>
        `;

        const componentRoot = document.createElement("div");
        componentRoot.setAttribute("class", "home-component");
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

    makeRequest() {
        if (localStorage.getItem("walletAssets") !== null) {
            return;
        }
        const TOKEN = "aaa";
        const url = `${getUrl()}/wallet/datas/`;
        fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${TOKEN}`
            }
        }).then(response => {
            if (!response.ok) {
                console.error("Erro na requisição");
            }
            return response.json();
        }).then(data => {
            localStorage.setItem("walletAssets", JSON.stringify(data['Assets']));
            localStorage.setItem("balance", JSON.stringify(data['InvestorBalance']));
            this.updateBalance();
        }).catch(error => {
            console.error('Erro na requisição:', error);
        });
    }

    insertGraphic() {
        this.removeExistingGraphic();

        const graphicContainer = document.createElement("div");
        graphicContainer.className = "containerGraphicWallet"; 
    
        const canvas = document.createElement("wallet-component");
        graphicContainer.appendChild(canvas);
    
        this.shadow.appendChild(graphicContainer);
    }
    
    removeExistingGraphic() {
        const existingGraphic = this.shadow.querySelector(".containerGraphicWallet");
        if (existingGraphic) {
            existingGraphic.remove();
        }
    }

    updateBalance() {
        const balance = JSON.parse(localStorage.getItem("balance"));
        this.shadow.querySelector("#balance").innerHTML = "R$ " + Number(balance).toFixed(2);
    }

    addHistoryAssetsComponent() {
        //this.removeExistingHistoric()
        const historyComponent = document.createElement("historyassets-component");
        this.shadow.querySelector(".containerHistory").appendChild(historyComponent);
    }
    removeExistingHistoric() {
        const existingGraphic = this.shadow.querySelector(".containerHistory");
        if (existingGraphic) {
            existingGraphic.remove();
        }
    }
}

customElements.define("headerwallet-component", HeaderWallet);

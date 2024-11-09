class NewsOrAsset extends HTMLElement {
    shadow = this.attachShadow({ mode: "open" });

    constructor() {
        super();

        this.shadow.appendChild(this.createHTML());
        this.createStyles("app/components/newsOrAsset/newsOrAsset-style.css");
        this.createStyles("app/components/newsOrAsset/newsOrAsset-style-responsive.css");

        this.addEventListeners();
    }

    createHTML() {
        const template = `
         <div class="wrapAllElements">
           <div class="containerFatherElements">
                <button id="resources-bnt">Ativos</button>
                <button id="news-bnt">Notícias</button>
           </div>
           <div class="lineHeader"></div>
           <div class="containerChildrenElements">
                <button id="acoes-btn">Ações</button>
                <button id="moedas-btn">Moedas</button>
                <button id="criptomoedas-btn">Criptomoedas</button>
           </div>
           
         </div>
         <div class="ContainerSwitchOption"></div>
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

   
    addEventListeners() {
        this.shadow.querySelector("#acoes-btn").addEventListener("click", () => this.handleAcoesClick());
        this.shadow.querySelector("#moedas-btn").addEventListener("click", () => this.handleMoedasClick());
        this.shadow.querySelector("#criptomoedas-btn").addEventListener("click", () => this.handleCriptoClick());
        this.shadow.querySelector("#resources-bnt").addEventListener("click", () => this.handleResourcesClick());
    }

    
    handleAcoesClick() {
        this.clearContainer()
        this.shadow.querySelector(".ContainerSwitchOption").innerHTML = '<share-component></share-component>';

        this.managerColorsButtons("acoes");
        
    }

    handleMoedasClick() {
        this.clearContainer()
        this.shadow.querySelector(".ContainerSwitchOption").innerHTML = '<coin-component></coin-component>';

        this.managerColorsButtons("moedas");
        
    }

    handleCriptoClick() {
        this.clearContainer()
        this.shadow.querySelector(".ContainerSwitchOption").innerHTML = '<cripto-component></cripto-component>';
        
        this.managerColorsButtons("criptomoedas");
    }

    handleResourcesClick() {
        this.shadow.querySelector(".containerChildrenElements").style.display = "block";
        
        this.shadow.querySelector("#resources-bnt").style.color = "#C6FE1F";
       
    }

    managerColorsButtons(option){
        const cripto = this.shadow.querySelector("#criptomoedas-btn")
        const moedas = this.shadow.querySelector("#moedas-btn")
        const acoes = this.shadow.querySelector("#acoes-btn")

        switch (option){
            case "acoes":
                cripto.style.color = "#1465FF";
                moedas.style.color = "#1465FF";
                acoes.style.color = "#C6FE1F";
                break;
            case "moedas":
                cripto.style.color = "#1465FF";
                moedas.style.color = "#C6FE1F";
                acoes.style.color = "#1465FF";
                break;
            case "criptomoedas":
                cripto.style.color = "#C6FE1F";
                moedas.style.color = "#1465FF";
                acoes.style.color = "#1465FF";
                break;
        }
    }

    clearContainer() {
        this.shadow.querySelector(".ContainerSwitchOption").innerHTML = "";
    }
}

customElements.define("switch-component", NewsOrAsset);

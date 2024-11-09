class NewsOrAsset extends HTMLElement {
    shadow = this.attachShadow({ mode: "open" });
    isOPtionsAssetOpen = false;
    constructor() {
        super();

        this.shadow.appendChild(this.createHTML());
        this.createStyles("app/components/newsOrAsset/newsOrAsset-style.css");
        this.createStyles("app/components/newsOrAsset/newsOrAsset-style-responsive.css");
        this.handleResourcesClick()
        this.handleAcoesClick()
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
                <button id="selic-btn">Selic</button>
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
        this.shadow.querySelector("#news-bnt").addEventListener("click", () => this.handleNewsClick());
        this.shadow.querySelector("#selic-btn").addEventListener("click", () => this.handleSelicClick());
    }

    
    handleAcoesClick() {
        this.clearContainer()
        this.shadow.querySelector(".ContainerSwitchOption").innerHTML = '<share-component></share-component>';
        this.isOPtionsAssetOpen = true;
        this.managerColorsButtons("acoes");
        
    }

    handleMoedasClick() {
        this.clearContainer()
        this.shadow.querySelector(".ContainerSwitchOption").innerHTML = '<coin-component></coin-component>';
        this.isOPtionsAssetOpen = true;
        this.managerColorsButtons("moedas");
        
    }

    handleCriptoClick() {
        this.clearContainer()
        this.shadow.querySelector(".ContainerSwitchOption").innerHTML = '<cripto-component></cripto-component>';
        this.isOPtionsAssetOpen = true;
        this.managerColorsButtons("criptomoedas");
     
    }

    handleResourcesClick() {
        if(this.isOPtionsAssetOpen){
            this.shadow.querySelector(".containerChildrenElements").style.display = "none";
            this.isOPtionsAssetOpen = false;
        }else{
            this.isOPtionsAssetOpen = true;
            this.shadow.querySelector(".containerChildrenElements").style.display = "block";
        }
      
        
        this.managerBackGroundColors("resources");
    }

    handleNewsClick() {
        this.shadow.querySelector(".containerChildrenElements").style.display = "none";
        this.managerBackGroundColors("news");
        this.clearContainer()
        this.resetStateButtons()
        this.isOPtionsAssetOpen = false;
    }

    handleSelicClick() {
        //TODO make logic component selic
        this.clearContainer()

        this.managerColorsButtons("selic");

    }

    managerBackGroundColors(state){
        switch(state){
            case "resources":
                this.shadow.querySelector("#resources-bnt").style.backgroundColor = "#444549";
                this.shadow.querySelector("#news-bnt").style.backgroundColor = "transparent";
                break;
            case "news":
                this.shadow.querySelector("#resources-bnt").style.backgroundColor = "transparent";
                this.shadow.querySelector("#news-bnt").style.backgroundColor = "#444549";
                break;
        }
    }

    managerColorsButtons(option){
        const cripto = this.shadow.querySelector("#criptomoedas-btn")
        const moedas = this.shadow.querySelector("#moedas-btn")
        const acoes = this.shadow.querySelector("#acoes-btn")
        const selic = this.shadow.querySelector("#selic-btn")

        switch (option){
            case "acoes":
                cripto.style.backgroundColor  = "transparent";
                moedas.style.backgroundColor  = "transparent";
                acoes.style.backgroundColor = "#44454985";
                selic.style.backgroundColor  = "transparent";
                break;
            case "moedas":
                cripto.style.backgroundColor  = "transparent";
                moedas.style.backgroundColor  = "#44454985";
                acoes.style.backgroundColor  = "transparent";
                selic.style.backgroundColor  = "transparent";
                break;
            case "criptomoedas":
                cripto.style.backgroundColor  = "#44454985";
                moedas.style.backgroundColor  = "transparent";
                acoes.style.backgroundColor  = "transparent";
                selic.style.backgroundColor  = "transparent";
                break;
            case "selic":
                cripto.style.backgroundColor  = "transparent";
                moedas.style.backgroundColor  = "transparent";
                acoes.style.backgroundColor  = "transparent";
                selic.style.backgroundColor  = "#44454985";
                break;
        }
    }

    clearContainer() {
        this.shadow.querySelector(".ContainerSwitchOption").innerHTML = "";
    }

    resetStateButtons(){
        this.shadow.querySelector("#criptomoedas-btn").style.backgroundColor  = "transparent";
        this.shadow.querySelector("#moedas-btn").style.backgroundColor  = "transparent";
        this.shadow.querySelector("#acoes-btn").style.backgroundColor  = "transparent";
    }
}

customElements.define("switch-component", NewsOrAsset);
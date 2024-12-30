class BuyForm extends HTMLElement {

    shadow = this.attachShadow({ mode: "open" });

    constructor() {
        super()

        this.shadow.appendChild(this.createHTML())
        this.createStyles("app/components/buy/buyForm/buyForm-style.css")
        this.createStyles("app/components/buy/buyForm/buyForm-style-responsive.css")
        this.showWhatIsBuying()
        this.managerTradableShare()
        this.shadow.querySelector("#advanceButton").addEventListener("click", () => {
            const quantity = this.shadow.querySelector("#quantityInput").value
            if (quantity > 0) {
                if(localStorage.getItem("assetType") === "SHARE"){
                    if (quantity % 1 !== 0){
                        alert("Para ações, digite um valor inteiro")
                        this.shadow.querySelector("#quantityInput").value = ""
                        return
                    }
                }
                localStorage.setItem("assetQuantity", quantity)
                this.shadow.querySelector(".buyForm-component").remove()
                this.createFormConfirm()
            } else {
                alert("Digite um valor válido")
            }

        })
        
}

    createHTML() {

        const template =
            `
            <div class="containerShowWhatIsBuying">
                <h3 id="assetName">Você está comprando </h3>
            </div>
            <div id="containerAll">

            <div id="containerTitle">
                <h1>Selecione o quanto quer<br> comprar</h1>
            </div>
            <div id="containerForm">
                <input type="number" placeholder="" id="quantityInput" />
                <button id="advanceButton">Avançar</button>
            </div>
            </div>
        `

        const componentRoot = document.createElement("div");
        componentRoot.setAttribute("class", "buyForm-component");
        componentRoot.innerHTML = template;
        return componentRoot

    }

    createFormConfirm(){
        const form = document.createElement("buyconfirmation-component")
        this.shadow.appendChild(form)
    }

    createStyles(...linksUser) {

        linksUser.forEach(e => {
            const link = this.createLink(e)
            this.shadow.appendChild(link)
        })

    }
  
    createLink(linkStyle) {
        const link = document.createElement("link");
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("href", linkStyle);
        return link
    }
    
    showWhatIsBuying(){
        if (localStorage.getItem("assetType") === "SHARE") {
             const assetName = localStorage.getItem("assetCode")
             this.shadow.querySelector("#assetName").innerHTML = `Você está comprando ${assetName}`
        }else{
           const assetName = localStorage.getItem("assetName")
            this.shadow.querySelector("#assetName").innerHTML = `Você está comprando ${assetName}` 
        }
        
    }
    managerTradableShare(){
        if(localStorage.getItem("assetType") == "SHARE"){
            if(!isTadable()){
               window.location.href = "index.html"
            }
        }
    }
        

}

customElements.define("buyform-component", BuyForm);
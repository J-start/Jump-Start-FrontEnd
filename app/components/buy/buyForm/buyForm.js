class BuyForm extends HTMLElement {

    shadow = this.attachShadow({ mode: "open" });

    constructor() {
        super()

        this.shadow.appendChild(this.createHTML())
        this.createStyles("app/components/buy/buyForm/buyForm-style.css")
        this.createStyles("app/components/buy/buyForm/buyForm-style-responsive.css")

        this.shadow.querySelector("#advanceButton").addEventListener("click", () => {
            const quantity = this.shadow.querySelector("#quantityInput").value
            if (quantity > 0) {
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

}

customElements.define("buyform-component", BuyForm);
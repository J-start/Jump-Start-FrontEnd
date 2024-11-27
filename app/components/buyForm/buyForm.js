class BuyForm extends HTMLElement {

    shadow = this.attachShadow({ mode: "open" });

    constructor() {
        super()

        this.shadow.appendChild(this.createHTML())
        this.createStyles("app/components/buyForm/buyForm-style.css")
        this.createStyles("app/components/buyForm/buyForm-style-responsive.css")
    }

    createHTML() {

        const template =
            `
            <div id="containerTitle">
                <h1>Selecione o quanto quer<br> comprar</h1>
            </div>
            <div id="containerForm">
                <input type="number" placeholder="" id="quantityInput" />
                <button id="advanceButton">Avançar</button>
            </div>
        `

        const componentRoot = document.createElement("div");
        componentRoot.setAttribute("class", "buyForm-component");
        componentRoot.innerHTML = template;
        return componentRoot

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
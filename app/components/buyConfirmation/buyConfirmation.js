class BuyConfirmation extends HTMLElement {

    shadow = this.attachShadow({ mode: "open" });

    constructor() {
        super()

        this.shadow.appendChild(this.createHTML())
        this.createStyles("app/components/buyConfirmation/buyConfirmation-style.css")
        this.createStyles("app/components/buyConfirmation/buyConfirmation-style-responsive.css")
    }

    createHTML() {

        const template =
            `
            <div id="containerTitle">
                <h1>Confirme as informações</h1>
            </div>
            <div id="containerForm">
                <div class="infoRow">
                    <p class="infoLabel">Ativo escolhido</p>
                    <p class="infoValue">BITCOIN</p>
                </div>
                <div class="infoRow">
                    <p class="infoLabel">Valor da compra</p>
                    <p class="infoValue">$ 400,00</p>
                </div>
                <div class="infoRow">
                    <p class="infoLabel">Data</p>
                    <p class="infoValue">28/09/2024</p>
                </div>
            </div>
            <button id="advanceButton" >Avançar</button>
        `

        const componentRoot = document.createElement("div");
        componentRoot.setAttribute("class", "buyConfirmation-component");
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

customElements.define("buyconfirmation-component", BuyConfirmation);
class HeaderWallet extends HTMLElement {

    shadow = this.attachShadow({ mode: "open" });

    constructor() {
        super()

        this.shadow.appendChild(this.createHTML())
        this.createStyles("app/components/headerWallet/headerWallet-style.css")
        this.createStyles("app/components/headerWallet/headerWallet-style-responsive.css")

    }

    createHTML() {

        const template =
            `
    <div class="wrapAll">
    <div class="containerAllElementsHeader">
        <div class="containerTitleBalance">
            <h2>Seu saldo</h2>
        </div>
        <div class="line"></div>
        <div class="containerBalance">
            <h2>R$ 100,00</h2>
            <a href="#">Ver detalhes</a>
        </div>
        <div class="containerButtons">
         <button id="buttonWithDraw">Sacar</button>
         <button id="buttonDeposit">Depositar</button>
        </div>
    </div>
    </div>

        `

        const componentRoot = document.createElement("div");
        componentRoot.setAttribute("class", "home-component");
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

customElements.define("headerwallet-component", HeaderWallet);
class Cripto extends HTMLElement {

    shadow = this.attachShadow({ mode: "open" });

    constructor() {
        super()

        this.shadow.appendChild(this.createHTML())
        this.createStyles("app/components/cripto/cripto-style.css")
        this.createStyles("app/components/cripto/cripto-style-responsive.css")

    }

    createHTML() {

        const template =
            `
    <div class="WrapAllElements">

        <div class="wrapElement">
                <div class="NameAndPrice">
                    <h3>BTC</h3>
                <h4>R$ 200.000,00</h4>
            </div>

            <div class="wrapButtonSeeMore">
                <button>Ver mais</button>
            </div>
        </div>

        <div class="wrapElement">
                <div class="NameAndPrice">
                    <h3>ETH</h3>
                <h4>R$ 100.000,00</h4>
            </div>
            

            <div class="wrapButtonSeeMore">
                <button>Ver mais</button>
            </div>
        </div>

        <div class="wrapElement">
                <div class="NameAndPrice">
                    <h3>DOGE</h3>
                <h4>R$ 102.001,00</h4>
            </div>
            

            <div class="wrapButtonSeeMore">
                <button>Ver mais</button>
            </div>
        </div>

                <div class="wrapElement">
                <div class="NameAndPrice">
                    <h3>DOGE</h3>
                <h4>R$ 102.001,00</h4>
            </div>
            

            <div class="wrapButtonSeeMore">
                <button>Ver mais</button>
            </div>
        </div>

                <div class="wrapElement">
                <div class="NameAndPrice">
                    <h3>DOGE</h3>
                <h4>R$ 102.001,00</h4>
            </div>
            

            <div class="wrapButtonSeeMore">
                <button>Ver mais</button>
            </div>
        </div>

                <div class="wrapElement">
                <div class="NameAndPrice">
                    <h3>DOGE</h3>
                <h4>R$ 102.001,00</h4>
            </div>
            

            <div class="wrapButtonSeeMore">
                <button>Ver mais</button>
            </div>
        </div>

                <div class="wrapElement">
                <div class="NameAndPrice">
                    <h3>DOGE</h3>
                <h4>R$ 102.001,00</h4>
            </div>
            

            <div class="wrapButtonSeeMore">
                <button>Ver mais</button>
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

customElements.define("cripto-component", Cripto);
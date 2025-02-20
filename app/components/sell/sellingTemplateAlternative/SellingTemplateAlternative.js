class SellingTemplateAlternative extends HTMLElement {

    shadow = this.attachShadow({ mode: "open" });

    constructor() {
        super()

        this.shadow.appendChild(this.createHTML())
        this.createStyles("../app/components/sell/sellingTemplateAlternative/sellingTemplateAlternative-style.css")
        this.createStyles("../app/components/sell/sellingTemplateAlternative/sellingTemplateAlternative-style-responsive.css")

    }

    createHTML() {

        const template =
                `
       <div class="sellingBlockAlt">
    <div class="PageReturn">
        <h1>Você ainda não possui ativos suficientes para venda</h1>
        <p>Você pode comprar ativos e esperar por sua valorização, para que os possa vender.</p>
    </div>

    <div class="buttonFormat">
        <div class="Voltar">
            <button>Voltar</button>
        </div>

        <div class="Comprar ativos">
            <button>Comprar ativos</button>
        </div>
    </div>
</div>

        `

        const componentRoot = document.createElement("div");
        componentRoot.setAttribute("class", "sellingalt-component");
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

customElements.define("sellingalt-component", SellingTemplateAlternative);
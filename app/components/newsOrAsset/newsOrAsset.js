class NewsOrAsset extends HTMLElement {

    shadow = this.attachShadow({ mode: "open" });

    constructor() {
        super()

        this.shadow.appendChild(this.createHTML())
        this.createStyles("app/components/newsOrAsset/newsOrAsset-style.css")
        this.createStyles("app/components/newsOrAsset/newsOrAsset-style-responsive.css")

    }

    createHTML() {

        const template =
            `
         <div class="wrapAllElements">

           <div class="containerFatherElements">
                <button>Ativos</button>
                <button>Notícias</button>
           </div>
            <div class="lineHeader"></div>
           <div class="containerChildrenElements">
                <button>Ações</button>
                <button>Moedas</button>
                <button>Criptomoedas</button>
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

customElements.define("switch-component", NewsOrAsset);
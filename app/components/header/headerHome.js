class HeaderHome extends HTMLElement {

    shadow = this.attachShadow({ mode: "open" });

    constructor() {
        super()

        this.shadow.appendChild(this.createHTML())
        this.createStyles("app/components/header/headerHome-style.css")
        this.createStyles("app/components/header/headerHome-style-responsive.css")

    }

    createHTML() {

        const template =
            `
    <div id="containerHeadHome">
        <div id="headHomeContents">
            <h1>Olá, Fulano</h1>
        </div>
    </div>
    <div class="lineHeader"></div>

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

customElements.define("header-component", HeaderHome);
class Spinner extends HTMLElement {

    shadow = this.attachShadow({ mode: "open" });

    constructor() {
        super()

        this.shadow.appendChild(this.createHTML())
        this.createStyles("../app/components/spinner/spinner-style-responsive.css")
        this.createStyles("../app/components/spinner/spinner-style.css")
    }

    createHTML() {

        const template =
            `
            <div class="loader"></div>

        `

        const componentRoot = document.createElement("div");
        componentRoot.setAttribute("class", "containerSpinner-component");
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

customElements.define("spinner-component", Spinner);
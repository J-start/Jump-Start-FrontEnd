class SellingTemplateProcedure extends HTMLElement {

    shadow = this.attachShadow({ mode: "open" });

    constructor() {
        super()

        this.shadow.appendChild(this.createHTML())
        this.createStyles("app/components/sellingTemplateProcedure/sellingTemplateProcedure-style.css")
        this.createStyles("app/components/sellingTemplateProcedure/sellingTemplateProcedure-style-responsive.css")

    }

    createHTML() {

        const template =
                `
       

        `

        const componentRoot = document.createElement("div");
        componentRoot.setAttribute("class", "sellingpro-component");
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

customElements.define("sellingpro-component", SellingTemplateProcedure);
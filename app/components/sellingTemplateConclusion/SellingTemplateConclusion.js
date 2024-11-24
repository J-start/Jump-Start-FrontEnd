class SellingTemplateConclusion extends HTMLElement {

    shadow = this.attachShadow({ mode: "open" });

    constructor() {
        super()

        this.shadow.appendChild(this.createHTML())
        this.createStyles("app/components/sellingTemplateConclusion/sellingTemplateConclusion-style.css")
        this.createStyles("app/components/sellingTemplateConclusion/sellingTemplateConclusion-style-responsive.css")

    }

    createHTML() {

        const template =
        
                `<div class="principalBlock">
    <h1>Venda bem sucedida!</h1>

    <div class="img">
        <img src="app/assets/images/confirmation_icon.png" alt="confirmation_icon">
    </div>
</div>
     
        `

        const componentRoot = document.createElement("div");
        componentRoot.setAttribute("class", "sellingconc-component");
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

customElements.define("sellingconc-component", SellingTemplateConclusion);
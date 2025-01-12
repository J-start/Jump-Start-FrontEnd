class Logo extends HTMLElement {

    shadow = this.attachShadow({ mode: "open" });

    constructor() {
        super()

        this.shadow.appendChild(this.createHTML())
        this.createStyles("app/components/logo/logo-style.css")
        this.createStyles("app/components/logo/logo-style-responsive.css")
    }

    createHTML() {

        const template =
            `
   <div class="containerAllElements">
        <div class="containerLogo">
            <img src="app/assets/images/logo.PNG" alt="logo">
        </div>

        <div class="containerTitle">
            <h2>JumpStart</h2>
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

customElements.define("logo-component", Logo);
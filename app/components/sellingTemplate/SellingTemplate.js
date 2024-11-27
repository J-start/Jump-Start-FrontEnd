class SellingTemplate extends HTMLElement {

    shadow = this.attachShadow({ mode: "open" });

    constructor() {
        super()

        this.shadow.appendChild(this.createHTML())
        this.createStyles("app/components/sellingTemplate/sellingTemplate-style.css")
        this.createStyles("app/components/sellingTemplate/sellingTemplate-style-responsive.css")

    }

    createHTML() {

        const template =
                `
        <div class="sellingBlock">
        <div class="titlePage">
            <h1>Selecione o quanto quer vender</h1>
        </div>

        <div class="form-sendingValue">
            <form action="" method="GET">
                <textarea id="valueInput" name="dados" rows="4" cols="50"></textarea><br><br>
                <button type="submit">Avançar</button>
            </form>
        </div>
    </div>

        `

        const componentRoot = document.createElement("div");
        componentRoot.setAttribute("class", "selling-component");
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

customElements.define("selling-component", SellingTemplate);
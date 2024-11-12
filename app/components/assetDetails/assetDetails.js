class AssetDetails extends HTMLElement {

    shadow = this.attachShadow({ mode: "open" });

    constructor() {
        super()

        this.shadow.appendChild(this.createHTML())
        this.createStyles("app/components/assetDetails/assetDetails-style.css")
        this.createStyles("app/components/assetDetails/assetDetails-style-responsive.css")

    }

    createHTML() {

        const template =
            `
          <div class="containerImageBack">
            <img src="app/assets/images/back_icon.png" alt="Imagem voltar" class="imageBack">
          </div>

          <div class="containerAssetAndBalance">
                <div class="assetDetails">
                    <h1>USD</h1>
                    <h3>Dólar Americano</h3>
                </div>

                <div class="balanceDetails">
                    <h3>Saldo: </h3>
                </div>

                <div class="balanceValue">
                    <h3>R$ 1000</h3>
                </div>
                
          
          </div>

                <div class="line"></div>
        `

        const componentRoot = document.createElement("div");
        componentRoot.setAttribute("class", "assetDetails-component");
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

customElements.define("asset-details-component", AssetDetails);
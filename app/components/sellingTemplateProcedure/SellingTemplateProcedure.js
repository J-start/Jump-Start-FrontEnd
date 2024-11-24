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
                <div class="principalBlock">
                
                    <h1>Confirme as informações</h1>

<div class="detailsTab">
    <table>
        <tbody>
            <tr>
                <th scope="row">Ativo escolhido</th>
                <td>BITCOIN</td>
            </tr>
            <tr>
                <th scope="row">Valor da venda</th>
                <td>R$ xxx,yy</td>
            </tr>
            <tr>
                <th scope="row">data</th>
                <td>dd/mm/aaaa</td>
            </tr>
        </tbody>
    </table>
</div>

<div class="buttonFormat">
    <button>Avançar</button>
</div>
                </div>
       

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
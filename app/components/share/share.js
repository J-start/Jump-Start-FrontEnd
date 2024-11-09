class Share extends HTMLElement {

    shadow = this.attachShadow({ mode: "open" });

    constructor() {
        super()

        this.shadow.appendChild(this.createHTML())
        this.createStyles("app/components/share/share-style.css")
        this.createStyles("app/components/share/share-style-responsive.css")

        this.buildComponent()

    }

    createHTML() {

        const template =
            `
        <div class="WrapAllElements">

        </div>

        `

        const componentRoot = document.createElement("div");
        componentRoot.setAttribute("class", "share-component");
        componentRoot.innerHTML = template;
        return componentRoot

    }

    async makeRequest() {
        const url = `http://localhost:8080/datas/shares`
         return fetch(url)
             .then(response => {
                 if (!response.ok) {
                     alert("Erro na requisição");
                 }
                 return response.json();
             })
             .catch(error => {
                 console.error('Erro na requisição:', error);
             });
     }

    async buildComponent() {

        const wrapAllElements = this.shadow.querySelector(".WrapAllElements");

        const datas = await this.makeRequest()
        console.log(datas)

        datas.forEach(element => {

            const wrapElement = document.createElement("div");
            wrapElement.classList.add("wrapElement");

            
            const nameAndPrice = document.createElement("div");
            nameAndPrice.classList.add("NameAndPrice");

            
            const name = document.createElement("h3");
            const names = this.buildMapShareNames()
            name.textContent = String(names.get(element.NameShare))

            
            const price = document.createElement("h4");
            price.textContent = "Abertura. R$: "+ Number(element.OpenShare).toFixed(2);
            price.setAttribute("title", "Valor da ação no momento da abertura do mercado");

            
            const maxValue = document.createElement("h4");
            maxValue.textContent ="Fechamento. R$: "+ Number(element.CloseShare).toFixed(2);
            maxValue.setAttribute("title", "Maior Valor que a ação alcançou no dia");

           
            nameAndPrice.appendChild(name);
            nameAndPrice.appendChild(price);
            nameAndPrice.appendChild(maxValue);

            
            const wrapButtonSeeMore = document.createElement("div");
            wrapButtonSeeMore.classList.add("wrapButtonSeeMore");

            
            const buttonSeeMore = document.createElement("button");
            buttonSeeMore.textContent = "Ver mais";

            
            wrapButtonSeeMore.appendChild(buttonSeeMore);

            
            wrapElement.appendChild(nameAndPrice);
            wrapElement.appendChild(wrapButtonSeeMore);

            wrapAllElements.appendChild(wrapElement);
        })
    }

    buildMapShareNames(){
        const shareNames = new Map();

        shareNames.set('PETR4.SA', 'PETROBRAS PN (PETR4.SA)')
        shareNames.set('BBAS3.SA', 'Banco do Brasil (BBAS3.SA)')
        shareNames.set('ITSA4.SA', 'Itaúsa PN (ITSA4.SA)')
        shareNames.set('TRPL4.SA', 'CTEEP (TRPL4.SA)')
        shareNames.set('VALE3.SA', 'Vale S.A (VALE3.SA)')
        shareNames.set('CMIG4.SA', 'Cemig (CMIG4.SA)')
        shareNames.set('SANB11.SA', 'Banco Santander (SANB11.SA)')
        shareNames.set('USIM5.SA', 'USIMINAS PNA (USIM5.SA)')
        shareNames.set('ABEV3.SA', 'AMBEV S/A ON (ABEV3.SA)')
        shareNames.set('MGLU3.SA', 'Magazine Luiza S.A. (MGLU3.SA)')

        return shareNames
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

customElements.define("share-component", Share);
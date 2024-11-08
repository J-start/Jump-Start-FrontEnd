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

        //TODO Add text hover numbers assets

        const wrapAllElements = this.shadow.querySelector(".WrapAllElements");

        const datas = await this.makeRequest()
        console.log(datas)

        datas.forEach(element => {

            const wrapElement = document.createElement("div");
            wrapElement.classList.add("wrapElement");

            
            const nameAndPrice = document.createElement("div");
            nameAndPrice.classList.add("NameAndPrice");

            
            const name = document.createElement("h3");
            name.textContent = String(element.NameShare)

            
            const price = document.createElement("h4");
            price.textContent = "Abertura: "+ Number(element.OpenShare).toFixed(2);

            
            const maxValue = document.createElement("h4");
            maxValue.textContent ="Fechamento: "+ Number(element.CloseShare).toFixed(2);

           
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
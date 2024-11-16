
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

        datas.forEach(element => {

            wrapAllElements.appendChild(BuildAsset("SHARE", element.NameShare, element.OpenShare, element.CloseShare));

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
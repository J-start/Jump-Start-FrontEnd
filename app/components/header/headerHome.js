class HeaderHome extends HTMLElement {

    shadow = this.attachShadow({ mode: "open" });

    constructor() {
        super()

        this.shadow.appendChild(this.createHTML())
        this.createStyles("../app/components/header/headerHome-style.css")
        this.createStyles("../app/components/header/headerHome-style-responsive.css")
        this.makeRequest()
    }

    createHTML() {

        const template =
            `
    <div id="containerHeadHome">
        <div id="headHomeContents">
            <h1></h1>
        </div>
    </div>
    <div class="lineHeader"></div>

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
    makeRequest() {
        const url = `${getUrl()}/investor/name/`;
        const TOKEN = localStorage.getItem("token")
        fetch(url, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                 "Authorization": `Bearer ${TOKEN}`
            }
        }).then(response => {
            return response.json();
        }).then(data => {
            if (data.code) {
                this.handleErrorApi(data.message)
                return
            }
            this.shadow.querySelector("h1").innerHTML = `Olá, ${this.formatName(data.name)}`;
            localStorage.setItem("balance", data.balance);

        }).catch(error => {
        
            console.error('Erro na requisição:', error);
        });
    }

    formatName(string) {
        let firstName = String(string).split(" ")[0]
        return String(firstName).charAt(0).toUpperCase() + String(firstName).toLowerCase().slice(1);
    }

    handleErrorApi(message) {

        if (this.contains(message, "token")) {
          alert("Token expirado, realize o login novamente")
          window.location.href = "../signIn.html";
          return
        }

      }
    
      contains(message, word) {
        let containWord = false
        let chunks = String(message).split(" ")
        chunks.forEach(e => {
          if (e == word) {
            containWord = true;
            return
          }
        })
    
        return containWord
      }
    


}

customElements.define("header-component", HeaderHome);
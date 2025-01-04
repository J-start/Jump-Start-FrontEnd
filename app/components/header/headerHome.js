class HeaderHome extends HTMLElement {

    shadow = this.attachShadow({ mode: "open" });

    constructor() {
        super()

        this.shadow.appendChild(this.createHTML())
        this.createStyles("app/components/header/headerHome-style.css")
        this.createStyles("app/components/header/headerHome-style-responsive.css")
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
        if(localStorage.getItem("token") === null){
            window.location.href = "signIn.html"
        }
        const url = `${getUrl()}/investor/name/`;
        const TOKEN = localStorage.getItem("token")
        fetch(url, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                 "Authorization": `Bearer ${TOKEN}`
            }
        }).then(response => {
            if (!response.ok) {
                console.error("Erro na requisição");
                
            }
            return response.json();
        }).then(data => {
            if (data.code) {
                //TODO SEND INVESTOR TO LOGIN
                this.shadow.querySelector("h1").innerHTML = this.messageHourDay();
                return
            }
            this.shadow.querySelector("h1").innerHTML = `Olá, ${this.upperCaseFirstLetter(data.name)}`;
            localStorage.setItem("balance", data.balance);

        }).catch(error => {
            
            this.shadow.querySelector("h1").innerHTML = this.messageHourDay();
            console.error('Erro na requisição:', error);
        });
    }

    upperCaseFirstLetter(string) {
        return String(string).charAt(0).toUpperCase() + String(string).slice(1);
    }
    messageHourDay(){
        const now = new Date();
        let currentDateBrasil = new Date(now.toLocaleString("en-US", { timeZone: "America/Sao_Paulo" }));
        const hour = currentDateBrasil.getHours();
        if(hour < 12){
            return "Bom dia"
        }
        if(hour >= 12 && hour < 18){
            return "Boa tarde"
        }
        if(hour >= 18){
            return "Boa noite"
        }
    }

}

customElements.define("header-component", HeaderHome);
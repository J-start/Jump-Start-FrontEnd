class UserProfile extends HTMLElement {
    shadow = this.attachShadow({ mode: "open" });
    constructor() {
        super();

        this.shadow.appendChild(this.createHTML());
        this.createStyles("app/components/profile/profile-style.css");
        this.createStyles(
            "app/components/profile/profile-style-responsive.css"
        );
        this.makeRequest();
        this.shadow
            .querySelector("#updateData")
            .addEventListener("click", () => {
                location.href = "sendingEmail.html";
            });
    }

    createHTML() {
        const template = `
            <div class="profile-container">
                <div class="header">
                    <h1>Perfil</h1>
                </div>
                <div class="profile-body">
                    <div class="profile-card">
                        <p></p>
                        <p2></p2>
                    </div>
                    <div class="buttons">
                        <button class="logout">Sair do APP</button>
                        <button class="edit" id="updateData" >Alterar dados</button>
                    </div>
                </div>
            </div>
        `;
        const componentRoot = document.createElement("div");
        componentRoot.setAttribute("class", "home-component");
        componentRoot.innerHTML = template;
        return componentRoot;
    }

    createStyles(...linksUser) {
        linksUser.forEach((e) => {
            const link = this.createLink(e);
            this.shadow.appendChild(link);
        });
    }

    createLink(linkStyle) {
        const link = document.createElement("link");
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("href", linkStyle);
        return link;
    }

    makeRequest() {
        const url = `${getUrl()}/investor/datas/`;
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
            this.shadow.querySelector("p").innerHTML = `${this.formatName(data.name)}`;
            this.shadow.querySelector("p2").innerHTML = `${data.email}`;
            localStorage.setItem("balance", data.balance);

        }).catch(error => {

            console.error('Erro na requisição:', error);
        });
    }
    

    formatName(string) {
        let firstName = String(string).split(" ")[0]
        return String(firstName).charAt(0).toUpperCase() + String(firstName).toLowerCase().slice(1);
    }

    insertSendingEmailPage() {
        this.shadow.querySelector(".profile-container").remove();
        const sendigEmail = document.createElement("deposit-component");
        this.shadow.querySelector(".containerOtherScreens").appendChild(deposit);
      }
    
}

customElements.define("user-profile", UserProfile);
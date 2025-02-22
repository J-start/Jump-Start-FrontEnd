class UserProfile extends HTMLElement {
    shadow = this.attachShadow({ mode: "open" });
    constructor() {
        super();

        this.shadow.appendChild(this.createHTML());
        this.createStyles("app/components/profile/profile-style.css");
        this.createStyles("app/components/profile/profile-style-responsive.css");
        if (!localStorage.getItem("token") || localStorage.getItem("token") == "undefined" || localStorage.getItem("token") == "null") {
            this.shadow.querySelector(".profile-container").remove()
            return
        }else{ 
        this.shadow.querySelector(".showThatUserHasNoLogin").remove()
        this.makeRequest();
        this.shadow
            .querySelector("#updateData")
            .addEventListener("click", () => {
                location.href = "updateProfile.html";
            });

        this.shadow
        .querySelector(".logout")
        .addEventListener("click", () => {
            this.logOut();
        });
    }
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
            <div class="showThatUserHasNoLogin">
              <h2>Faça login para visualizar seu perfil</h2>
              <div class="containerButtonLogin">
                <a href="signIn.html" id="loginButtonWallet">Login</a>
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
                alert("Ocorreu um erro, ao validar dados, realize o login novamente")
                window.location.href = "signIn.html"
                return
            }
            this.shadow.querySelector("p").innerHTML = `Nome: ${data.name}`;
            this.shadow.querySelector("p2").innerHTML = `Email: ${data.email}`;
            const datasUser = {
                "name":data.name,
                "email":data.email
            }

            localStorage.setItem("datasProfile", JSON.stringify(datasUser));

        }).catch(error => {

            console.error('Erro na requisição:', error);
        });
    }
    

    insertSendingEmailPage() {
        this.shadow.querySelector(".profile-container").remove();
        const sendigEmail = document.createElement("deposit-component");
        this.shadow.querySelector(".containerOtherScreens").appendChild(deposit);
      }
    
    logOut(){
        localStorage.clear()
        window.location.href = "signIn.html"
    }

    
}

customElements.define("user-profile", UserProfile);
class UpdateProfile extends HTMLElement {
    shadow = this.attachShadow({ mode: "open" });
    constructor() {
        super();

        this.shadow.appendChild(this.createHTML());
        this.createStyles("app/components/updateProfile/updateProfile-style.css");
        this.createStyles(
            "app/components/updateProfile/updateProfile-style-responsive.css"
        );
        this.shadow
            .querySelector(".updatePasswordButton")
            .addEventListener("click", () => {
                location.href = "sendingEmail.html";
            });

        this.shadow.querySelector("#signup-form").addEventListener("submit", (event) => {
            event.preventDefault()
            const object =this.buildObjectToSend()
            if(object === null){
                return
            }
            console.log(object)
            this.signUp(object)
        })
    }

    createHTML() {
        const template = `
             <div class="containerTitle">
                <h2>Alterar dados do perfil</h2>
            </div>
            <div id="messageError"></div>
            <div class="containerForm">
                <form id="signup-form">
                    <label for="name">Nome</label>
                    <input placeholder="Digite seu nome" maxlength="30" minlength="3"  type="text" id="name" name="name" required>
                    <br>
                    <label for="email">Email</label>
                    <input placeholder="Digite seu email" type="email" id="email" name="email" required>
                    <br>

                    <div class="buttons">
                        <button class="updatePasswordButton">Mudar Senha</button>
                        <button class="submitButton" type="submit">Cadastrar</button>
                    </div>
                    
                   
                   
                </form>
               
            </div>
        `;
        const componentRoot = document.createElement("div");
        componentRoot.setAttribute("class", "home-component");
        componentRoot.innerHTML = template;
        return componentRoot;
    }

    buildObjectToSend(){
        const name = this.shadow.querySelector("#name").value
        const email = this.shadow.querySelector("#email").value

        if(!this.verifyFields(name, email)){
            return null
        }
        return {
            "name":name,
            "email":email
        }
    }

    verifyFields(name, email){

        if(name === "" || email === ""){
            return false
        }
        if(name.length < 3 || name.length > 30){
            alert("O nome deve ter no mínimo 3 e no máximo 30 caracteres")
            return false
        }
      
        if(!this.isEmailValid(email)){
            alert("Email inválido")
            return false
        }

        return true
    }

    isEmailValid(email){
        const regex = /\S+@\S+\.\S+/;
        return regex.test(email)
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

    signUp(datas) {
        if(datas === null){
            return
        }
        const url = `${getUrl()}/investor/datas/update`;
        const TOKEN = localStorage.getItem("token")
        fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${TOKEN}`
            },
            body: JSON.stringify(datas)
        }).then(response => {
            return response.json();
        }).then(data => {
            if(data.code != 200){
                this.showMessageError(data.message)
                return
            }

            this.shadow.querySelector("#messageError").innerHTML = ""
            window.location.href = "profile.html"
        
        }).catch(error => {
            alert("Erro ao cadastrar, tente novamente")
        });
    }


}

customElements.define("update-profile", UpdateProfile);
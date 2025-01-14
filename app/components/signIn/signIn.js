class SignIn extends HTMLElement {

    shadow = this.attachShadow({ mode: "open" });
    timeoutId = 0
    constructor() {
        super()
        localStorage.clear()
        this.shadow.appendChild(this.createHTML())
        this.createStyles("app/components/signIn/signIn-style.css")
        this.createStyles("app/components/signIn/signIn-style-responsive.css")

        this.shadow.querySelector("#signIn-form").addEventListener("submit", (event) => {
            event.preventDefault()
            const object =this.buildObjectToSend()
            if(object === null){
                return
            }

            this.signIn(object)
        })

        this.shadow.querySelector("#passwordImage").addEventListener("click", () => {
            this.showPassword("password")
        })

    }

    createHTML() {

        const template =
            `
            <div class="containerTitle">
                <h2>Login</h2>
            </div>
            <div id="messageError"></div>
            <div class="containerForm">
                <form id="signIn-form">
                    <label for="email">Email</label>
                    <input placeholder="Digite seu email" type="email" id="email" name="email" required>
                    <br>
                    <label for="password">Senha</label>
                   <div class="passwordContainer">
                    <input placeholder="Escolha uma senha" maxlength="20" minlength="8" type="password" id="password" name="password" required> 
                    <img src="app/assets/images/see_password.png" width="25px" height:"25px" alt="eye" id="passwordImage" class="eye">
                    </div>
                    <br>
                    <a href="signUp.html">Não tenho uma conta</a>
                    <br>
                    <div class="containerButton">
                     <button type="submit">Login</button>
                    </div>
                   
                </form>
               
            </div>
            

        `

        const componentRoot = document.createElement("div");
        componentRoot.setAttribute("class", "signup-component");
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

    signIn(datas) {
        if(datas === null){
            return
        }
        const url = `${getUrl()}/investor/login/`;
        fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datas)
        }).then(response => {
            return response.json();
        }).then(data => {
            console.log(data)
            if(!data.token){
                this.showMessageError(data.message)
                return
            }
            localStorage.setItem("token",data.token)
            this.shadow.querySelector("#messageError").innerHTML = ``
            window.location.href = "index.html"
        
        }).catch(error => {
            console.log(error)
            alert("Erro ao realizar login, tente novamente",error)
        });
    }

    verifyFields(email, password){

        if(email === "" || password === ""){
            return false
        }
        if(password.length < 8 || password.length > 20){
            alert("A senha deve ter no mínimo 8 e no máximo 20 caracteres")
            return false
        }
        if(!this.isEmailValid(email)){
            alert("Email inválido")
            return false
        }

        return true
    }

    buildObjectToSend(){
        const email = this.shadow.querySelector("#email").value
        const password = this.shadow.querySelector("#password").value

        if(!this.verifyFields(email, password)){
            return null
        }
        return {
            "email":email,
            "password":password
        }
    }

    isEmailValid(email){
        const regex = /\S+@\S+\.\S+/;
        return regex.test(email)
    }

    showPassword(passwordId){
        const element = `#${passwordId}`
        const passwordElement = this.shadow.querySelector(element)
        passwordElement.type === "text" ? passwordElement.type = "password" : passwordElement.type = "text"
  
    }

    showMessageError(message){
        
        this.shadow.querySelector("#messageError").innerHTML = `<h3>${message}</h3>`
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
        }
        this.timeoutId = setInterval(() => {
             this.shadow.querySelector("#messageError").innerHTML = ""
        }, 5000);
    }


}

customElements.define("signin-component", SignIn);
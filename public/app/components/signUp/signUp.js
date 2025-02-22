class SignUp extends HTMLElement {

    shadow = this.attachShadow({ mode: "open" });
    timeoutId 
    isPasswordVisible = false
    isConfirmPasswordVisible = false
    constructor() {
        super()
        this.clearLocalStorage()
        this.shadow.appendChild(this.createHTML())
        this.createStyles("app/components/signUp/signUp-style.css")
        this.createStyles("app/components/signUp/signUp-style-responsive.css")

        this.shadow.querySelector("#signup-form").addEventListener("submit", (event) => {
            event.preventDefault()
            const object =this.buildObjectToSend()
            if(object === null){
                return
            }

            this.signUp(object)
        })

        this.shadow.querySelector("#passwordImage").addEventListener("click", () => {
            this.managerPassword()
        })

        this.shadow.querySelector("#confirmPasswordImage").addEventListener("click", () => {
            this.managerConfirmPassword()
        })
    }

    createHTML() {

        const template =
            `
            <div class="containerTitle">
                <h2>Vamos criar sua conta</h2>
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
                    <label for="password">Senha</label>
                   <div class="passwordContainer">
                    <input placeholder="Escolha uma senha" maxlength="20" minlength="8" type="password" id="password" name="password" required> 
                    <img src="app/assets/images/close_password.svg" width="25px" height:"25px" alt="eye" id="passwordImage" class="eye">
                    </div>
                    <br>
                    
                    <label for="confirm-password">Confirme a Senha</label>
                    <div class="passwordContainer">
                    <input placeholder="Confirme sua senha" maxlength="20" minlength="8" type="password" id="confirm-password" name="confirm-password" required>
                    <img src="app/assets/images/close_password.svg" width="25px" height:"25px" alt="eye" id="confirmPasswordImage" class="eye">
                    </div>
                    <br>
                    <a href="signIn.html">Já tenho uma conta</a>
                    <br>
                    <div class="containerButton">
                     <button type="submit">Cadastrar</button>
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

    signUp(datas) {
        if(datas === null){
            return
        }
        const url = `${getUrl()}/investor/create/`;
        fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
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
            window.location.href = "signIn.html"
        
        }).catch(error => {
            alert("Erro ao cadastrar, tente novamente")
        });
    }

    verifyFields(name, email, password, confirmPassword){

        if(name === "" || email === "" || password === "" || confirmPassword === ""){
            return false
        }
        if(name.length < 3 || name.length > 30){
            alert("O nome deve ter no mínimo 3 e no máximo 30 caracteres")
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
        if(password !== confirmPassword){
            alert("As senha são diferentes")
            return false
        }

        return true
    }

    buildObjectToSend(){
        const name = this.shadow.querySelector("#name").value
        const email = this.shadow.querySelector("#email").value
        const password = this.shadow.querySelector("#password").value
        const confirmPassword = this.shadow.querySelector("#confirm-password").value

        if(!this.verifyFields(name, email, password,confirmPassword)){
            return null
        }
        return {
            "name":name,
            "email":email,
            "password":password
        }
    }

    isEmailValid(email){
        const regex = /\S+@\S+\.\S+/;
        return regex.test(email)
    }

    managerPassword(){
        const passwordElement = this.shadow.querySelector("#password")
        if(!this.isPasswordVisible){
            passwordElement.type = "text"
            this.isPasswordVisible = !this.isPasswordVisible
            this.shadow.querySelector("#passwordImage").src = "app/assets/images/see_password.svg"
        }else{
            passwordElement.type = "password"
            this.isPasswordVisible = !this.isPasswordVisible
            this.shadow.querySelector("#passwordImage").src = "app/assets/images/close_password.svg"
        }
    }

    managerConfirmPassword(){
        const passwordElement = this.shadow.querySelector("#confirm-password")
        if(!this.isConfirmPasswordVisible){
            passwordElement.type = "text"
            this.isConfirmPasswordVisible = !this.isConfirmPasswordVisible
            this.shadow.querySelector("#confirmPasswordImage").src = "app/assets/images/see_password.svg"
        }else{
            passwordElement.type = "password"
            this.isConfirmPasswordVisible = !this.isConfirmPasswordVisible
            this.shadow.querySelector("#confirmPasswordImage").src = "app/assets/images/close_password.svg"
        }
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

    
    clearLocalStorage(){
        localStorage.removeItem("assetName")
        localStorage.removeItem("assetCode")
        localStorage.removeItem("assetType")
        localStorage.removeItem("assetQuantity")
        localStorage.removeItem("typeOperation")
    }

}

customElements.define("signup-component", SignUp);
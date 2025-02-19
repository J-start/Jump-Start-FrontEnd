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

}

customElements.define("update-profile", UpdateProfile);
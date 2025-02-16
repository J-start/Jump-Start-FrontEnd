class PasswordChange extends HTMLElement {
  shadow = this.attachShadow({ mode: "open" });

  constructor() {
    super();
    this.shadow.appendChild(this.createHTML());
    this.createStyles(
      "app/components/passwordRecovery/passwordChange/passwordchange-style.css"
    );
    this.createStyles(
      "app/components/passwordRecovery/passwordChange/passwordchange-style-responsive.css"
    );
    this.shadow.querySelector("#password-form").addEventListener("submit", (event) =>{
      this.handleSubmit(event)
      

    })
  }

  createHTML() {
    const template = `
      <div class="email-container">
  <div class="principalText">
    <h1>Digite uma nova senha</h1>
  </div>
  <div>
    <p>Atenção, a senha deve ter no mínimo 8 caracteres e no máximo 20.</p>
  </div>

  <div class="email-form">
    <form id="password-form">
      <label for="password"></label>
      <input
        type="password"
        id="password"
        name="password"
        placeholder="Nova senha"
        minlength="8"
        maxlength="20"
        required
      />
      <label for="confirm-password"></label>
      <input
        type="password"
        id="confirm-password"
        name="confirm-password"
        placeholder="Confirme a nova senha"
        minlength="8"
        maxlength="20"
        required
      />
      <div class="buttonFormat">
      <button class="submit-button">Enviar</button>
      </div>
    </form>
  </div>
</div>
<div id="login-component"></div>
<div id="emailreceiver-component"></div>
    `;

    const componentRoot = document.createElement("div");
    componentRoot.setAttribute("class", "passwordchange-component");
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

  showComponentConfirmation() {
    this.shadow.querySelector(".email-container").style.display = "none";
    const component = document.createElement("signin-component");

    this.shadow.querySelector("#login-component").appendChild(component);
  }

  showComponentForm() {
    this.shadow.querySelector(".email-container").style.display = "none";
    const component = document.createElement("emailreceiver-component");

    this.shadow.querySelector("#emailreceiver-component").appendChild(component);
  }

  async handleSubmit(event) {
    event.preventDefault();//PESQUISAR

    const password = this.shadow.querySelector("#password").value;
    const confirmPassword =
      this.shadow.querySelector("#confirm-password").value;

    if (password !== confirmPassword) {
      alert("As senhas não coincidem. Tente novamente.");
      return;
    }

    if (password.length < 8 || password.length > 20) {
      alert("A senha deve ter entre 8 e 20 caracteres.");
      return;
    }

    try {
      await updatePassword(password);
      this.showComponentConfirmation(); 
    } catch (error) {
      alert("Erro ao atualizar a senha. Tente novamente mais tarde.");
      console.error(error);
      this.showComponentForm();
    }
  }
}

customElements.define("passwordchange-component", PasswordChange);

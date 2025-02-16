class EmailReceiver extends HTMLElement {
  shadow = this.attachShadow({ mode: "open" });

  constructor() {
    super();
    this.shadow.appendChild(this.createHTML());
    this.createStyles(
      "app/components/passwordRecovery/emailReceiver/emailreceiver-style.css"
    );
    this.createStyles(
      "app/components/passwordRecovery/emailReceiver/emailreceiver-style-responsive.css"
    );
  }

  connectedCallback() {
    this.addFormSubmitHandler();
  }

  createHTML() {
    const template = `
      <div class="email-container">
      <logo-component></logo-component>
        <div class="principalText">
          <h1>Digite um e-mail válido</h1>
        </div>
        <div>
          <p>Atenção, este deve ser exatamente o e-mail que está cadastrado na plataforma.</p>
        </div>

        <div class="email-form">
          <form id="email-form">
            <label for="email"></label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="exemplo@dominio.com"
              required
            />
            <input type="submit" value="Enviar e-mail" class="submit-button" />
          </form>
        </div>
      </div>
      <div id="confirmation-component"></div>
      <script src="app/components/logo/logo.js"></script>
    `;

    const componentRoot = document.createElement("div");
    componentRoot.setAttribute("class", "emailreceiver-component");
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
    const component = document.createElement("emailconfirmation-component");

    this.shadow.querySelector("#confirmation-component").appendChild(component);
  }

  addFormSubmitHandler() {
    const form = this.shadow.querySelector("#email-form");
    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      const emailInput = this.shadow.querySelector("#email");
      const email = emailInput.value.trim();

      if (!email) {
        alert("Por favor, insira um e-mail válido.");
        return;
      }

      const baseUrl = getUrl();
      const url = `${baseUrl}/investor/url/password/`;

      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });

        if (!response.ok) {
          throw new Error(
            `Não foi possível enviar o e-mail, digite novamente.`
          );
        }

        const result = await response.json();
        console.log("Sucesso:", result);
        this.showComponentConfirmation();
      } catch (error) {
        console.error("Erro:", error);
        alert(`Erro: ${error.message}`);
      }
    });
  }
}

customElements.define("emailreceiver-component", EmailReceiver);

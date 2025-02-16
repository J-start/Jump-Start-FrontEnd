class EmailReceiver extends HTMLElement {
  shadow = this.attachShadow({ mode: "open" });

  constructor() {
    super();

    this.shadow.appendChild(this.createHTML());
    this.createStyles(
      "app\components\passwordRecovery\emailReceiver\emailreceiver-style.css"
    );
    this.createStyles(
      "app\components\passwordRecovery\emailReceiver\emailreceiver-style-responsive.css"
    );
  }

  createHTML() {
    const template = `
      <div class="email-container">
  <div class="principalText">
    <h1>Digite um e-mail válido</h1>
  </div>
  <div><p>Atenção, este deve ser exatamente o e-mail que está cadastrado na plataforma.</p></div>

  <div class="email-form">
    <form action="#" method="post">
      <label for="email">Digite seu e-mail:</label>
      <input
        type="email"
        id="email"
        name="email"
        placeholder="exemplo@dominio.com"
        required
      />
      <input type="submit" value="Enviar e-mail" />
    </form>
  </div>
</div>

<div id="token-component"></div>

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
    }
    
    customElements.define("emailreceiver-component", EmailReceiver);
    
class DepositError extends HTMLElement {
  shadow = this.attachShadow({ mode: "open" });

  constructor() {
    super();

    this.shadow.appendChild(this.createHTML());
    this.createStyles(
      "../app/components/deposit/depositError/depositError-style.css"
    );
    this.createStyles(
      "../app/components/deposit/depositError/depositError-style-responsive.css"
    );
    this.getAttribute("messageError")
      ? (this.shadow.querySelector("#messageError").textContent =
          this.getAttribute("messageError"))
      : (this.shadow.querySelector("#messageError").textContent =
          "Erro desconhecido");
  }

  createHTML() {
    const template = `<div class="principalBlock">
    <h1>Ocorreu um erro!</h1>
    <h2 id="messageError"></h2>

    <div class="img">
        <img width="195px" height:"195px" src="../app/assets/images/error_icon.png" alt="confirmation_icon">
    </div>
</div>
     
        `;

    const componentRoot = document.createElement("div");
    componentRoot.setAttribute("class", "depositerror-component");
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

customElements.define("depositerror-component", DepositError);

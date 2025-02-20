class WithDrawProcedure extends HTMLElement {
  shadow = this.attachShadow({ mode: "open" });

  constructor() {
    super();

    this.shadow.appendChild(this.createHTML());
    this.createStyles(
      "../app/components/withdraw/withdrawProcedure/withdrawProcedure-style.css"
    );
    this.createStyles(
      "../app/components/withdraw/withdrawProcedure/withdraw-style-responsive.css"
    );

    this.shadow
      .querySelector("#buttonGo")
      .addEventListener("click", (event) => {
        event.preventDefault();
        const inputValue = this.shadow.querySelector("#valueInput").value;

        if (inputValue <= 0) {
          alert("Valor inválido. Deve ser maio que Zero.");
        } else {
          localStorage.setItem("withdrawValue", inputValue);
          this.showComponentConfirmation();
        }
      });
  }

  createHTML() {
    const template = `
      <div class="sellingBlockAlt">
          <div class="PageReturn">
              <h1>Qual valor você deseja sacar ?</h1>
              <p>Você pode realizar saque num valor igual ou menor ao que você possui em carteira.</p>
          </div>

          <div class="form-sendingValue">
              <form action="">
                  <input type="number" id="valueInput"> <br>
                  <div class="buttonFormat">
                      <div class="Sacar">
                          <button id="buttonGo">Avançar</button>
                      </div>
                  </div>
              </form>
          </div>
      </div>

      <div id="containerComponentAlt"></div>

        `;

    const componentRoot = document.createElement("div");
    componentRoot.setAttribute("class", "withdraw-component");
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
    this.shadow.querySelector(".sellingBlockAlt").style.display = "none";
    const component = document.createElement("withdrawconfirmation-component");

    this.shadow.querySelector("#containerComponentAlt").appendChild(component);
  }
}

customElements.define("withdraw-component", WithDrawProcedure);

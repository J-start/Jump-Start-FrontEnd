class DepositProcedure extends HTMLElement {
  shadow = this.attachShadow({ mode: "open" });

  constructor() {
    super();

    this.shadow.appendChild(this.createHTML());
    this.createStyles(
      "../app/components/deposit/depositProcedure/depositProcedure-style.css"
    );
    this.createStyles(
      "../app/components/deposit/depositProcedure/deposit-style-responsive.css"
    );

    this.shadow
      .querySelector("#buttonGo")
      .addEventListener("click", (event) => {
        event.preventDefault();
        const inputValue = this.shadow.querySelector("#valueInput").value;

        if (inputValue <= 0) {
          alert("Valor inválido");
        } else if (inputValue > 1000) {
          alert("O valor deve ser igual ou menor que R$1.000,00 (mil reais)");
        } else {
          localStorage.setItem("depositValue", inputValue);
          this.showComponentConfirmation();
        }
      });
  }

  createHTML() {
    const template = `
       <div class="sellingBlockAlt">
    <div class="PageReturn">
        <h1>Qual valor você deseja depositar ?</h1>
        <p>O valor máximo, acumulado, em depósitos ao dia é de R$1.000,00.</p>
    </div>
    <div class="form-sendingValue">
            <form action="">
              
                 <input type="number" id="valueInput"> <br>
                 <div class="buttonFormat">
        <div class="Sacar">
            <button id = "buttonGo">Avançar</button>
        </div>
    </div>
            </form>
        </div>

    
</div>

<div id = "containerComponentAlt"></div>

        `;

    const componentRoot = document.createElement("div");
    componentRoot.setAttribute("class", "deposit-component");
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
    const component = document.createElement("depositconfirmation-component");

    this.shadow.querySelector("#containerComponentAlt").appendChild(component);
  }
}

customElements.define("deposit-component", DepositProcedure);

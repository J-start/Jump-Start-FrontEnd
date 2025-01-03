class SellingTemplate extends HTMLElement {
  shadow = this.attachShadow({ mode: "open" });

  constructor() {
    super();

    this.shadow.appendChild(this.createHTML());
    this.createStyles(
      "app/components/sell/sellingTemplate/sellingTemplate-style.css"
    );
    this.createStyles(
      "app/components/sell/sellingTemplate/sellingTemplate-style-responsive.css"
    );
    this.showWhatIsSelling();
    this.managerTradableShare();
    this.shadow
      .querySelector("#insertValueOperation")
      .addEventListener("click", (event) => {
        event.preventDefault();
        const inputValue = this.shadow.querySelector("#valueInput").value;

        if (inputValue <= 0) {
          alert("Valor inválido");
        } else {
          if (localStorage.getItem("assetType") === "SHARE") {
            if (inputValue % 1 !== 0) {
              alert("Para ações, digite um valor inteiro");
              this.shadow.querySelector("#valueInput").value = "";
              return;
            }
          }
          localStorage.setItem("assetQuantity", inputValue);
          this.shadow.querySelector(".sellingBlock").remove();
          this.insertProcedureDOM();
        }
      });
  }

  createHTML() {
    const template = `

        <div class="sellingBlock">
        <div class="containerShowWhatIsSelling">
                <h3 id="assetName">Você está Vendendo </h3>
        </div>
        <div class="titlePage">
            <h1>Digite o quanto quer vender</h1>
        </div>

        <div class="form-sendingValue">
            <form action="">
              
                 <input type="number" id="valueInput"> <br>
                <button id="insertValueOperation">Avançar</button>
            </form>
        </div>
    </div>

    <div class="containerOtherScreens"></div>

        `;

    const componentRoot = document.createElement("div");
    componentRoot.setAttribute("class", "selling-component");
    componentRoot.innerHTML = template;
    return componentRoot;
  }

  insertProcedureDOM() {
    const procedure = document.createElement("sellingpro-component");
    this.shadow.querySelector(".containerOtherScreens").appendChild(procedure);
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
  showWhatIsSelling() {
    if (localStorage.getItem("assetType") === "SHARE") {
      const assetName = localStorage.getItem("assetCode");
      this.shadow.querySelector(
        "#assetName"
      ).innerHTML = `Você está vendendo ${assetName}`;
    } else {
      const assetName = localStorage.getItem("assetName");
      this.shadow.querySelector(
        "#assetName"
      ).innerHTML = `Você está vendendo ${assetName}`;
    }
  }

  managerTradableShare() {
    if (localStorage.getItem("assetType") == "SHARE") {
      if (!isTadable()) {
        window.location.href = "index.html";
      }
    }
  }
}

customElements.define("selling-component", SellingTemplate);

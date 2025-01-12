class SellingTemplate extends HTMLElement {
  shadow = this.attachShadow({ mode: "open" });
  quantity
  constructor() {
    super();

    this.shadow.appendChild(this.createHTML());
    this.createStyles("app/components/sell/sellingTemplate/sellingTemplate-style.css");
    this.createStyles("app/components/sell/sellingTemplate/sellingTemplate-style-responsive.css");

    this.getQuantityAsset()
    this.showWhatIsSelling();
    this.managerTradableShare();

    this.shadow.querySelector("#insertValueOperation").addEventListener("click", (event) => {
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

    this.shadow.querySelector("#valueInput").addEventListener("input", () => {
      let input = Number(this.shadow.querySelector("#valueInput").value)
      if (input > Number(this.quantity)) {
        this.shadow.querySelector("#insertValueOperation").disabled = true
        this.shadow.querySelector("#messageQuantityOutOfRange").style.display = "block"
        this.shadow.querySelector("#messageQuantityOutOfRange").innerHTML = "Quantidade inválida"
      } else {
        this.shadow.querySelector("#insertValueOperation").disabled = false
        this.shadow.querySelector("#messageQuantityOutOfRange").style.display = "none"
      }

    })
  }

  createHTML() {
    const template = `

        <div class="sellingBlock">
        <div class="containerShowWhatIsSelling">
            <h3 id="assetName">Você está Vendendo </h3>
            <h3 id="assetQuantity"></h3>
        </div>
        <div class="titlePage">
            <h1>Digite o quanto quer vender</h1>
        </div>

        <div class="form-sendingValue">
            <form action="">
              
                 <input type="number" id="valueInput"> <br>
                 <p id="messageQuantityOutOfRange"></p>
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

  getQuantityAsset() {
    if (localStorage.getItem("token") == null) {
      window.location.href = "signIn.html";
    }
    let asset = localStorage.getItem("assetCode")
    if (localStorage.getItem("assetType") != "SHARE") {
      asset = asset + "-BRL"
    }
    const url = `${getUrl()}/investor/quantity/?nameAsset=${asset}`;
    const TOKEN = localStorage.getItem("token")
    fetch(url, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${TOKEN}`
      }
    }).then(response => {
      return response.json();
    }).then(data => {
      if (data.code) {
        this.handleErrorApi(data.message)
        return
      }
      this.quantity = data.quantity
      console.log("Number(data.quantity) == 0 ", Number(data.quantity) == 0)
      if (Number(data.quantity) == 0) {
        this.shadow.querySelector("#assetName").style.display = "none"
        this.shadow.querySelector("#valueInput").disabled = true;
        this.shadow.querySelector("#assetQuantity").innerHTML = `Você não possui esse ativo em carteira`;
        this.shadow.querySelector("#assetQuantity").style.color = "#FF4848"
      } else {
        this.shadow.querySelector("#valueInput").disable = false
        this.shadow.querySelector("#assetName").style.display = "block"
        this.shadow.querySelector("#assetQuantity").innerHTML = `Quantidade em carteira: ${data.quantity}`;
        this.shadow.querySelector("#assetQuantity").style.color = "white"
      }

    }).catch(error => {

      console.error('Erro na requisição:', error);
    });
  }

  handleErrorApi(message) {

    if (this.contains(message, "token")) {
      alert("Token expirado, realize o login novamente")
      window.location.href = "signIn.html";
      return
    } else {
      alert("Aconteceu um erro, tente novamente")
      window.location.href = "operation.html";
      return
    }

  }

  contains(message, word) {
    let containWord = false
    let chunks = String(message).split(" ")
    chunks.forEach(e => {
      if (e == word) {
        containWord = true;
        return
      }
    })

    return containWord
  }
}

customElements.define("selling-component", SellingTemplate);

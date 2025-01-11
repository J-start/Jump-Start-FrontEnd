class HeaderWallet extends HTMLElement {
  shadow = this.attachShadow({ mode: "open" });

  constructor() {
    super();

    this.shadow.appendChild(this.createHTML());
    this.createStyles("app/components/headerWallet/headerWallet-style.css");
    this.createStyles(
      "app/components/headerWallet/headerWallet-style-responsive.css"
    );
    this.shadow.querySelector("#balance").innerHTML = "Carregando...";
    this.makeRequest();
    this.fetchBalanceInvestor()

    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible") {
        this.makeRequest();
      }
    });
    this.shadow.querySelector("#seeGraphic").addEventListener("click", () => {
      this.insertGraphic();
    });
    this.shadow
      .querySelector("#buttonAssetOperation")
      .addEventListener("click", () => {
        this.addHistoryAssetsComponent();
      });
    this.shadow
      .querySelector("#buttonWalletOperation")
      .addEventListener("click", () => {
        this.addHistoryOperationComponent();
      });
    this.shadow
      .querySelector("#buttonWithDraw")
      .addEventListener("click", () => {
        this.insertWithdrawPage();
      });
    this.shadow
      .querySelector("#buttonDeposit")
      .addEventListener("click", () => {
        this.insertDepositPage();
      });
  }

  createHTML() {
    const template = `
            <div class="wrapAll">
                <div class="containerAllElementsHeader">
                    <div class="containerAllElementsBalance">
                        <div class="containerTitleBalance">
                            <h2>Seu saldo</h2>
                        </div>
                        <div class="line"></div>
                        <div class="containerBalance">
                            <h2 id="balance"></h2>
                            <a id="seeGraphic" href="#">Ver detalhes</a>
                        </div>
                        <div class="containerButtons">
                            <button id="buttonWithDraw">Sacar</button>
                            <button id="buttonDeposit">Depositar</button>
                        </div>
                    </div>
                    <div class="containerAllElementsHistory">
                        <button id="buttonAssetOperation">Histórico de compra e venda</button>
                        <button id="buttonWalletOperation">Histórico de saque e depósito</button>
                    </div>
                </div>
            
            </div>

            <div class="containerOtherScreens"></div>
   
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

  makeRequest() {
    if (localStorage.getItem("token") === null) {
      return
    }
    const TOKEN = localStorage.getItem("token");
    const url = `${getUrl()}/wallet/datas/`;
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.code) {
          this.handleErrorApi(data.message)
          return
        }
        localStorage.setItem("walletAssets", JSON.stringify(data["Assets"]));
        this.updateBalance(data["InvestorBalance"]);
      })
      .catch((error) => {
        console.error("Erro na requisição:", error);
      });
  }

  fetchBalanceInvestor() {
    if (localStorage.getItem("token") === null) {
      return
    }
    const TOKEN = localStorage.getItem("token");
    const url = `${getUrl()}/investor/name/`;

    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },

    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const balance = data.balance;

        localStorage.setItem("balance", balance);
      })
      .catch((error) => {
        console.log("error:  ", error);
        console.error("Erro ao obter dados da carteira:", error);
      });
  }

  insertGraphic() {
    this.removeExistingGraphic();

    const graphicContainer = document.createElement("div");
    graphicContainer.className = "containerGraphicWallet";

    const canvas = document.createElement("wallet-component");
    graphicContainer.appendChild(canvas);

    this.shadow.appendChild(graphicContainer);
  }

  removeExistingGraphic() {
    const existingGraphic = this.shadow.querySelector(
      ".containerGraphicWallet"
    );
    if (existingGraphic) {
      existingGraphic.remove();
    }
  }

  updateBalance(balance) {
    console.log(balance);
    if (balance >= 0)
      this.shadow.querySelector("#balance").innerHTML =
        "R$ " + Number(balance).toFixed(2);
  }

  addHistoryAssetsComponent() {
    this.removeExistingHistoric();

    const containerHistoric = document.createElement("div");
    containerHistoric.className = "containerHistory";
    const historyComponent = document.createElement("historyassets-component");
    containerHistoric.appendChild(historyComponent);

    this.shadow.querySelector(".home-component").appendChild(containerHistoric);
  }

  addHistoryOperationComponent() {
    this.removeExistingHistoric();

    const containerHistoric = document.createElement("div");
    containerHistoric.className = "containerHistory";
    const historyComponent = document.createElement(
      "historyoperation-component"
    );
    containerHistoric.appendChild(historyComponent);

    this.shadow.querySelector(".home-component").appendChild(containerHistoric);
  }
  removeExistingHistoric() {
    const existingGraphic = this.shadow.querySelector(".containerHistory");
    if (existingGraphic) {
      existingGraphic.remove();
    }
  }

  insertWithdrawPage() {
    this.shadow.querySelector(".wrapAll").remove();
    const withdraw = document.createElement("withdraw-component");
    this.shadow.querySelector(".containerOtherScreens").appendChild(withdraw);
  }

  insertDepositPage() {
    this.shadow.querySelector(".wrapAll").remove();
    const deposit = document.createElement("deposit-component");
    this.shadow.querySelector(".containerOtherScreens").appendChild(deposit);
  }

  handleErrorApi(message) {

    if (this.contains(message, "token")) {
      alert("Token expirado, realize o login novamente")
      window.location.href = "signIn.html";
      return
    } else {
      alert(message)
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

customElements.define("headerwallet-component", HeaderWallet);

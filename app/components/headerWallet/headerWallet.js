class HeaderWallet extends HTMLElement {
  shadow = this.attachShadow({ mode: "open" });

  constructor() {
    super();

    this.shadow.appendChild(this.createHTML());
    this.createStyles("app/components/headerWallet/headerWallet-style.css");
    this.createStyles(
      "app/components/headerWallet/headerWallet-style-responsive.css"
    );
    this.makeRequest();

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
    const TOKEN = "aaa";
    const url = `${getUrl()}/wallet/datas/`;
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          console.error("Erro na requisição");
        }
        return response.json();
      })
      .then((data) => {
        localStorage.setItem("walletAssets", JSON.stringify(data["Assets"]));
        //localStorage.setItem("balance", JSON.stringify());
        console.log(data["InvestorBalance"]);
        this.updateBalance(data["InvestorBalance"]);
      })
      .catch((error) => {
        console.error("Erro na requisição:", error);
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
      //const balance = JSON.parse(localStorage.getItem("balance"));
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

  insertDepositPage() {}
}

customElements.define("headerwallet-component", HeaderWallet);

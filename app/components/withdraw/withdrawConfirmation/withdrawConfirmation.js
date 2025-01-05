class WithdrawConfirmation extends HTMLElement {
  shadow = this.attachShadow({ mode: "open" });

  constructor() {
    super();

    this.shadow.appendChild(this.createHTML());
    this.createStyles(
      "app/components/withdraw/withdrawConfirmation/withdrawConfirmation-style.css"
    );
    this.createStyles(
      "app/components/withdraw/withdrawConfirmation/withdrawConfirmation-style-responsive.css"
    );

    this.insertWithdrawData();
    localStorage.setItem("Operação", "Saque");

    this.shadow.querySelector(".back").addEventListener("click", () => {
      window.location.href = "operationWallet.html";
    });
    this.shadow.querySelector("#sellAsset").addEventListener("click", () => {
      this.makeRequest();
    });
  }

  createHTML() {
    const template = `
 
            <div id="containerAll">
                <div class="principalBlock">
                
                    <h1>Confirme as informações</h1>

<div class="detailsTab">
    <table>
        <tbody>
            <tr>
                <th scope="row">Operação</th>
                <td id="assetName">Saque</td>
                <div class="line"></div>
            </tr>

            

            <tr>
                <th scope="row">Valor da operação</th>
                <td id="assetValue" ></td>
            </tr>

            

            <tr>
                <th scope="row">Data</th>
                <td id="assetDate" ></td>
            </tr>
        </tbody>
    </table>
  
    
</div>

<div class="buttonFormat">
        <div class="back">
            <button>Voltar</button>
        </div>

        <div class="buttonSell">
            <button id="sellAsset">Sacar</button>
        </div>
    </div>
    </div>

    </div>
    <div class="containerCountDown">
        <h4 id="countDown"></h4>
    </div>
    
    <div class="containerOtherScreens"></div>
        `;

    const componentRoot = document.createElement("div");
    componentRoot.setAttribute("class", "withdrawconfirmation-componentContainer");
    componentRoot.innerHTML = template;
    return componentRoot;
  }

  makeRequest() {
    if(localStorage.getItem("token") === null){
      window.location.href = "signIn.html"
      return
    }
    const TOKEN = localStorage.getItem("token");
    let code = "";

    const datasPost = JSON.stringify({
      value: parseFloat(localStorage.getItem("withdrawValue")),
    });
    const url = `${getUrl()}/withdraw/`;
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },

      body: datasPost,
    })
      .then((response) => {
        console.log(response);
        if (!response.ok) {
          console.error("Erro na requisição");
        }
        return response.json();
      })
      .then((data) => {
        if (data["code"] != 200) {
          this.insertPageError(data["message"]);
          this.makeCountDownError();
        } else {
          this.insertPageSuccess();
          this.makeCountDownSuccess();
        }
      })
      .catch((error) => {
        console.error("Erro na requisição:", error);
      });
  }


  
  insertPageSuccess() {
    this.shadow.querySelector("#containerAll").remove();
    const success = document.createElement("withdrawconclusion-component");
    this.shadow.querySelector(".containerOtherScreens").appendChild(success);
  }

  insertPageError(messageError) {
    this.shadow.querySelector("#containerAll").remove();
    this.shadow.querySelector(
      ".containerOtherScreens"
    ).innerHTML = `<withdrawerror-component messageError="${messageError}"></withdrawerror-component>`;
  }

  insertWithdrawData() {
    this.shadow.querySelector("#assetValue").innerHTML =
      "R$ " + Number(Number(localStorage.getItem("withdrawValue")).toFixed(4));
    this.shadow.querySelector("#assetDate").innerHTML =
      new Date().toLocaleDateString();
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

  makeCountDownSuccess() {
    let count = 5;
    const countDown = this.shadow.querySelector("#countDown");
    const interval = setInterval(() => {
      count--;
      countDown.innerHTML = `Você será redirecionado para a página inicial em ${count} segundos`;
      if (count === 0) {
        clearInterval(interval);
        this.clearLocalStorage();
        this.clearLocalStorage();
        window.location.href = "index.html";
      }
    }, 1000);
  }

  makeCountDownError() {
    let count = 5;
    const countDown = this.shadow.querySelector("#countDown");
    const interval = setInterval(() => {
      count--;
      countDown.innerHTML = `Você será redirecionado para tentar novamente em ${count} segundos`;
      if (count === 0) {
        clearInterval(interval);
        window.location.href = "index.html";
      }
    }, 1000);
  }

  clearLocalStorage() {
    localStorage.removeItem("TokenInvestor");
    localStorage.removeItem("withdrawValue");
  }
}

customElements.define("withdrawconfirmation-component", WithdrawConfirmation);

class DepositConfirmation extends HTMLElement {
  shadow = this.attachShadow({ mode: "open" });

  constructor() {
    super();

    this.shadow.appendChild(this.createHTML());
    this.createStyles(
      "app/components/deposit/depositConfirmation/depositConfirmation-style.css"
    );
    this.createStyles(
      "app/components/deposit/depositConfirmation/depositConfirmation-style-responsive.css"
    );

    this.insertDepositData();
    localStorage.setItem("Operação", "Depósito");

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
                <td id="assetName">Depósito</td>
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
            <button id="sellAsset">Depositar</button>
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
    componentRoot.setAttribute("class", "depositconfirmation-component");
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
      value: parseFloat(localStorage.getItem("depositValue")),
    });
    console.log("datasPost ",datasPost);
    const url = `${getUrl()}/deposit/`;
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },

      body: datasPost,
    })
      .then((response) => {
        if (!response.ok) {
          console.error("Erro na requisição");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
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
    const success = document.createElement("depositconclusion-component");
    this.shadow.querySelector(".containerOtherScreens").appendChild(success);
  }

  insertPageError(messageError) {
    this.shadow.querySelector("#containerAll").remove();
    this.shadow.querySelector(
      ".containerOtherScreens"
    ).innerHTML = `<depositerror-component messageError="${messageError}"></depositerror-component>`;
  }

  insertDepositData() {
    this.shadow.querySelector("#assetValue").innerHTML =
      "R$ " + Number(Number(localStorage.getItem("depositValue")).toFixed(4));
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
    let count = 3;
    const countDown = this.shadow.querySelector("#countDown");
    const interval = setInterval(() => {
      count--;
      countDown.innerHTML = `Você será redirecionado para a carteira em ${count} segundos`;
      if (count === 0) {
        clearInterval(interval);
        this.clearLocalStorage();
        window.location.href = "wallet.html";
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
    localStorage.removeItem("depositValue");
    localStorage.removeItem("Operação");
  }
}

customElements.define("depositconfirmation-component", DepositConfirmation);

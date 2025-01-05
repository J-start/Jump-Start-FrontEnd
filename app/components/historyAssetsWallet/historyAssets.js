class HistoryAssets extends HTMLElement {
  shadow = this.attachShadow({ mode: "open" });

  constructor() {
    super();

    this.offset = 0;
    this.isFetching = false;

    this.shadow.appendChild(this.createHTML());
    this.createStyles(
      "app/components/historyAssetsWallet/historyAssets-style.css"
    );
    this.createStyles(
      "app/components/historyAssetsWallet/historyAssets-style-responsive.css"
    );
    this.createHistory();
    this.shadow.querySelector("#close").addEventListener("click", () => {
      this.remove();
    });
    this.addInfiniteScrollListener();
  }

  createHTML() {
    const template = `
       <div class="containerHistory">
        <p id="close">X</p>
        <div class="wrapHistory">
        </div>
       </div>
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
  async makeRequest() {
    if(localStorage.getItem("token") === null){
      return
    }
    const TOKEN = localStorage.getItem("token");
    let body = { offset: this.offset };
    const url = `${getUrl()}/history/assets/`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        console.error("Erro na requisição:", response.statusText);
        return null;
      }

      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error("Erro na requisição:", error);
      return null;
    }
  }

  createElment(history) {
    console.log(history);
    const containerHead = document.createElement("div");
    containerHead.classList.add("containerHead");

    const assetName = document.createElement("h2");
    assetName.textContent = history.AssetName;

    const assetType = document.createElement("h2");
    assetType.textContent = history.AssetType;

    containerHead.appendChild(assetName);
    containerHead.appendChild(assetType);

    const containerBody = document.createElement("div");
    containerBody.classList.add("containerBody");

    const assetValue = document.createElement("h3");
    assetValue.textContent = `Valor: ${history.AssetValue}`;

    const operationDate = document.createElement("h3");
    operationDate.textContent = `Data: ${history.OperationDate}`;

    const operationType = document.createElement("h3");
    operationType.textContent = `Tipo: ${history.OperationType}`;

    containerBody.appendChild(assetValue);
    containerBody.appendChild(operationDate);
    containerBody.appendChild(operationType);

    const parentElement = this.shadow.querySelector(".wrapHistory");
    parentElement.appendChild(containerHead);
    parentElement.appendChild(containerBody);
  }

  async createHistory() {
    if (this.isFetching) return;
    this.isFetching = true;

    let datas = await this.makeRequest();
    if (datas == null) {
      this.isFetching = false;
      return;
    }
    console.log(datas);
    datas = datas.map((data) => {
      data.OperationDate = this.conversationDate(data.OperationDate);
      data.AssetValue = Number(data.AssetValue * data.AssetQuantity).toFixed(2);

      data.OperationType = this.conversationType(data.OperationType);

      data.AssetType = this.conversationAssetType(data.AssetType);

      return data;
    });

    datas.forEach((data) => this.createElment(data));
    this.offset++;
    this.isFetching = false;
  }

  conversationType(type) {
    if (type == "BUY") {
      return "COMPRA";
    }
    if (type == "SELL") {
      return "VENDA";
    }
  }
  conversationAssetType(type) {
    if (type == "SHARE") {
      return "AÇÃO";
    }
    if (type == "COIN") {
      return "MOEDA";
    }
    if (type == "CRYPTO") {
      return "CRYPTO";
    }
    if (type == "AÇÃO") {
      return "AÇÃO";
    }
  }
  conversationDate(date) {
    return date.replaceAll("-", "/");
  }

  addInfiniteScrollListener() {
    const wrapHistory = this.shadow.querySelector(".wrapHistory");
    wrapHistory.addEventListener("scroll", async () => {
      if (
        wrapHistory.scrollTop + wrapHistory.clientHeight >=
        wrapHistory.scrollHeight - 10
      ) {
        await this.createHistory();
      }
    });
  }
}

customElements.define("historyassets-component", HistoryAssets);

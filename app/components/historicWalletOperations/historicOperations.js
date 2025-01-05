class HistoryOperation extends HTMLElement {
  shadow = this.attachShadow({ mode: "open" });

  constructor() {
    super();

    this.offset = 0;
    this.isFetching = false;

    this.shadow.appendChild(this.createHTML());
    this.createStyles(
      "app/components/historicWalletOperations/historicOperations-style.css"
    );
    this.createStyles(
      "app/components/historicWalletOperations/historicOperations-style-responsive.css"
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
    const TOKEN = "aaa";
    let body = { offset: this.offset };
    const url = `${getUrl()}/history/operations/`;

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
      return data;
    } catch (error) {
      console.error("Erro na requisição:", error);
      return null;
    }
  }

  createElment(history) {
    const containerHead = document.createElement("div");
    containerHead.classList.add("containerHead");

    const assetName = document.createElement("h2");
    assetName.textContent = history.OperationType;

    containerHead.appendChild(assetName);

    const containerBody = document.createElement("div");
    containerBody.classList.add("containerBody");

    const assetValue = document.createElement("h3");
    assetValue.textContent = `Valor: ${history.OperationValue}`;

    const operationDate = document.createElement("h3");
    operationDate.textContent = `Data: ${history.OperationDate}`;

    containerBody.appendChild(assetValue);
    containerBody.appendChild(operationDate);

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

    datas = datas.map((data) => {
      data.OperationDate = this.conversationDate(data.OperationDate);
      data.OperationType = this.conversationType(data.OperationType);
      return data;
    });

    datas.forEach((data) => this.createElment(data));

    this.offset++;
    this.isFetching = false;
  }

  conversationType(type) {
    if (type == "DEPOSIT") {
      return "DEPOSITO";
    }
    if (type == "WITHDRAW") {
      return "SAQUE";
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

customElements.define("historyoperation-component", HistoryOperation);

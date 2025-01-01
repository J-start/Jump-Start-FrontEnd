class WithDrawProcedure extends HTMLElement {
  shadow = this.attachShadow({ mode: "open" });

  constructor() {
    super();

    this.shadow.appendChild(this.createHTML());
    this.createStyles(
      "app/components/withdraw/withdrawProcedure/withdrawProcedure-style.css"
    );
    this.createStyles(
      "app/components/withdraw/withdrawProcedure/withdraw-style-responsive.css"
    );
  }

  createHTML() {
    const template = `
       <div class="sellingBlockAlt">
    <div class="PageReturn">
        <h1>Qual valor você deseja sacar ?</h1>
        <p>Você pode comprar ativos e esperar por sua valorização, para que os possa vender.</p>
    </div>
    <div class="form-sendingValue">
            <form action="">
              
                 <input type="number" id="valueInput"> <br>
            </form>
        </div>

    <div class="buttonFormat">
        <div class="Sacar">
            <button>Sacar</button>
        </div>
    </div>
</div>

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
}

customElements.define("withdraw-component", WithDrawProcedure);

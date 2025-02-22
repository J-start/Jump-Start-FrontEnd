class BuyForm extends HTMLElement {

    shadow = this.attachShadow({ mode: "open" });

    constructor() {
        super()

        this.shadow.appendChild(this.createHTML())
        this.createStyles("app/components/buy/buyForm/buyForm-style.css")
        this.createStyles("app/components/buy/buyForm/buyForm-style-responsive.css")
        
        this.shadow.querySelector(".containerShowWhatIsBuying").style.display = "none"
        this.shadow.querySelector("#containerAll").style.display = "none"
        
        this.showWhatIsBuying()
        this.managerTradableShare()
        
        this.shadow.querySelector(".wait").remove()

        this.shadow.querySelector(".containerShowWhatIsBuying").style.display = ""
        this.shadow.querySelector("#containerAll").style.display = ""

        this.shadow.querySelector("#advanceButton").addEventListener("click", () => {
            const quantity = this.shadow.querySelector("#quantityInput").value
            if (quantity > 0) {
                if(localStorage.getItem("assetType") === "SHARE"){
                    if (quantity % 1 !== 0){
                        alert("Para ações, digite um valor inteiro")
                        this.shadow.querySelector("#quantityInput").value = ""
                        return
                    }
                }
                localStorage.setItem("assetQuantity", quantity)
                this.shadow.querySelector(".buyForm-component").remove()
                this.createFormConfirm()
            } else {
                alert("Digite um valor válido")
            }

        })

        this.shadow.querySelector("#quantityInput").addEventListener("input", () => {
            if(this.calculateValue() !== null){
                const value = this.calculateValue()

                 if(value > Number(localStorage.getItem("balance"))){
                     this.shadow.querySelector("#currentValue").style.color = "#FF4848"
                     this.shadow.querySelector("#advanceButton").disabled = true
                 }else{
                    this.shadow.querySelector("#currentValue").style.color = "#1465FF"
                    this.shadow.querySelector("#advanceButton").disabled = false
                 }
            }
           
        })
        
}

    createHTML() {

        const template =
            `
            <div class="wait">
                <spinner-component></spinner-component>
            </div>
            <div class="containerShowWhatIsBuying">
                <h3 id="assetName">Você está comprando </h3>
                <h3 id="balance"></h3>
            </div>

            <div id="containerAll">

                <div id="containerTitle">
                    <h1>Selecione o quanto quer<br> comprar</h1>
                </div>

                <div id="containerForm">
                    <input type="number" placeholder="" id="quantityInput" />
                    <p id="currentValue"></p>
                    <button id="advanceButton">Avançar</button>
                </div>

            </div>
       
        `

        const componentRoot = document.createElement("div");
        componentRoot.setAttribute("class", "buyForm-component");
        componentRoot.innerHTML = template;
        return componentRoot

    }

    createFormConfirm(){
        const form = document.createElement("buyconfirmation-component")
        this.shadow.appendChild(form)
    }

    createStyles(...linksUser) {

        linksUser.forEach(e => {
            const link = this.createLink(e)
            this.shadow.appendChild(link)
        })

    }
  
    createLink(linkStyle) {
        const link = document.createElement("link");
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("href", linkStyle);
        return link
    }
    
    showWhatIsBuying(){
        if (localStorage.getItem("assetType") === "SHARE") {
             const assetName = localStorage.getItem("assetCode")
             this.shadow.querySelector("#assetName").innerHTML = `Você está comprando ${assetName}`
        }else{
           const assetName = localStorage.getItem("assetName")
            this.shadow.querySelector("#assetName").innerHTML = `Você está comprando ${assetName}` 
        }

        this.showBalance()
        
    }

    async showBalance(){
        let balanceReturn = await this.fetchBalanceInvestor().then((data) => {
            return data.balance;
          })
          .catch((error) => {
            alert("Ocorreu um erro ao buscar os dados, tente novamente")
            window.location.href = "index.html"
            return null;
          });

        if (balanceReturn !== null) {
            localStorage.setItem("balance", balanceReturn);
        }

        const balance = Number(localStorage.getItem("balance")).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2  
          });
        this.shadow.querySelector("#balance").innerHTML = `Saldo: ${balance}`
    }

    managerTradableShare(){
        if(localStorage.getItem("assetType") == "SHARE"){
            if(!isTadable()){
               window.location.href = "index.html"
            }
        }
    }

    async fetchBalanceInvestor() {
        const TOKEN = localStorage.getItem("token");
        const url = `${getUrl()}/investor/name/`;
    
        return fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${TOKEN}`,
          },
    
        }).then((response) => {
            return response.json();
          })
      }

    calculateValue(){
        if(localStorage.getItem("assetValue") == null || Number(this.shadow.querySelector("#quantityInput").value) == 0){
            this.shadow.querySelector("#currentValue").style.display = "none"
            return null
        }
         this.shadow.querySelector("#currentValue").style.display = "block"
        let value = Number(localStorage.getItem("assetValue")) * Number(this.shadow.querySelector("#quantityInput").value)
        const formattedValue = Number(value).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 3,
            maximumFractionDigits: 4  
          });
          this.shadow.querySelector("#currentValue").innerHTML = `Valor total: ${formattedValue}`
        return value
    }
        

}

customElements.define("buyform-component", BuyForm);
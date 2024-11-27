class AssetDetails extends HTMLElement {

    shadow = this.attachShadow({ mode: "open" });

    constructor() {
        super()

        this.shadow.appendChild(this.createHTML())

        this.createStyles("app/components/assetDetails/assetDetails-style.css")
        this.createStyles("app/components/assetDetails/assetDetails-style-responsive.css")
        
        if(localStorage.getItem("assetType")){
            this.showResponse()
        }else{
            window.location.href = "index.html"
        }
        
        document.title = localStorage.getItem("assetName")

        this.verifyLocalStorage()

        this.shadow.querySelector("#buttonSell").addEventListener("click", () => {
            localStorage.setItem("typeOperation","SELL")
            window.location.href = "operation.html"
        })

        this.shadow.querySelector("#buttonBuy").addEventListener("click", () => {
            localStorage.setItem("typeOperation","BUY")
            window.location.href = "operation.html"
        })
    }

    createHTML() {

        const template =
            `
            <div class="containerAssetAndBalance">
              
            </div>
            
            <div class="line"></div>
            
            <div class="containerAssetValue">
                <p>Cotação atual:</p>
                <h2 id="valueAsset"></h2>
            </div>
        <div class="lineGraphic"></div>
            <div class="containerGraphicPage">
                <graphic-component></graphic-component>
            </div>

        <div class="lineGraphic"></div>

            <div class="containerButtons">
                <button id="buttonSell">Vender</button>
                <button id="buttonBuy">Comprar</button>
            </div>

           

            
        `

        const componentRoot = document.createElement("div");
        componentRoot.setAttribute("class", "assetdetails-component");
        componentRoot.innerHTML = template;
        return componentRoot

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

    async makeRequestApi(urlparam) {
        
        return fetch(urlparam)
            .then(response => {
                if (!response.ok) {
                    console.error("Erro na requisição");
                }
                return response.json();
            })
            .catch(error => {
                console.error('Erro na requisição:', error);
            });
    }



    async showResponse() {

        const data = await this.makeRequestApi(this.buildUrl())
        const value = this.getValueAsset(data)
        
        this.buildResponse()
        this.shadow.querySelector("#valueAsset").innerHTML = "R$ "+value


      
    
}

    buildUrl(){
        let url = ""
        let asset = localStorage.getItem("assetCode")
    
        if(localStorage.getItem("assetType") === "SHARE"){
            url = `http://localhost:8080/data/share/?shareName=${asset}`
        }else if(localStorage.getItem("assetType") === "COIN"){
             url = `https://economia.awesomeapi.com.br/json/last/${asset}`
        }else{
            url = `https://api.mercadobitcoin.net/api/v4/tickers?symbols=${asset}`
        }

        return url
    }

    getValueAsset(data){
        let value = ""
        if(localStorage.getItem("assetType") === "SHARE"){
            value = data.CloseShare
        }else if(localStorage.getItem("assetType") === "CRYPTO"){
            value = parseFloat(data[0].last).toFixed(3)
        }else{
             let coin =String(localStorage.getItem("assetCode")).replace("-", "")
            value = parseFloat(data[coin].bid).toFixed(3)
        }

        return value
    }

    buildResponse() {
        if(localStorage.getItem("assetType") === "SHARE"){
            this.createNameAsset(localStorage.getItem("assetName"), localStorage.getItem("assetCode"))
            this.createBalance()
        }else if(localStorage.getItem("assetType") === "CRYPTO"){
            this.createNameAsset("",localStorage.getItem("assetName"))
            this.createBalance()
        }else{
            this.createNameAsset(localStorage.getItem("assetCode").replace("-BRL", ""), String(localStorage.getItem("assetName")))
            this.createBalance()
        }
    }

    createNameAsset(assetName, assetCode) {

        const containerAll = this.shadow.querySelector(".containerAssetAndBalance");

        let containerAsset = document.createElement("div")
        containerAsset.setAttribute("class", "containerAsset")
        let h1 = document.createElement("h1")
        
        h1.innerHTML = assetCode
        let h3 = document.createElement("h3")
        h3.innerHTML = assetName

        containerAsset.appendChild(h1)
        containerAsset.appendChild(h3)

        containerAll.appendChild(containerAsset)
    }

    createBalance(balance) {

        const containerAll = this.shadow.querySelector(".containerAssetAndBalance");
      
        const containerBalance = document.createElement('div');
        containerBalance.classList.add('containerBalance');

        const containerBalanceTitle = document.createElement('div');
        containerBalanceTitle.classList.add('containerBalanceTitle');
        const title = document.createElement('h3');
        title.textContent = 'Seu saldo';
        containerBalanceTitle.appendChild(title);

     
        const containerBalanceValue = document.createElement('div');
        containerBalanceValue.classList.add('containerBalanceValue');
        const balanceValue = document.createElement('h3');
        balanceValue.textContent = 'R$ 1.000,00';
        containerBalanceValue.appendChild(balanceValue);

    
        containerBalance.appendChild(containerBalanceTitle);
        containerBalance.appendChild(containerBalanceValue);


        containerAll.appendChild(containerBalance);

    }

    verifyLocalStorage() {
        setInterval(() => {
            if ((!localStorage.getItem("assetType")) || (!localStorage.getItem("assetName")) || (!localStorage.getItem("assetCode"))) {
                window.location.href = "index.html";
            }
        }, 1000); 
    }
}

customElements.define("assetdetails-component", AssetDetails);
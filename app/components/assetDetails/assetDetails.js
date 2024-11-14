class AssetDetails extends HTMLElement {

    shadow = this.attachShadow({ mode: "open" });

    constructor() {
        super()

        this.shadow.appendChild(this.createHTML())
        this.createStyles("app/components/assetDetails/assetDetails-style.css")
        this.createStyles("app/components/assetDetails/assetDetails-style-responsive.css")
        this.buildResponse()
    }

    createHTML() {

        const template =
            `
            <div class="containerAssetAndBalance">
              
            </div>

            <div class="line"></div>


            

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
        let asset = localStorage.getItem("assetCode")
        const url = `${urlparam}${asset}`
        
        return fetch(url)
            .then(response => {
                if (!response.ok) {
                    alert("Erro na requisição");
                }
                return response.json();
            })
            .catch(error => {
                console.error('Erro na requisição:', error);
            });
    }



    async showResponse() {

        const data = await this.makeRequestApi(this.buildUrl())
        

        //this.createNameAsset(assetName, assetCode)
        //this.createBalance()
    }

    buildUrl(){
        let url = ""

        if(localStorage.getItem("assetType") === "SHARE"){
            url = "http://localhost:8080/datas/shares"
        }else if(localStorage.getItem("assetType") === "COIN"){
             url = "https://economia.awesomeapi.com.br/json/last/"
        }else{
            url = "https://api.mercadobitcoin.net/api/v4/tickers?symbols="
        }

        return url
    }

    buildResponse() {
        if(localStorage.getItem("assetType") === "SHARE"){
            //this.createNameAsset(localStorage.getItem("assetName"), String(localStorage.getItem("assetName")).replace("-BRL", ""))
            //this.createBalance()
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

}

customElements.define("assetdetails-component", AssetDetails);
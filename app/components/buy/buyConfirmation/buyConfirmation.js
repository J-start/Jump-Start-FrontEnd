class BuyConfirmation extends HTMLElement {

    shadow = this.attachShadow({ mode: "open" });

    constructor() {
        super()

        this.shadow.appendChild(this.createHTML())
        this.createStyles("app/components/buy/buyConfirmation/buyConfirmation-style.css")
        this.createStyles("app/components/buy/buyConfirmation/buyConfirmation-style-responsive.css")
        
        this.shadow.querySelector("#containerAll").style.display = "none"
        this.shadow.querySelector("#advanceButton").innerHTML = "avançar"
        this.insertValuesAsset()

        this.shadow.querySelector("#containerAll").style.display = ""

        this.shadow.querySelector("#backButton").addEventListener("click", () => {
            window.location.href = "operation.html"
        })
        this.shadow.querySelector("#advanceButton").addEventListener("click", () => {
            this.makeRequest()
        })

    }

    createHTML() {

        const template =
            `
            <div id="containerAll">
            <div id="containerTitle">
                <h1>Confirme as informações</h1>
            </div>
            <div id="containerForm">
                <div class="infoRow">
                    <p class="infoLabel">Ativo escolhido</p>
                    <p class="infoValue" id="assetName"></p>
                </div>
                <div class="infoRow">
                    <p class="infoLabel">Valor da compra</p>
                    <p class="infoValue" id="assetValue"></p>
                </div>
                <div class="infoRow">
                    <p class="infoLabel">Data</p>
                    <p class="infoValue" id="assetDate"></p>
                </div>
            </div>
            <div class="wrapButton">
            <button id="backButton" >  Voltar</button>
            
            <button id="advanceButton" >Comprar</button>
            </div>
            </div>
            <div class="containerOtherScreens"></div>
            <h4 id="countDown"></h4>

            
        `

        const componentRoot = document.createElement("div");
        componentRoot.setAttribute("class", "buyConfirmation-component");
        componentRoot.innerHTML = template;
        return componentRoot

    }

    createStyles(...linksUser) {

        linksUser.forEach(e => {
            const link = this.createLink(e)
            this.shadow.appendChild(link)
        })

    }
    makeRequest() {
        
        if(localStorage.getItem("token") === null){
            window.location.href = "signIn.html"
        }
        this.shadow.querySelector("#advanceButton").innerHTML = "<div id='spinnerButton'></div>"
        const TOKEN = localStorage.getItem("token")
        let code = ""
        if (localStorage.getItem("assetType") != "SHARE"){
            code = "-BRL"
        }
        const a = JSON.stringify({
            AssetName: String(localStorage.getItem("assetName")),
            AssetCode: String(localStorage.getItem("assetCode"))+code,
            AssetType: String(localStorage.getItem("assetType")),
            AssetAmount: parseFloat(localStorage.getItem("assetQuantity")),
            OperationType: String(localStorage.getItem("typeOperation"))
        })
        const url = `${getUrl()}/buy/`
        fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${TOKEN}`
            },

            body: a
        }).then(response => {
            if (!response.ok) {
                console.error("Erro na requisição");
            }
            return response.json();
        }
        ).then(data => {
            if (data['code'] != 200) {
                this.insertPageError(data['message'])
                if(data['message'] == "mercado fechado"){
                    this.makeCountmarketClosed()
                }else{
                    this.makeCountDownError()
                }
                
            } else {
                this.insertPageSuccess()
                this.makeCountDownSuccess()
            }

        }).catch(error => {
            this.insertPageError("Tente novamente")
            this.makeCountDownError()
            console.error('Erro na requisição:', error
            );
        });

    }

    insertPageSuccess() {
        this.shadow.querySelector("#containerAll").remove()
        const success = document.createElement("sellingconc-component");
        this.shadow.querySelector(".containerOtherScreens").appendChild(success)
    }

    insertPageError(messageError) {
        this.shadow.querySelector("#containerAll").remove()
        this.shadow.querySelector(".containerOtherScreens").innerHTML = `<sellingerror-component messageError="${messageError}"></sellingerror-component>`

    }
    createLink(linkStyle) {
        const link = document.createElement("link");
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("href", linkStyle);
        return link
    }
    insertValuesAsset() {
        this.shadow.querySelector("#assetName").innerHTML = localStorage.getItem("assetName")
        const value = Number(Number(localStorage.getItem("assetValue")).toFixed(4) * Number(localStorage.getItem("assetQuantity")).toFixed(4)).toFixed(4)
        const formattedvalue = Number(value).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 3,
            maximumFractionDigits: 4  
          });
        this.shadow.querySelector("#assetValue").innerHTML = formattedvalue
        this.shadow.querySelector("#assetDate").innerHTML = new Date().toLocaleDateString()
    }

    clearLocalStorage() {
        localStorage.removeItem("assetCode")
        localStorage.removeItem("assetName")
        localStorage.removeItem("assetQuantity")
        localStorage.removeItem("assetType")
        localStorage.removeItem("assetValue")
        localStorage.removeItem("typeOperation")
        localStorage.removeItem("dateOperation")
        localStorage.removeItem("walletAssets")
        localStorage.removeItem("balance")
    }

    makeCountDownSuccess() {
        let count = 5
        const countDown = this.shadow.querySelector("#countDown")
        const interval = setInterval(() => {
            
            count--
            countDown.innerHTML = `Você será redirecionado para a página inicial em ${count} segundos`
            if (count === 0) {
                clearInterval(interval)
                window.location.href = "index.html"
            }
        }, 1000)
    }

    makeCountDownError() {
        let count = 5
        const countDown = this.shadow.querySelector("#countDown")
        const interval = setInterval(() => {
            
            count--
            countDown.innerHTML = `Você será redirecionado para tentar novamente em ${count} segundos`
            if (count === 0) {
                clearInterval(interval)
                window.location.href = "index.html"
            }
        }, 1000)
    }

    makeCountmarketClosed() {
        let count = 20
        const countDown = this.shadow.querySelector("#countDown")
        const interval = setInterval(() => {
            
            count--
            countDown.innerHTML = `Só é possível comprar ou vender ações em dias úteis e em horarios fixos. Você será redirecionado para a página inicial em ${count} segundos`
            if (count === 0) {
                clearInterval(interval)
                window.location.href = "index.html"
            }
        }, 1000)
    }

}

customElements.define("buyconfirmation-component", BuyConfirmation);
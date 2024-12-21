class BuyConfirmation extends HTMLElement {

    shadow = this.attachShadow({ mode: "open" });

    constructor() {
        super()

        this.shadow.appendChild(this.createHTML())
        this.createStyles("app/components/buy/buyConfirmation/buyConfirmation-style.css")
        this.createStyles("app/components/buy/buyConfirmation/buyConfirmation-style-responsive.css")

        this.insertValuesAsset()

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
            <button id="backButton" >Voltar</button>
            <button id="advanceButton" >Comprar</button>
</div>
            <div class="containerOtherScreens"></div>
            
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
        const a = JSON.stringify({
            AssetName: String(localStorage.getItem("assetName")),
            AssetCode: String(localStorage.getItem("assetCode"))+"-BRL",
            AssetType: String(localStorage.getItem("assetType")),
            AssetAmount: parseFloat(localStorage.getItem("assetQuantity")),
            OperationType: String(localStorage.getItem("typeOperation")),
            CodeInvestor: "1233"
        })
        const url = `${getUrl()}/buy/`
        fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },

            body: a
        }).then(response => {
            if (!response.ok) {
                console.error("Erro na requisição");
            }
            return response.json();
        }
        ).then(data => {
            console.log(data)
            if (data['code'] != 200) {
                console.log(data['message'])
                this.insertPageError(data['message'])
            } else {
                this.insertPageSuccess()
            }
        }).catch(error => {
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
        this.shadow.querySelector("#assetValue").innerHTML = "R$ " + Number(Number(localStorage.getItem("assetValue")).toFixed(4) * Number(localStorage.getItem("assetQuantity")).toFixed(4)).toFixed(4)
        this.shadow.querySelector("#assetDate").innerHTML = new Date().toLocaleDateString()
    }

}

customElements.define("buyconfirmation-component", BuyConfirmation);
class SellingTemplateProcedure extends HTMLElement {

    shadow = this.attachShadow({ mode: "open" });

    constructor() {
        super()

        this.shadow.appendChild(this.createHTML())
        this.createStyles("app/components/sell/sellingTemplateProcedure/sellingTemplateProcedure-style.css")
        this.createStyles("app/components/sell/sellingTemplateProcedure/sellingTemplateProcedure-style-responsive.css")

        this.insertValuesAsset()
        
        this.shadow.querySelector(".back").addEventListener("click", () => {
            window.location.href = "operation.html"
        })
        this.shadow.querySelector("#sellAsset").addEventListener("click", () => {
            this.makeRequest()
        })
    }

    createHTML() {

        const template =

            `
            <div id="containerAll">
                <div class="principalBlock">
                
                    <h1>Confirme as informações</h1>

<div class="detailsTab">
    <table>
        <tbody>
            <tr>
                <th scope="row">Ativo escolhido</th>
                <td id="assetName" ></td>
                <div class="line"></div>
            </tr>

            

            <tr>
                <th scope="row">Valor da venda</th>
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
            <button id="sellAsset">Vender</button>
        </div>
    </div>
    </div>

    </div>

    <div class="containerOtherScreens"></div>
       

        `

        const componentRoot = document.createElement("div");
        componentRoot.setAttribute("class", "sellingpro-component");
        componentRoot.innerHTML = template;
        return componentRoot

    }

    makeRequest(){

        const datasPost = JSON.stringify({
            AssetName: String(localStorage.getItem("assetName")),
            AssetCode: String(localStorage.getItem("assetCode")),
            AssetType: String(localStorage.getItem("assetType")),
            AssetAmount: parseFloat(localStorage.getItem("assetQuantity")),
            OperationType:String(localStorage.getItem("typeOperation")),
            CodeInvestor : "1233"
        })
        const url = `${getUrl()}/sell/`
        fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
   
            body: datasPost
        }).then(response => {
            if (!response.ok) {
                console.error("Erro na requisição");
            }
            return response.json();
        }
        ).then(data => {
            console.log(data)
            if(data['code'] != 200){
                this.insertPageError(data['message'])
            }else{
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

    insertPageError(messageError){
        this.shadow.querySelector("#containerAll").remove()
        this.shadow.querySelector(".containerOtherScreens").innerHTML = `<sellingerror-component messageError="${messageError}"></sellingerror-component>`

    }

    insertValuesAsset() {
        this.shadow.querySelector("#assetName").innerHTML = localStorage.getItem("assetName")
        this.shadow.querySelector("#assetValue").innerHTML = "R$ " + Number(Number(localStorage.getItem("assetValue")).toFixed(4) * Number(localStorage.getItem("assetQuantity")).toFixed(4)).toFixed(4)
        this.shadow.querySelector("#assetDate").innerHTML = new Date().toLocaleDateString()
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


}

customElements.define("sellingpro-component", SellingTemplateProcedure);
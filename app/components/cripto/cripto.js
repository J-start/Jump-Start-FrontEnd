class Cripto extends HTMLElement {

    shadow = this.attachShadow({ mode: "open" });

    constructor() {
        super()

        this.shadow.appendChild(this.createHTML())
        this.createStyles("app/components/cripto/cripto-style.css")
        this.createStyles("app/components/cripto/cripto-style-responsive.css")

        this.buildComponent()

    }

    createHTML() {

        const template =
            `
    <div class="WrapAllElements">


    </div>

        `

        const componentRoot = document.createElement("div");
        componentRoot.setAttribute("class", "cripto-component");
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

    async makeRequest() {
        return fetch('https://api.mercadobitcoin.net/api/v4/tickers?symbols=BTC-BRL,LTC-BRL,ETH-BRL,XRP-BRL,BCH-BRL,USDT-BRL,LINK-BRL,ADA-BRL,EOS-BRL,XLM-BRL,CHZ-BRL,AXS-BRL')
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

     async buildComponent() {
        const datas = await this.makeRequest();

        const wrapAllElements = this.shadow.querySelector(".WrapAllElements");
    
        this.sortArray(datas)
 
        datas.forEach(element => {
        
            wrapAllElements.appendChild(BuildAsset("CRYPTO", String(element.pair).replace("-BRL", ""), Number(element.last).toFixed(2), Number(element.last).toFixed(2)));
        
        });
    }

    sortArray(array){
        array.sort((a, b) => {
            if (a.pair < b.pair) {
                return -1;
            }
            if (a.pair > b.pair) {
                return 1;
            }
            return 0;
        });
    }
}

customElements.define("cripto-component", Cripto);
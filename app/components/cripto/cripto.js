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

      
        datas.sort((a, b) => {
            if (a.pair < b.pair) {
                return -1;
            }
            if (a.pair > b.pair) {
                return 1;
            }
            return 0;
        });
        
        datas.forEach(element => {
            const wrapElement = document.createElement("div");
            wrapElement.classList.add("wrapElement");

            
            const nameAndPrice = document.createElement("div");
            nameAndPrice.classList.add("NameAndPrice");

            
            const name = document.createElement("h3");
            name.textContent = String(element.pair).replace("-BRL", "");

            
            const price = document.createElement("h4");
            price.textContent = "R$: "+ Number(element.last).toFixed(2);

            
            const maxValue = document.createElement("h4");
            maxValue.textContent ="Máximo: "+ Number(element.high).toFixed(2);

           
            nameAndPrice.appendChild(name);
            nameAndPrice.appendChild(price);
            nameAndPrice.appendChild(maxValue);

            
            const wrapButtonSeeMore = document.createElement("div");
            wrapButtonSeeMore.classList.add("wrapButtonSeeMore");

            
            const buttonSeeMore = document.createElement("button");
            buttonSeeMore.textContent = "Ver mais";

            
            wrapButtonSeeMore.appendChild(buttonSeeMore);

            
            wrapElement.appendChild(nameAndPrice);
            wrapElement.appendChild(wrapButtonSeeMore);

            wrapAllElements.appendChild(wrapElement);
        });
    }
}

customElements.define("cripto-component", Cripto);
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
        //const datas = await this.makeRequest();

        const wrapAllElements = this.shadow.querySelector(".WrapAllElements");
         const datas = [
            {
                "pair": "LINK-BRL",
                "high": "63.50000000",
                "low": "58.96662754",
                "vol": "3948.13569145",
                "last": "62.89038687",
                "buy": "62.79",
                "sell": "63.08597",
                "open": "60.23959997",
                "date": 1730833596
            },
            {
                "pair": "EOS-BRL",
                "high": "2.82999962",
                "low": "2.61000000",
                "vol": "22.10868178",
                "last": "2.82998770",
                "buy": "2.61000002",
                "sell": "2.82998768",
                "open": "2.61000000",
                "date": 1730833564
            },
            {
                "pair": "XLM-BRL",
                "high": "0.54889962",
                "low": "0.52100102",
                "vol": "21016.33826134",
                "last": "0.54109676",
                "buy": "0.54",
                "sell": "0.54144902",
                "open": "0.52919992",
                "date": 1730833595
            },
            {
                "pair": "CHZ-BRL",
                "high": "0.33447990",
                "low": "0.31365000",
                "vol": "496960.93668599",
                "last": "0.33069000",
                "buy": "0.33031823",
                "sell": "0.33069",
                "open": "0.31797799",
                "date": 1730833596
            },
            {
                "pair": "XRP-BRL",
                "high": "3.01978873",
                "low": "2.89077001",
                "vol": "524584.14292651",
                "last": "2.96125003",
                "buy": "2.9617601",
                "sell": "2.96951998",
                "open": "2.95704000",
                "date": 1730833595
            },
            {
                "pair": "LTC-BRL",
                "high": "397.99994999",
                "low": "375.10840014",
                "vol": "450.70265697",
                "last": "382.41025005",
                "buy": "382.41025005",
                "sell": "385.55436998",
                "open": "383.03539999",
                "date": 1730833596
            },
            {
                "pair": "ETH-BRL",
                "high": "14369.36810000",
                "low": "13750.10000000",
                "vol": "1527.81710891",
                "last": "14175.66383357",
                "buy": "14176.66000001",
                "sell": "14186.75415427",
                "open": "14061.14000004",
                "date": 1730833596
            },
            {
                "pair": "BCH-BRL",
                "high": "2019.99999999",
                "low": "1883.17470996",
                "vol": "98.14377229",
                "last": "1973.60597805",
                "buy": "1974.50842233",
                "sell": "1979.671",
                "open": "1932.88948998",
                "date": 1730833596
            },
            {
                "pair": "USDT-BRL",
                "high": "5.87428000",
                "low": "5.75020000",
                "vol": "3517792.31404938",
                "last": "5.77978458",
                "buy": "5.77500467",
                "sell": "5.77948457",
                "open": "5.79266713",
                "date": 1730833595
            },
            {
                "pair": "ADA-BRL",
                "high": "1.96053119",
                "low": "1.86766001",
                "vol": "123266.89338392",
                "last": "1.95230600",
                "buy": "1.94247948",
                "sell": "1.9498977",
                "open": "1.90593399",
                "date": 1730833596
            },
            {
                "pair": "AXS-BRL",
                "high": "28.00000000",
                "low": "25.06660000",
                "vol": "204.30529914",
                "last": "25.50020000",
                "buy": "25.50020001",
                "sell": "26.55291",
                "open": "25.86619000",
                "date": 1730833589
            },
            {
                "pair": "BTC-BRL",
                "high": "409896.66994999",
                "low": "390000.01000000",
                "vol": "89.39332088",
                "last": "406044.48999996",
                "buy": "404990.76005",
                "sell": "406042.98999996",
                "open": "393266.05059299",
                "date": 1730833596
            }
        ]
      
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
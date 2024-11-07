class Coin extends HTMLElement {

    shadow = this.attachShadow({ mode: "open" });
    coinsToFetch = "ARS-BRL,AUD-BRL,BOB-BRL,CAD-BRL,CHF-BRL,CLP-BRL,CNY-BRL,DKK-BRL,EUR-BRL,HKD-BRL,INR-BRL,JPY-BRL,MXN-BRL,NOK-BRL,PYG-BRL,RUB-BRL,SEK-BRL,TWD-BRL,USD-BRL,UYU-BRL"
    constructor() {
        super()

        this.shadow.appendChild(this.createHTML())
        this.createStyles("app/components/coins/coins-style.css")
        this.createStyles("app/components/coins/coins-style-responsive.css")

        // setInterval(async () => {
        //     const divToUpdate = this.shadow.querySelector(".divToUpdateValues");
    
            
        //     divToUpdate.innerHTML = ""; 
    
            
        //    
        // }, 10000);
        const divToUpdate = this.shadow.querySelector(".divToUpdateValues");
        this.buildComponent().then(component => {
            divToUpdate.appendChild(component);
        });
          
        
      
       

    }

    createHTML() {

        const template =
            `
            <div class="divToUpdateValues">
            
            </div>


        `

        const componentRoot = document.createElement("div");
        componentRoot.setAttribute("class", "coin-container-component");
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

        return fetch(`https://economia.awesomeapi.com.br/json/last/${this.coinsToFetch}`)
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
        const datas = await this.makeRequest()

        const positionObjects = this.manipulationStringCoins()

        const wrapAllElements = document.createElement("div");
        wrapAllElements.classList.add("WrapAllElements");

        const objects = this.convertObjectToArray(datas, positionObjects)

        this.sortArray(objects)

        objects.forEach(e => {

            const wrapElement = document.createElement("div");
            wrapElement.classList.add("wrapElement");


            const nameAndPrice = document.createElement("div");
            nameAndPrice.classList.add("NameAndPrice");


            const name = document.createElement("h3");
            name.textContent = String(e.name).replace("/Real Brasileiro", "");


            const price = document.createElement("h4");
            price.textContent = "Compra: " + Number(e.bid).toFixed(3);


            const maxValue = document.createElement("h4");
            maxValue.textContent = "Venda: " + Number(e.ask).toFixed(3)+1;

            const wrapButtonSeeMore = document.createElement("div");
            wrapButtonSeeMore.classList.add("wrapButtonSeeMore");


            const buttonSeeMore = document.createElement("button");
            buttonSeeMore.textContent = "Ver mais";


            nameAndPrice.appendChild(name);
            nameAndPrice.appendChild(price);
            nameAndPrice.appendChild(maxValue);

            wrapButtonSeeMore.appendChild(buttonSeeMore);

            wrapElement.appendChild(nameAndPrice);
            wrapElement.appendChild(wrapButtonSeeMore);

            wrapAllElements.appendChild(wrapElement);
        })
        return wrapAllElements
    }


    convertObjectToArray(datas, positionsObjects) {
        let objects = []
        for (let i = 0; i < Object.keys(datas).length; i++) {
            objects.push(datas[positionsObjects[i]])
        }

        return objects
    }

    sortArray(datas) {
        datas.sort((a, b) => {
            if (a.name < b.name) {
                return -1;
            }
            if (a.name > b.name) {
                return 1;
            }
            return 0;
        });
    }

    manipulationStringCoins(){
        let positionObjects = this.coinsToFetch.split(",")
        positionObjects = positionObjects.map((e, i) => {

            return e.replace("-", "")

        })

        return positionObjects
    }

}




customElements.define("coin-component", Coin);
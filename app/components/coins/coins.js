class Coin extends HTMLElement {

    shadow = this.attachShadow({ mode: "open" });
    coinsToFetch = ""
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

    async fetchListCoins() {
        return fetch(`${getUrl()}/asset/request/?type=COIN`)
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

    async makeRequest() {
        let listCoins = await this.fetchListCoins()
        this.coinsToFetch = listCoins

        const url = `https://economia.awesomeapi.com.br/json/last/${listCoins}`
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

    async buildComponent() {


        const wrapAllElements = document.createElement("div");
        wrapAllElements.classList.add("WrapAllElements");

        let datas = []
        const MILISECONDSUPDATE = 36000000
        if (localStorage.getItem("coins") === null || (new Date() - new Date(localStorage.getItem("coinsDate"))) > MILISECONDSUPDATE) {
            datas = await this.makeRequest()
            localStorage.setItem("coins", JSON.stringify(datas))
            localStorage.setItem("coinsDate", new Date())
        } else {
            datas = JSON.parse(localStorage.getItem("coins"))
        }

        datas = await this.makeRequest()

        const positionObjects = this.manipulationStringCoins()
        const objects = this.convertObjectToArray(datas, positionObjects)
        this.sortArray(objects)


        objects.forEach(e => {

            wrapAllElements.appendChild(BuildAsset("COIN", String(e.name).replace("/Real Brasileiro", ""), Number(e.bid).toFixed(3), Number(e.ask).toFixed(3), `${String(e.code)}` + "-BRL", parseFloat(e.bid).toFixed(3)));

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

    manipulationStringCoins() {

        let positionObjects = this.coinsToFetch.split(",")
        positionObjects = positionObjects.map((e, i) => {

            return e.replace("-", "")

        })

        return positionObjects
    }

}




customElements.define("coin-component", Coin);
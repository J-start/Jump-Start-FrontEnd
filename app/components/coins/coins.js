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
            this.shadow.querySelector(".wait").remove()
            divToUpdate.appendChild(component);

            this.shadow.querySelectorAll(".value1").forEach((element) => {
                element.addEventListener("click", () => {
                    this.managerDisplay(
                        "Valor atual de câmbio para compra da moeda",
                        "Dependendo do tipo de operação o valor pode variar, em algumas moedas essa variação é maior, em outras não"
                    );
                });
            });

            this.shadow.querySelectorAll(".value2").forEach((element) => {
                element.addEventListener("click", () => {
                    this.managerDisplay(
                        "Valor atual de câmbio para venda da moeda",
                        "Dependendo do tipo de operação o valor pode variar, em algumas moedas essa variação é maior, em outras não"
                    );
                });
            });

            this.shadow.querySelectorAll("#close").forEach((element) => {
                element.addEventListener("click", () => {
                    this.managerDisplay("", "");
                });
            });

        });


    }

    createHTML() {

        const template =
            `
            <div class="divToUpdateValues">
            <div class="wait"></div>
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
        return this.makeRequestAPI(`${getUrl()}/asset/request/?type=COIN`)
    }

    async makeRequestAPI(url) {
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

    async makeRequest() {
        let listCoins = await this.fetchListCoins()
        this.coinsToFetch = listCoins


        const url = `https://economia.awesomeapi.com.br/json/last/${listCoins}`

        return this.makeRequestAPI(url)

    }

    async fetchCrypto() {
        return this.makeRequestAPI(`${getUrl()}/details/asset/?type=COIN`)
    }


    async buildComponent() {

        this.shadow.querySelector(".wait").innerHTML = "<spinner-component></spinner-component>"
        const wrapAllElements = document.createElement("div");
        wrapAllElements.classList.add("WrapAllElements");

        let datas = []
        const MILISECONDSUPDATE = 36000000
        if (localStorage.getItem("coins") === null || localStorage.getItem("coins") === undefined ||  (new Date() - new Date(localStorage.getItem("coinsDate"))) > MILISECONDSUPDATE) {
            datas = await this.makeRequest()
            localStorage.setItem("coins", JSON.stringify(datas))
            localStorage.setItem("coinsDate", new Date())
        } else {
            datas = JSON.parse(localStorage.getItem("coins"))
        }

        datas = await this.makeRequest()

        const positionObjects = this.manipulationStringCoins()
        let objects = this.convertObjectToArray(datas, positionObjects)
        let detailsCoin = await this.fetchCrypto()

        this.sortArray(objects, "code")
        this.sortArray(detailsCoin, "acronym")

        objects = this.insertUrlImageIntoCoinObject(objects, detailsCoin)

        this.shadow.querySelector(".divToUpdateValues").style.display = "none"

        for (let i = 0; i < objects.length; i++) {
            wrapAllElements.appendChild(BuildAsset2("COIN", String(objects[i].name).replace("/Real Brasileiro", ""), Number(objects[i].bid).toFixed(3), Number(objects[i].ask).toFixed(3), objects[i].code, objects[i].imageUrl));
        }

        this.shadow.querySelector(".divToUpdateValues").style.display = ""

        return wrapAllElements
    }


    convertObjectToArray(datas, positionsObjects) {
        let objects = []
        for (let i = 0; i < Object.keys(datas).length; i++) {
            objects.push(datas[positionsObjects[i]])
        }


        return objects
    }

    sortArray(datas, comparation) {
        datas.sort((a, b) => {
            if (String(a.name).toLocaleUpperCase() < String(b.name).toLocaleUpperCase()) {
                return -1;
            }
            if (String(a.name).toLocaleUpperCase() > String(b.name).toLocaleUpperCase()) {
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

    managerDisplay(title, message) {
        this.shadow.querySelector('#title').innerHTML = title;
        this.shadow.querySelector('#message').innerHTML = message;
        this.shadow.querySelector('.containerMessageAbout').style.display = this.toggle ? 'none' : 'block';
        this.toggle = !this.toggle;

    }
    insertUrlImageIntoCoinObject(coin, imageObject) {
        coin.forEach((e, i) => {
            if (String(imageObject[i].acronym) == `${e.code}` + "-" + `${e.codein}`) {
                e.imageUrl = imageObject[i].urlImage
            }
        })
        return coin
    }
}




customElements.define("coin-component", Coin);
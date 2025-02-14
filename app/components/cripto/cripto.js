class Cripto extends HTMLElement {

    shadow = this.attachShadow({ mode: "open" });
    toggle = false;
    constructor() {
        super()

        this.shadow.appendChild(this.createHTML())
        this.createStyles("app/components/cripto/cripto-style.css")
        this.createStyles("app/components/cripto/cripto-style-responsive.css")

        this.buildComponent().then(() => {
            this.shadow.querySelector(".wait").remove()
            this.shadow.querySelectorAll(".value1").forEach((element) => {
                element.addEventListener("click", () => {
                    this.managerDisplay(
                        "Valor atual da criptomoeda",
                        "Esse é o último valor que o sistema teve acesso sobre o ativo, ele é atualizado a cada 10 minutos."
                    );
                });
            });

            this.shadow.querySelectorAll(".value2").forEach((element) => {
                element.addEventListener("click", () => {
                    this.managerDisplay(
                        "Valor máximo da criptomoeda",
                        "Valor máximo que a criptomoeda alcançou, considerando a última atualização."
                    );
                });
            });

            this.shadow.querySelectorAll("#close").forEach((element) => {
                element.addEventListener("click", () => {
                    this.managerDisplay("", "");
                });
            });

        })

    }

    createHTML() {

        const template =
            `
    <div class="WrapAllElements">
        <div class="wait"></div>
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

    async makeRequestDatasCrypto() {
        let listCrypto = await this.makeRequestAPI(`${getUrl()}/asset/request/?type=CRYPTO`)
        return this.makeRequestAPI(`https://api.mercadobitcoin.net/api/v4/tickers?symbols=${listCrypto}`)
    }

    async fetchCrypto() {
        return this.makeRequestAPI(`${getUrl()}/details/asset/?type=CRYPTO`)
    }

    async buildComponent() {
        this.shadow.querySelector(".wait").innerHTML = "<spinner-component></spinner-component>"
        let datas = []
        const MILISECONDSUPDATE = 36000000

        if (!localStorage.getItem("cryptos") || localStorage.getItem("cryptos") === "undefined" || (new Date() - new Date(localStorage.getItem("cryptosDate"))) > MILISECONDSUPDATE) {
            datas = await this.makeRequestDatasCrypto()
            localStorage.setItem("cryptos", JSON.stringify(datas))
            localStorage.setItem("cryptosDate", new Date())
        } else {
            datas = JSON.parse(localStorage.getItem("cryptos"))
        }
        let detailsCrypto = await this.fetchCrypto()

        const wrapAllElements = this.shadow.querySelector(".WrapAllElements");

        this.sortArray(datas, "pair")
        this.sortArray(detailsCrypto, "acronym")

        datas = this.insertUrlImageIntoCryptoObject(datas, detailsCrypto)

        this.shadow.querySelector(".WrapAllElements").style.display = "none"

        for (let i = 0; i < datas.length; i++) {
            wrapAllElements.appendChild(BuildAsset2("CRYPTO", datas[i].pair.replace("-BRL", ""), Number(datas[i].last).toFixed(2), Number(datas[i].last).toFixed(2), "", datas[i].imageUrl))
        }

        this.shadow.querySelector(".WrapAllElements").style.display = ""

    }

    sortArray(array, field) {
        array.sort((a, b) => {
            if (a[field] < b[field]) {
                return -1;
            }
            if (a[field] > b[field]) {
                return 1;
            }
            return 0;
        });
    }
    managerDisplay(title, message) {
        this.shadow.querySelector('#title').innerHTML = title;
        this.shadow.querySelector('#message').innerHTML = message;
        this.shadow.querySelector('.containerMessageAbout').style.display = this.toggle ? 'none' : 'block';
        this.toggle = !this.toggle;

    }

    insertUrlImageIntoCryptoObject(crypto, imageObject) {

        const urls = new Map();
        for(let i = 0;i<imageObject.length;i++){
            urls.set(imageObject[i].acronym,imageObject[i].urlImage)
        }
        for(let j =0;j<crypto.length;j++){
            if(urls.get(crypto[j].pair) != undefined){
                crypto[j].imageUrl = urls.get(crypto[j].pair)
            }
        }
        return crypto
    }
}

customElements.define("cripto-component", Cripto);
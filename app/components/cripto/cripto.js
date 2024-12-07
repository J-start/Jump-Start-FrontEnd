class Cripto extends HTMLElement {

    shadow = this.attachShadow({ mode: "open" });
    toggle = false;
    constructor() {
        super()

        this.shadow.appendChild(this.createHTML())
        this.createStyles("app/components/cripto/cripto-style.css")
        this.createStyles("app/components/cripto/cripto-style-responsive.css")

        this.buildComponent()

        this.shadow.querySelector("#value1").addEventListener("click", () => {
            this.managerDisplay("Valor atual da criptomoeda", "Esse é o último valor que o sistema teve acesso sobre o ativo, ele é atualizado a cada 10 minutos.")
        })
        this.shadow.querySelector("#value2").addEventListener("click", () => {
            this.managerDisplay("Valor máximo da criptmoeda", "Valor máximo que a criptomoeda alcançou, considerando a última atualização.")
        })
        this.shadow.querySelector("#close").addEventListener("click", () => {
            this.managerDisplay("", "")
        })

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
     async fetchListCrypto() {
         return fetch(`${getUrl()}/asset/request/?type=CRYPTO`)
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
        let listCrypto = await this.fetchListCrypto()
        console.log(listCrypto)
        return fetch(`https://api.mercadobitcoin.net/api/v4/tickers?symbols=${listCrypto}`)
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

        let datas = []
        const MILISECONDSUPDATE = 36000000
        
        if(localStorage.getItem("cryptos") === null || (new Date() - new Date(localStorage.getItem("cryptosDate"))) > MILISECONDSUPDATE ){
            datas = await this.makeRequest()
            localStorage.setItem("cryptos", JSON.stringify(datas))
            localStorage.setItem("cryptosDate", new Date())
        }else{
            datas = JSON.parse(localStorage.getItem("cryptos"))
        }
        const wrapAllElements = this.shadow.querySelector(".WrapAllElements");
    
        this.sortArray(datas)
        console.log(datas)
        datas.forEach(element => {
        
            wrapAllElements.appendChild(BuildAsset2("CRYPTO", String(element.pair).replace("-BRL", ""), Number(element.last).toFixed(2), Number(element.last).toFixed(2)));
        
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
    managerDisplay(title, message) {
        this.shadow.querySelector('#title').innerHTML = title;
        this.shadow.querySelector('#message').innerHTML = message;
        this.shadow.querySelector('.containerMessageAbout').style.display = this.toggle ? 'none' : 'block';
        this.toggle = !this.toggle;

    }
}

customElements.define("cripto-component", Cripto);

class Share extends HTMLElement {

    shadow = this.attachShadow({ mode: "open" });

    constructor() {
        super()

        this.shadow.appendChild(this.createHTML())
        this.createStyles("app/components/share/share-style.css")
        this.createStyles("app/components/share/share-style-responsive.css")
       

        this.buildComponent().then(() => {
            
        this.shadow.querySelectorAll(".value1").forEach((element) => {
            element.addEventListener("click", () => {
                this.managerDisplay(
                    "Valor da ação na aberura do mercado",
                    "Valor da ação no momento da abertura do mercado, considerando a última atualização."
                );
            });
        });

        this.shadow.querySelectorAll(".value2").forEach((element) => {
            element.addEventListener("click", () => {
                this.managerDisplay(
                    "Valor da ação no último fechamento do mercado",
                    "Valor da ação considerando o último fechamento do mercado, considerando a última atualização."
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

        </div>

        `

        const componentRoot = document.createElement("div");
        componentRoot.setAttribute("class", "share-component");
        componentRoot.innerHTML = template;
        return componentRoot

    }

    async makeRequestAPI(url){
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
        const url = `${getUrl()}/datas/shares`
        return this.makeRequestAPI(url)
     }

     async fetchCrypto() {
        return this.makeRequestAPI(`${getUrl()}/details/asset/?type=SHARE`)
    }

    async buildComponent() {

        const wrapAllElements = this.shadow.querySelector(".WrapAllElements");
        let datas = []
        const MILISECONDSUPDATE = 108000000
        if(localStorage.getItem("shares") === null || (new Date() - new Date(localStorage.getItem("sharesDate"))) > MILISECONDSUPDATE){
            datas = await this.makeRequest()
            localStorage.setItem("shares", JSON.stringify(datas))
            localStorage.setItem("sharesDate", new Date())
        }else{
            datas = JSON.parse(localStorage.getItem("shares"))
        }
        let detailsCrypto = await this.fetchCrypto()
        this.sortArray(datas,"NameShare")
        this.sortArray(detailsCrypto,"acronym")

        for(let i = 0; i < datas.length; i++){
            wrapAllElements.appendChild(BuildAsset2("SHARE", datas[i].NameShare, datas[i].OpenShare, datas[i].CloseShare,datas[i].CloseShare,detailsCrypto[i].urlImage));

        }
   
    }


    createStyles(...linksUser) {

        linksUser.forEach(e => {
            const link = this.createLink(e)
            this.shadow.appendChild(link)
        })

    }

    sortArray(array,comparation){
        array.sort((a, b) => {
            if (a[comparation] < b[comparation]) {
                return -1;
            }
            if (a[comparation] > b[comparation]) {
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
    createLink(linkStyle) {
        const link = document.createElement("link");
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("href", linkStyle);
        return link
    }
}

customElements.define("share-component", Share);
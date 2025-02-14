
class Share extends HTMLElement {

    shadow = this.attachShadow({ mode: "open" });

    constructor() {
        super()

        this.shadow.appendChild(this.createHTML())
        this.createStyles("app/components/share/share-style.css")
        this.createStyles("app/components/share/share-style-responsive.css")


        this.buildComponent().then(() => {
            this.shadow.querySelector(".wait").remove()
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
            <div class="wait"></div>
        </div>

        `

        const componentRoot = document.createElement("div");
        componentRoot.setAttribute("class", "share-component");
        componentRoot.innerHTML = template;
        return componentRoot

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
        const url = `${getUrl()}/datas/shares`
        return this.makeRequestAPI(url)
    }

    async fetchCrypto() {
        return this.makeRequestAPI(`${getUrl()}/details/asset/?type=SHARE`)
    }

    async buildComponent() {
        this.shadow.querySelector(".wait").innerHTML = "<spinner-component></spinner-component>"
        let datas = []
         const MILISECONDSUPDATE = 36000000
          if (!localStorage.getItem("share") || localStorage.getItem("share") === "undefined" || (new Date() - new Date(localStorage.getItem("shareDate"))) > MILISECONDSUPDATE) {
             datas = await this.makeRequest()
             localStorage.setItem("share", JSON.stringify(datas))
             localStorage.setItem("shareDate", new Date())
             console.log("enntrou")
         } else {
            console.log("saiu")
             datas = JSON.parse(localStorage.getItem("share"))
          }
        const wrapAllElements = this.shadow.querySelector(".WrapAllElements");

        let detailsShare = await this.fetchCrypto()

        this.sortArray(datas, "NameShare")
        this.sortArray(detailsShare, "acronym")

        datas = this.insertUrlImageIntoCoinObject(datas, detailsShare)
        this.shadow.querySelector(".WrapAllElements").style.display = "none"

        for (let i = 0; i < datas.length; i++) {
            wrapAllElements.appendChild(BuildAsset2("SHARE", datas[i].NameShare, datas[i].OpenShare, datas[i].CloseShare, datas[i].CloseShare, datas[i].imageUrl));

        }

        this.shadow.querySelector(".WrapAllElements").style.display = ""


    }


    createStyles(...linksUser) {

        linksUser.forEach(e => {
            const link = this.createLink(e)
            this.shadow.appendChild(link)
        })

    }

    sortArray(array, comparation) {
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
    insertUrlImageIntoCoinObject(share, imageObject) {

        const urls = new Map();
        for(let i = 0;i<imageObject.length;i++){
            urls.set(imageObject[i].acronym,imageObject[i].urlImage)
        }
        for(let j =0;j<share.length;j++){
            if(urls.get(share[j].NameShare) != undefined){
                share[j].imageUrl = urls.get(share[j].NameShare)
            }
        }
        return share
    }
}

customElements.define("share-component", Share);
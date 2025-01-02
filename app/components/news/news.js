class News extends HTMLElement {

    shadow = this.attachShadow({ mode: "open" });
    offset = 0
    constructor() {
        super()

        this.shadow.appendChild(this.createHTML())
        this.createStyles("app/components/news/news-style.css")
        this.createStyles("app/components/news/news-style-responsive.css")
        this.makeRequest()
    }

    createHTML() {

        const template =
            `
   <div class="containerAllNews">
   </div>

        `

        const componentRoot = document.createElement("div");
        componentRoot.setAttribute("class", "news-component");
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

    makeRequest() {

        const url = `${getUrl()}/news/?offset=${this.offset}`;
        fetch(url, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(response => {
            if (!response.ok) {
                console.error("Erro na requisição");
            }
            return response.json();
        }).then(data => {
            this.convertObject(data)

        }).catch(error => {
            console.error('Erro na requisição:', error);
        });
    }

    convertObject(data){
        data.forEach(e => {
            let news = JSON.parse(e['News']);
            let typeAsset = Object.keys(news)[0];
            let description = news[typeAsset]['description'];
            let url = news[typeAsset]['url'];
            e['DateNews'] = e['DateNews'].replaceAll("-","/")
            let dateNews = e['DateNews'];
            
            this.createNews(description,dateNews,url)
        })
    }

    createNews(description,dateNews,url) {
        const newsDiv = document.createElement("div");
        newsDiv.classList.add("news");

        const h2 = document.createElement("h2");
        const link = document.createElement("a");
        link.href = url
        link.textContent = description;
        link.target = "_blank";
        h2.appendChild(link);

        const h3 = document.createElement("h3");
        h3.textContent = `Data de publicação: ${dateNews}`;

        newsDiv.appendChild(h2);
        newsDiv.appendChild(h3);

        this.shadow.querySelector(".containerAllNews").appendChild(newsDiv);
    }

}



customElements.define("news-component", News);
class AssetGraphic extends HTMLElement {
    shadow = this.attachShadow({ mode: "open" });

    constructor() {
        super();

        this.shadow.appendChild(this.createHTML());
        this.createStyles("app/components/assetGraphic/assetGraphic-style.css");
        //this.createStyles("app/components/header/headerHome-style-responsive.css");

        this.makeTest()
    }

    createHTML() {
        const template = `
        <div class="containerGraphic">
            <canvas id="bidChart" width="400" height="200"></canvas> 
            </div>
        `;

        const componentRoot = document.createElement("div");
        componentRoot.setAttribute("class", "graphic-component");
        componentRoot.innerHTML = template;
        return componentRoot;
    }

    createStyles(...linksUser) {
        linksUser.forEach(e => {
            const link = this.createLink(e);
            this.shadow.appendChild(link);
        });
    }

    createLink(linkStyle) {
        const link = document.createElement("link");
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("href", linkStyle);
        return link;
    }

    async makeRequest(urlparam){
        return fetch(urlparam)
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

    filterDatas(data){
        let datas = []
        let assetType = localStorage.getItem("assetType")
        if(assetType === "SHARE"){
            datas = data.map(item => {
                return { "date": item.DateShare, "value": parseFloat(item.CloseShare).toFixed(3) }
            })
        }else if(assetType === "COIN"){
            datas = data.map(item => {
                return { "date": this.fomatDataTimestamp(item.timestamp), "value": parseFloat(item.bid).toFixed(3) }
            })
        }

        return datas.reverse()
    }

    async makeTest(){
        const response = await this.makeRequest(this.buildUrl())
        const data = this.filterDatas(response)
        console.log(data)
    }
    connectedCallback() {
        this.initChart(); 
    }

    initChart() {
        const data = [
            { "timestamp": "1731704380", "bid": "5.7947" },
            { "timestamp": "1731619797", "bid": "5.789" },
            { "timestamp": "1731533401", "bid": "5.8061" },
            { "timestamp": "1731447000", "bid": "5.749" },
            { "timestamp": "1731358780", "bid": "5.7559" },
            { "timestamp": "1731110398", "bid": "5.7376" },
        ];

        const formatTimestamp = (timestamp) => {
            const date = new Date(timestamp * 1000);
            return date.toLocaleDateString("pt-BR");
        };

        const labels = data.map(item => formatTimestamp(item.timestamp));
        const bids = data.map(item => parseFloat(item.bid));

        const canvas = this.shadow.getElementById('bidChart'); 
        const ctx = canvas.getContext('2d');

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: '', 
                    data: bids,
                    borderColor: '#1465FF',
                    backgroundColor: '#C6FE1F',
                    borderWidth: 2,
                    pointBackgroundColor: '#C6FE1F',
                    pointBorderColor: '#C6FE1F',
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false 
                    }
                },
                scales: {
                    x: {
                        ticks: {
                            color: 'white' 
                        }
                    },
                    y: {
                        ticks: {
                            color: 'white' 
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        }
                    }
                }
            }
        });
    }


    fomatDataTimestamp(timestamp){
        const date = new Date(timestamp * 1000);
        return date.toLocaleDateString("pt-BR");
    }

    buildUrl(){
        let url = ""
        let asset = localStorage.getItem("assetCode")
    
        if(localStorage.getItem("assetType") === "SHARE"){
            url = `http://localhost:8080/datas/share/?shareName=${asset}`
        }else if(localStorage.getItem("assetType") === "COIN"){
             url = `https://economia.awesomeapi.com.br/json/daily/${asset}/30`
        }else{
            url = `https://api.mercadobitcoin.net/api/v4/BTC-BRL/trades?limit=1000&from=1729032425&to=1731710825000`
        }

        return url
    }

}

customElements.define("graphic-component", AssetGraphic);

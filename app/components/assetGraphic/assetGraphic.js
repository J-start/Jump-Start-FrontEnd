class AssetGraphic extends HTMLElement {
    shadow = this.attachShadow({ mode: "open" });

    constructor() {
        super();

        this.shadow.appendChild(this.createHTML());
        this.createStyles("app/components/assetGraphic/assetGraphic-style.css");
        this.createStyles("app/components/assetGraphic/assetGraphic-style-responsive.css");


    }

    createHTML() {
        const template = `
        <div class="containerGraphic">
            <canvas id="bidChart" width="400" height="200"></canvas> 
            </div>

            <div id="variationFirst"></div>
            <div id="variationSecond"></div>
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

    async makeRequest(urlparam) {
        try {
            const response = await fetch(urlparam);

            return await response.json();
        } catch (error) {
            console.error("Erro na requisição:", error);
           
            return [];
        }
    }

    connectedCallback() {
        this.makeGraphic();
    }

    filterDatas(data) {
        if (!Array.isArray(data) || data.length === 0) {
            console.error("Os dados fornecidos são inválidos ou vazios.");
            return [];
        }

        let datas = [];
        const assetType = localStorage.getItem("assetType");

        if (assetType === "SHARE") {
            datas = data.map(item => {
                return { "date": item.DateShare, "value": parseFloat(item.CloseShare).toFixed(3) };
            });
            if (data.length > 2) {

                let dateShare = String(data[0].DateShare).replaceAll("-", "/")
                let days1 = this.calcDelta(dateShare)
                this.valueVariation(days1, data[0].CloseShare, "variationSecond")

                let dateShare2 = String(data[data.length - 2].DateShare).replaceAll("-", "/")
                let days2 = this.calcDelta(dateShare2)
                this.valueVariation(days2, data[data.length - 2].CloseShare, "variationFirst")

            } else {
                let dateShare = String(data[0].DateShare).replaceAll("-", "/")
                let days = this.calcDelta(dateShare)
                this.valueVariation(days, data[0].CloseShare, "variationSecond")
            }

        } else if (assetType === "COIN") {
            datas = data.map(item => {
                return { "date": this.fomatDataTimestamp(item.timestamp), "value": parseFloat(item.bid).toFixed(3) };

            });
            
            let days = this.calcDelta(this.fomatDataTimestamp(data[1].timestamp))
            if(days > 0){
                this.valueVariation(days, data[0].bid, "variationFirst")
            }

            days = this.calcDelta(this.fomatDataTimestamp(data[data.length - 1].timestamp))
            if(days > 0){
                this.valueVariation(days, data[data.length - 1].bid, "variationSecond")
            }

            datas = datas.reverse();
        } else {

            datas = data.map(item => {
                return { "date": String(item.date).replaceAll("-", "/"), "value": parseFloat(item.value).toFixed(3) };
            });

            let days = this.calcDelta(data[0].date.replaceAll("-", "/"))
            if(days > 0){
                this.valueVariation(days, data[0].value, "variationFirst")
            }
            
            let daysSecond = this.calcDelta(data[data.length - 2].date.replaceAll("-", "/"))
            if(days > 0 && daysSecond != days){
                this.valueVariation(daysSecond, data[data.length - 2].value, "variationSecond")
            }
        
        }

        return datas
    }

    async makeGraphic() {
        const response = await this.makeRequest(this.buildUrl());
        console.log(response)
        if (!response || response.length === 0) {
            console.error("Nenhum dado retornado ou falha na requisição.");
            return;
        }
        if(response.code){
            alert(response.message)
            return
        }

        const data = this.filterDatas(response);

        if (data.length === 0) {
            console.error("Nenhum dado válido para exibir no gráfico.");
            return;
        }

        this.initChart(data);
    }

    initChart(data) {

        const labels = data.map(item => item.date);
        const bids = data.map(item => item.value);

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
                maintainAspectRatio: false,
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

    fomatDataTimestamp(timestamp) {
        const date = new Date(timestamp * 1000);
        return date.toLocaleDateString("pt-BR");
    }

    buildUrl() {
        let url = ""
        let asset = localStorage.getItem("assetCode")

        if (localStorage.getItem("assetType") === "SHARE") {
            url = `${getUrl()}/datas/share/?shareName=${asset}`
        } else if (localStorage.getItem("assetType") === "COIN") {
            url = `https://economia.awesomeapi.com.br/json/daily/${asset}/30`
        } else {
            asset = asset + "-BRL"
            url = `${getUrl()}/history/crypto/?crypto=${asset}`
        }

        return url
    }

    valueVariation(days, value, div) {

        let variation = 100 - (100 * value / Number(localStorage.getItem("assetValue")).toFixed(3)).toFixed(3)
        variation = variation.toFixed(1)

        if (days === 1) {
            this.shadow.querySelector(`#${div}`).innerHTML = `Variação de ${days} dia : ${variation}%`
        } else {
            this.shadow.querySelector(`#${div}`).innerHTML = `Variação de ${days} dias : ${variation}%`
        }

        if (variation > 0) {
            this.shadow.querySelector(`#${div}`).style.color = "#1465FF"
        } else if (variation < 0) {
            this.shadow.querySelector(`#${div}`).style.color = "#FF4848"
        } else {
            this.shadow.querySelector(`#${div}`).style.display = "none"
        }
    }

    calcDelta(date1) {
        const [dia1, mes1, ano1] = date1.split("/").map(Number);
        console.log(date1)
        const dateObj1 = new Date(ano1, mes1 - 1, dia1);
        const date2 = new Date();
        date2.setHours(0, 0, 0, 0);
        const differenceMiliseconds = Math.abs(date2 - dateObj1);

        const differenceDays = Math.ceil(differenceMiliseconds / (1000 * 60 * 60 * 24));


        return differenceDays;
    }

}

customElements.define("graphic-component", AssetGraphic);
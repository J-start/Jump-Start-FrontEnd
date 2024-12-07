
function BuildAsset(typeAsset, nameAsset, valueField1, valueField2, codeCoin, value) {
    const wrapElement = document.createElement("div");
    wrapElement.classList.add("wrapElement");


    const nameAndPrice = document.createElement("div");
    nameAndPrice.classList.add("NameAndPrice");


    const name = document.createElement("h3");
    const names = this.buildMapShareNames()
    if (typeAsset === "SHARE")
        name.textContent = names.get(nameAsset)
    else {
        name.textContent = nameAsset
    }


    const price = document.createElement("h4");
    price.textContent = defineFiledValueOne(typeAsset) + valueField1
    price.setAttribute("title", messageFieldOne(typeAsset, nameAsset));


    const maxValue = document.createElement("h4");
    maxValue.textContent = defineFiledValuTwo(typeAsset) + valueField2
    maxValue.setAttribute("title", messageFieldTwo(typeAsset, nameAsset));


    nameAndPrice.appendChild(name);
    nameAndPrice.appendChild(price);
    nameAndPrice.appendChild(maxValue);


    const wrapButtonSeeMore = document.createElement("div");
    wrapButtonSeeMore.classList.add("wrapButtonSeeMore");


    const buttonSeeMore = document.createElement("button");
    buttonSeeMore.textContent = "Ver mais";
    buttonSeeMore.addEventListener("click", () => {
        localStorage.setItem("assetType", `${typeAsset}`)

        if (typeAsset === "COIN") {
            localStorage.setItem("assetCode", `${codeCoin}`)
        } else if (typeAsset === "SHARE") {
            localStorage.setItem("assetCode", `${nameAsset}`)
        } else {
            localStorage.setItem("assetCode", `${nameAsset}-BRL`)
        }

        if (typeAsset === "SHARE") {
            localStorage.setItem("assetName", `${names.get(nameAsset)}`)
        } else {
            localStorage.setItem("assetName", `${nameAsset}`)
        }

        localStorage.setItem("dateOperation", `${new Date().toLocaleString()}`)
        localStorage.setItem("assetValue", valueField2)
        window.location.href = "details.html"
    })

    wrapButtonSeeMore.appendChild(buttonSeeMore);


    wrapElement.appendChild(nameAndPrice);
    wrapElement.appendChild(wrapButtonSeeMore);

    return wrapElement

}

function BuildAsset2(typeAsset, nameAsset, valueField1, valueField2, codeCoin, value) {
    const wrapElement = document.createElement("div");
    wrapElement.classList.add("wrapElement");

    const nameAndPrice = document.createElement("div");
    nameAndPrice.classList.add("NameAndPrice");

    const wrapImageAndTitle = document.createElement("div");
    wrapImageAndTitle.classList.add("wrapImageAndTitle");

    const image = document.createElement("img");
    image.src = 'https://cdn.investing.com/crypto-logos/20x20/v2/bitcoin.png'; 
    image.alt = nameAsset;

    const name = document.createElement("h3");
    const names = this.buildMapShareNames();
    if (typeAsset === "SHARE") {
        name.textContent = names.get(nameAsset);
    } else {
        name.textContent = nameAsset;
    }

    wrapImageAndTitle.appendChild(image);
    wrapImageAndTitle.appendChild(name);

    const value1 = document.createElement("h4");
    value1.textContent = defineFiledValueOne(typeAsset) + valueField1;
    value1.innerHTML += `<span class="info-icon">?</span>`;
    value1.setAttribute("id", "value1");

    const value2 = document.createElement("h4");
    value2.textContent = defineFiledValuTwo(typeAsset) + valueField2;
    value2.innerHTML += `<span class="info-icon">?</span>`;
    value2.setAttribute("id", "value2");

    nameAndPrice.appendChild(wrapImageAndTitle);
    nameAndPrice.appendChild(value1);
    nameAndPrice.appendChild(value2);

    const wrapButtonSeeMore = document.createElement("div");
    wrapButtonSeeMore.classList.add("wrapButtonSeeMore");

    const buttonSeeMore = document.createElement("button");
    buttonSeeMore.textContent = "Ver mais";
    buttonSeeMore.addEventListener("click", () => {
        localStorage.setItem("assetType", `${typeAsset}`);
        localStorage.setItem("assetCode", typeAsset === "COIN" ? `${codeCoin}` : `${nameAsset}`);
        localStorage.setItem("assetName", typeAsset === "SHARE" ? `${names.get(nameAsset)}` : `${nameAsset}`);
        localStorage.setItem("dateOperation", `${new Date().toLocaleString()}`);
        localStorage.setItem("assetValue", valueField2);
        //window.location.href = "details.html";
    });

    const container = document.createElement('div');
    container.classList.add('containerMessageAbout');
    container.id = 'messageBox';  

    const closeButton = document.createElement('h4');
    closeButton.id = 'close';
    closeButton.textContent = ' X ';

    const title = document.createElement('h3');
    title.id = 'title';  
   
    const message = document.createElement('h4');
    message.id = 'message';  
    

    container.appendChild(closeButton);
    container.appendChild(title);
    container.appendChild(message);

    wrapButtonSeeMore.appendChild(buttonSeeMore);

    wrapElement.appendChild(nameAndPrice);
    wrapElement.appendChild(wrapButtonSeeMore);
    wrapElement.appendChild(container);

    return wrapElement;
}




function messageFieldOne(typeAsset, nameAsset) {
    switch (typeAsset) {
        case "SHARE":
            return "Valor da ação no momento da abertura do mercado"
        case "COIN":
            return `Valor ${nameAsset} para compra`
        case "CRYPTO":
            return `Valor atual ${nameAsset}`
    }
}

function messageFieldTwo(typeAsset, nameAsset) {
    switch (typeAsset) {
        case "SHARE":
            return "Maior Valor que a ação alcançou no dia"
        case "COIN":
            return `Valor ${nameAsset} para venda`
        case "CRYPTO":
            return `Valor máximo que ${nameAsset} alcançou `
    }
}

function defineFiledValueOne(typeAsset) {
    switch (typeAsset) {
        case "SHARE":
            return "Abertura. R$: "
        case "COIN":
            return "Compra. R$ "
        case "CRYPTO":
            return "R$: "
    }
}

function defineFiledValuTwo(typeAsset) {
    switch (typeAsset) {
        case "SHARE":
            return "Fechamento. R$: "
        case "COIN":
            return "Venda. R$ "
        case "CRYPTO":
            return "Máximo. R$: "
    }
}

function buildMapShareNames() {
    const shareNames = new Map();

    shareNames.set('PETR4.SA', 'PETROBRAS PN (PETR4.SA)')
    shareNames.set('BBAS3.SA', 'Banco do Brasil (BBAS3.SA)')
    shareNames.set('ITSA4.SA', 'Itaúsa PN (ITSA4.SA)')
    shareNames.set('TRPL4.SA', 'CTEEP (TRPL4.SA)')
    shareNames.set('VALE3.SA', 'Vale S.A (VALE3.SA)')
    shareNames.set('CMIG4.SA', 'Cemig (CMIG4.SA)')
    shareNames.set('SANB11.SA', 'Banco Santander (SANB11.SA)')
    shareNames.set('USIM5.SA', 'USIMINAS PNA (USIM5.SA)')
    shareNames.set('ABEV3.SA', 'AMBEV S/A ON (ABEV3.SA)')
    shareNames.set('MGLU3.SA', 'Magazine Luiza S.A. (MGLU3.SA)')

    return shareNames
}


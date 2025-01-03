
function BuildAsset2(typeAsset, nameAsset, valueField1, valueField2, codeCoin,url_image) {
    const wrapElement = document.createElement("div");
    wrapElement.classList.add("wrapElement");

    const nameAndPrice = document.createElement("div");
    nameAndPrice.classList.add("NameAndPrice");

    const wrapImageAndTitle = document.createElement("div");
    wrapImageAndTitle.classList.add("wrapImageAndTitle");

    const image = document.createElement("img");
    image.src = url_image; 
    image.alt = nameAsset;

    const name = document.createElement("h3");
    const names = this.buildMapShareNames();
    if (typeAsset === "SHARE") {
        name.textContent = nameAsset
    } else {
        name.textContent = nameAsset;
    }

    wrapImageAndTitle.appendChild(image);
    wrapImageAndTitle.appendChild(name);

    const value1 = document.createElement("h4");
    const formattedvalueField1 = Number(valueField1).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 3,
        maximumFractionDigits: 4  
      });
    value1.textContent = defineFiledValueOne(typeAsset) + formattedvalueField1;
    value1.innerHTML += `<span class="info-icon">?</span>`;
    value1.setAttribute("class", "value1");

    const value2 = document.createElement("h4");
    const formattedvalueField2 = Number(valueField2).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 3,
        maximumFractionDigits: 4  
      });
    value2.textContent = defineFiledValuTwo(typeAsset) + formattedvalueField2;
    value2.innerHTML += `<span class="info-icon">?</span>`;
    value2.setAttribute("class", "value2");
    

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
        window.location.href = "details.html";
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
            return "Abertura. "
        case "COIN":
            return "Compra. "
        case "CRYPTO":
            return ""
    }
}

function defineFiledValuTwo(typeAsset) {
    switch (typeAsset) {
        case "SHARE":
            return "Fechamento. "
        case "COIN":
            return "Venda. "
        case "CRYPTO":
            return "Máximo. "
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


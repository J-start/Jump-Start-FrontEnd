document.getElementById("new-asset-form").addEventListener("submit", async (e) => {
    e.preventDefault()
    const name = document.getElementById("name").value
    const acronym = document.getElementById("acronym").value
    const urlImage = document.getElementById("urlImage").value
    const typeAsset = document.getElementById("typeAsset").value
    console.log(name, acronym, urlImage, typeAsset)
    
    if(isAssetAlreadyExists(acronym,typeAsset)){
        alert("Esse ativo já existe no sistema")
        return
    }
    if (!await validateFields(name,acronym, typeAsset)) {
        alert("Ativo inválido, tente novamente");
        return
    }
    const imageExists = await new Promise((resolve) => {
        checkIfImageExists(urlImage, (exists) => {
            resolve(exists);
        });
    });

    if (!imageExists) {
        alert("Url inválida");
        return;
    }

    let newAsset = {
        "name":name,
        "acronym":acronym,
        "urlImage":urlImage,
        "typeAsset":typeAsset
      }
    makeRequestWithBody(`${getUrl()}/add/asset/`,JSON.stringify(newAsset)).then(e =>{
        console.log(e)
        window.location.reload();
    }).catch(er =>{
        console.log(er)
    })
})
function addNewAsset() {

    document.getElementById("popup-overlay-new").style.display = "flex"
}

function closePopUpAddAsset() {
    document.getElementById("popup-overlay-new").style.display = "none"
}

async function validateFields(name, acronym, typeAsset) {
    if (String(name).length == 0 || String(name).trim() == 0) {
        alert("Nome vazio");
        return false;
    }

    if (typeAsset != 'COIN' && typeAsset != 'SHARE' && typeAsset != 'CRYPTO') {
        console.log(typeAsset)
        alert("Tipo de ativo inválido");
        return false;
    }
    if(typeAsset == 'COIN'){
    try {
        const isAcronymValid = await validateAcronym(acronym, typeAsset);
        if (!isAcronymValid) {
            alert("Ativo inválido, tente novamente");
            return false;
        }else{
            return true;
        }
    } catch (error) {
        alert("Aconteceu um erro, tente novamente");
        return false;
    }
    }else if(typeAsset == 'CRYPTO'){
        try {
            const isAcronymValid = await validateAcronym(acronym, typeAsset);
            if (isAcronymValid == null || isAcronymValid == false) {
                alert("Ativo inválido, tente novamente");
                return
            }
            if (Array.isArray(isAcronymValid) && isAcronymValid.length === 0) {
                alert("Ativo inválido, tente novamente");
                return false;
            }else{
                return true
            }


        } catch (error) {
            alert("Aconteceu um erro, tente novamente");
            return false;
        }
    }else if(typeAsset == 'SHARE'){
        const isAcronymValid = await validateAcronym(acronym, typeAsset);
        if (!isAcronymValid) {
            alert("Ativo inválido, tente novamente");
            return false;
        }else{
            return true;
        }
    }

    
}

async function makeRequestAsset(url) {
    return fetch(url, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => {
        if (!response.ok) {
            throw new Error("Erro na requisição")
        }
        return response.json();
    })
}

async function validateAcronym(acronym, typeAsset) {
    if (typeAsset == 'SHARE') {
        console.log("typeAsset ",typeAsset)
        return isShareValid(acronym); 
    } else if(typeAsset == 'COIN') {
        const url = generateUrlBasedOnType(acronym, typeAsset);
        try {
            const data = await makeRequestAsset(url);
            return true; 
        } catch (e) {
            return false; 
        }
    }else if(typeAsset == 'CRYPTO'){
        const url = generateUrlBasedOnType(acronym, typeAsset);
        try {
            const data = await makeRequestAsset(url);
            return data; 
        } catch (e) {
            return null; 
        }
    }
}

function generateUrlBasedOnType(acronym, typeAsset) {
    switch (typeAsset) {
        case 'COIN':
            return `https://economia.awesomeapi.com.br/json/last/${acronym}`
        case 'CRYPTO':
            return `https://api.mercadobitcoin.net/api/v4/tickers?symbols=${acronym}`
    }
}
function isShareValid(acronym) {
    const map1 = new Map();
    map1.set("ITUB4.SA", true);
    map1.set("RENT3.SA", true);
    map1.set("EQTL3.SA", true);
    map1.set("GGBR4.SA", true);
    map1.set("HAPV3.SA", true);
    console.log("map1.get(acronym)",map1.get(acronym))
    if (map1.get(acronym) == undefined) {
        return false
    }
    return true
}
function isAssetAlreadyExists(acronym,typeAsset){
    let isAssetExists = false
    let newList = listAssets.filter(e => e.typeAsset == typeAsset)
    newList.forEach(element => {
        if(element.acronym == acronym){
            isAssetExists = true
        }
   });
    return isAssetExists
}

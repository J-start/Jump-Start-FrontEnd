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
    map1.set("ITUB4.SA", true);//https://content.btgpactual.com/research/files/media/ativos/ITUB.svg
    map1.set("RENT3.SA", true); 
    map1.set("EQTL3.SA", true);//https://content.btgpactual.com/research/files/media/ativos/EQTL.svg
    map1.set("GGBR4.SA", true);//https://conteudos.xpi.com.br/wp-content/uploads/2019/06/Gerdau.png?w=210
    map1.set("HAPV3.SA", true);
    map1.set("BBDC3.SA", true);//https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRReSLpr6ySYYL-4Mp9a_nS9_AMoiCs0RXuyA&s
    map1.set("AMER3.SA", true);
    map1.set("TAEE11.SA", true);
    map1.set("TOTS3.SA", true);
    map1.set("VIVT3.SA", true);
    map1.set("EMBR3.SA", true);

    //TAEE11.SA -> data:image/png;base64,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
    //TOTS3.SA -> data:image/png;base64,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
    //VIVT3.SA -> data:image/png;base64,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
    //EMBR3.SA->  data:image/png;base64,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
    
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

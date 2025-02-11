let idGlobal = 0
document.addEventListener('DOMContentLoaded', async function () {
    const assetData = await getListAssets()
    const assetContainer = document.getElementById('asset-container');

    function renderAssets(assets) {

        assetContainer.innerHTML = '';
        assets.forEach(asset => {
            const assetCard = document.createElement('div');
            assetCard.classList.add(`${asset.typeAsset}`);
            assetCard.innerHTML = `
                <img src="${asset.urlImage}" alt="${asset.name}">
                <h2>${asset.name} (${asset.acronym})</h2>
                <p>Tipo: ${asset.typeAsset}</p>
                <button onclick="changeImageById(${asset.id},'${asset.name}')">Alterar Imagem ${asset.name}</button>
            `;
            assetContainer.appendChild(assetCard);
        });
    }

    renderAssets(assetData);

});
async function makeRequest(url) {
    if (localStorage.getItem("token") === null) {
        window.location.href = "signIn.html"
    }
    const TOKEN = localStorage.getItem("token")
    return fetch(url, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${TOKEN}`
        }
    }).then(response => {
        if (!response.ok) {
            throw new Error("Erro na requisição")
        }
        return response.json();
    })
}
async function makeRequestWithBody(url, bodyRequest) {

    console.log("bodyRequest", bodyRequest)
    if (localStorage.getItem("token") === null) {
        window.location.href = "signIn.html"
    }
    const TOKEN = localStorage.getItem("token")
    return fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${TOKEN}`
        },
        body: bodyRequest
    }).then(response => {
        return response.json();
    })
}


function isAdm() {
    makeRequest(`${getUrl()}/investor/role/`).then(data => {
        if (!data.isAdm) {
            alert("Você não tem permissão para acessar essa página")
            window.location.href = "index.html"
        }
    }).catch(e => {
        if (e != null) {
            console.log(e)
            alert("Aconteceu algum erro na autenticação, por favor faça o login novamente")
            //window.location.href = "signIn.html"
        }
    })

}

function saveImage(id, newUrl) {
    const objectToSend = {
        "idAsset": id,
        "newUrl": newUrl
    }

    makeRequestWithBody(`${getUrl()}/update/image/asset/`, JSON.stringify(objectToSend)).then(data => {
        window.location.reload();
    }).catch(error => {
        alert("Aconteceu um erro, tente novamente")
        closePopUp()
    })
}

async function getListAssets() {
    try {
        const data = await makeRequest(`${getUrl()}/assets/list/`)
        return data
    } catch (error) {
        alert("Aconteceu um erro ao carregar lista de ativos, tente novamente")       
        console.log(error)
    }
}
function alterImage() {
    const url = document.getElementById("new-image-url").value
    if (url == "") {
        alert("Url vazia")
        return
    }
    checkIfImageExists(url, (exists) => {
        if (exists) {
            saveImage(idGlobal, url)
        } else {
            alert("A url informada não existe")
        }
    });
}
function changeImageById(id, name) {
    idGlobal = id
    const popupOverlay = document.getElementById('popup-overlay');
    document.getElementById("title").innerHTML = `Alterando imagem ${name}`
    popupOverlay.style.display = 'flex';
}
function closePopUp() {
    document.getElementById('popup-overlay').style.display = 'none'
}
function checkIfImageExists(url, callback) {
    const img = new Image();
    img.src = url;

    if (img.complete) {
        callback(true);
    } else {
        img.onload = () => {
            callback(true);
        };
        img.onerror = () => {
            callback(false);
        };
    }
}

function backHome() {
    window.location.href = "index.html"
}


document.addEventListener('DOMContentLoaded', async function () {
    const token = getTokenUrl()
    document.getElementById("showToken-test").innerHTML = "Seu token: " + token
    await verifyToken()
})

function getTokenUrl() {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');

    if (token == null) {
        alert("Erro, o token não foi informado.Não é possível recuperar a senha")
        //window.location.href = "index.html"
    }
    console.log(token);

    return token
}

async function makeRequestWithBody(url, bodyRequest) {
    return fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: bodyRequest
    }).then(response => {
        console.log(response)
        return response.json();
    })
}

async function verifyToken() {
    const URL = `${getUrl()}/investor/verify/code/`
    const TOKEN = getTokenUrl()

    let bodyToken = {
        token: TOKEN
    }

    bodyToken = JSON.stringify(bodyToken)

    await makeRequestWithBody(URL, bodyToken).then(e => {
        console.log(e)
        alert(e.message)
    }).catch(er => {
        alert(err.message)
        console.error(er)
    })
}

/* 

    Próximos passos:
        1 - Formatar mensagens de erro(se achar necessário)
        2 - Se o token for válido, deixar o usuário escolher sua nova senha(2 formulários, digitar e confirmar a senha)
        3 - Realizar uma nova requisição no endpoint /investor/update/password/ passando o token da url(retorno da função getTokenUrl())
        4 - Deve existir um botão para a pessoa poder recuperar/atualizar senha, clicando nele deve levar à uma tela que a pessoa digite seu email e uma nova requisição é feita no endpoint /investor/url/password/, passando o email no body
        5 - Deve existir uma tela para que a pessoa acesse e um email seja enviado para recuperar a senha, o nome fica à critério pagina_de_enviar_email.html, use a imaginação. 😎

*/
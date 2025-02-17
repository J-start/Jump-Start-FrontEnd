document.addEventListener("DOMContentLoaded", async function () {
  await verifyToken();
});

function getTokenUrl() {
  const params = new URLSearchParams(window.location.search);
  const token = params.get("token");

  if (token == null) {
    alert("Erro, o token não foi informado. Não é possível recuperar a senha.");
    window.location.href = "sendingEmail.html";
  }
  console.log(token);

  return token;
}

async function makeRequestWithBody(url, bodyRequest) {
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: bodyRequest,
  }).then((response) => {
    console.log(response);
    return response.json();
  });
}

async function verifyToken() {
  const URL = `${getUrl()}/investor/verify/token/`;
  const TOKEN = getTokenUrl();

  if (TOKEN == null) {
    return;
  }
  let bodyToken = {
    token: TOKEN,
  };

  bodyToken = JSON.stringify(bodyToken);

  await makeRequestWithBody(URL, bodyToken)
    .then((e) => {
      console.log(e);
      if (e.code == 200) {
        showComponentChanging();
      } else if (e.code) {
        if (e.message == "token expirado") {
          alert("Token expirado, envie novamente seu e-mail.");
          window.location.href = "sendingEmail.html";
          return;
        } else {
          alert("Houve um erro inexperado. Solicite novamente");
          window.location.href = "sendingEmail.html";
          return;
        }
      }
    })
    .catch((er) => {
      alert("Erro ao verificar o token. Tente novamente mais tarde.");

      console.error(er);
    });
}

async function updatePassword(newPassword) {
  const URL = `${getUrl()}/investor/update/password/`;
  const TOKEN = getTokenUrl();
  if (TOKEN == null) {
    this.showEmailReceiverComponent();
    return
  }
        this.shadow.querySelector("#buttonsending").value = "enviando email ...";


  let bodyRequest = {
    token: TOKEN,
    newPassword: newPassword,
  };

  bodyRequest = JSON.stringify(bodyRequest);

  await makeRequestWithBody(URL, bodyRequest)
    .then((response) => {
      console.log(response);
      if (response.code == 200) {
        alert("Senha atualizada com sucesso!");
        window.location.href = "signIn.html";

      } else {
        alert(response.message);
      }
    })
    .catch((error) => {
      alert("Erro na requisição. Tente novamente mais tarde.");
      console.error(error);
    });
}

function showComponentChanging() {
  const component = document.createElement("passwordchange-component");
  const container = document.getElementById("changing-component");
  if (container) {
    container.appendChild(component);
  } else {
    console.error(
      "Container para o componente de mudança de senha não encontrado."
    );
  }
}

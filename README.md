# Jump-start - Uma aplicação para entender sobre a compra, venda e mercado de ativos financeiros

## Tecnologias utizadadas
- HTML
- CSS
- JavaScript
- Chart.js
- Docker
- Digital Ocean

## Integração Contínua(CI)- Foi criado testes base de compra e venda de ativos utilizando selenium para verificação local e também foi adicionado o mesmo código ao github actions para integração contínua.
<div align="center">

![ci-1](public/app/assets/images/CI-dashboard.PNG)

![ci-2](public/app/assets/images/CI-dashboard-2.PNG)

</div>

## Como executar a aplicação

- Clone o repositório com o comando `git clone https://github.com/J-start/Jump-Start-FrontEnd.git`

- Navegue até os arquivos clonados com `cd Jump-Start-FrontEnd`

- Se a api estiver disponível, basta acessar o arquivo index.html

- Se a api não estiver online, acesse o repositório abaixo e disponibilize-a localmente 
<div align="center">

[link api-backend](https://github.com/J-start/Jump-Start-BackEnd)

</div>

Obs: No caso de rodar a api local é necessário que a contante `URL` seja `http://localhost:8080` 

## Testes - Para executar os testes, siga os passos abaixo:
- Navegue até a raiz do projeto com `cd Jump-Start-FrontEnd`
- Certifique-se de ter o python instalado e a api estar funcioando, localmente ou remotamente
- Instale as dependencias necessárias com `python -r requirements.txt`
- Execute: `python main.py`






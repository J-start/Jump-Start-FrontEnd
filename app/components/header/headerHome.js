class HeaderHome extends HTMLElement {

    shadow = this.attachShadow({ mode: "open" });

    constructor() {
        super()

        this.shadow.appendChild(this.createHTML())
        this.createStyles("app/components/header/headerHome-style.css")

        const openMenu = this.shadow.querySelector("#openMenu")
        const closeMenu = this.shadow.querySelector("#closeMenu")
        const sidebar = this.shadow.querySelector("#sidebar")
        const overlay = this.shadow.querySelector("#overlay")

        openMenu.addEventListener("click", () => {
            sidebar.classList.add("active")
            overlay.classList.add('active')
        })

        closeMenu.addEventListener("click", () => {

            sidebar.classList.remove('active');
            overlay.classList.remove('active');
        })

        overlay.addEventListener("click", () => {
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
        })

    }

    createHTML() {

        const template =
            `
    <div id="containerHeadHome">
        <div id="headHomeMenu">
            <button id="openMenu">☰ </button>
        </div>

        <div id="headHomeContents">
            <h1>Olá, Fulano</h1>
            <h2>Saldo: R$ 230,00</h2>
        </div>
    </div>

    <div id="sidebar" class="sidebar">
        <button id="closeMenu" class="close-btn">&times;</button>
        <ul>
            <li><a href="#"> <div class="containerItensMenu"><img src="app/assets/images/home_icon.png" alt="home"> <p>Home</p></div> </a></li>
            <li><a href="#">Carteira</a></li>
            <li><a href="#">Notificações</a></li>
            <li><a href="#">Perfil</a></li>
        </ul>
    </div>

    <div id="overlay" class="overlay"></div><div class="quemSomos-container">
            <section class="quemSomos">
            <h1 class="quemSomos-titulo">Quem somos ?</h1>
            <p class="quemSomos-subtitulo"></p>
            <p class="quemSomos-descricao"></p>
        </section>
        </div>
        `

        const componentRoot = document.createElement("div");
        componentRoot.setAttribute("class", "home-component");
        componentRoot.innerHTML = template;
        return componentRoot

    }

    createStyles(...linksUser) {

        linksUser.forEach(e => {
            const link = this.createLink(e)
            this.shadow.appendChild(link)
        })

    }
    createLink(linkStyle) {
        const link = document.createElement("link");
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("href", linkStyle);
        return link
    }
}

customElements.define("header-home", HeaderHome);
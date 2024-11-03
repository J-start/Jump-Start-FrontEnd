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
        </div>
    </div>

    <div id="sidebar" class="sidebar">
        <button id="closeMenu" class="close-btn">&times;</button>
        <div class="wrapImageLogo">
            <img src="app/assets/images/logo.PNG" alt="logo jumpStart">
        </div>
        <ul>

            <li>
                <a href="#"> 
                    <div class="wrapItensMenu">
                        <div class="containerItensMenu">
                            <div class="wrapImageMenu" id="imageHome">
                                <img src="app/assets/images/home_icon.png" alt="home">  
                            </div>
                            <p>Home</p>
                        </div>
                    </div>
                </a>
            </li>

            <li>
                <a href="#"> 
                    <div class="wrapItensMenu">
                        <div class="containerItensMenu">
                        <div class="wrapImageMenu" id="imageWallet">
                            <img src="app/assets/images/wallet_icon.png" alt="Carteira">  
                        </div>
                            <p>Carteira</p>
                        </div>
                    </div>
                </a>
            </li>
           <li>
                <a href="#"> 
                    <div class="wrapItensMenu">
                        <div class="containerItensMenu">
                        <div class="wrapImageMenu" id="imageNotifications">
                            <img src="app/assets/images/notifications_icon.png" alt="Notificações icone">  
                        </div>
                            <p>Notificações</p>
                        </div>
                    </div>
                </a>
            </li>
                       <li>
                <a href="#"> 
                    <div class="wrapItensMenu">
                        <div class="containerItensMenu">
                        <div class="wrapImageMenu" id="imageProfile">
                            <img src="app/assets/images/profile_icon.png" alt="Perfil icone">  
                        </div>
                            <p>Perfil</p>
                        </div>
                    </div>
                </a>
            </li>
        </ul>
    </div>

    <div id="overlay" class="overlay">
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
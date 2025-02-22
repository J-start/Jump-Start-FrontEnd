class SideBar extends HTMLElement {

    shadow = this.attachShadow({ mode: "open" });

    constructor() {
        super()

        this.shadow.appendChild(this.createHTML())

        this.createStyles("app/components/sideBar/sideBar-style.css")
        this.createStyles("app/components/sideBar/sideBar-style-responsive.css")
        this.defineTopSideBar()
        this.activateButton()
     
        this.isAdm()
        const openMenu = this.shadow.querySelector("#openMenu")
        const closeMenu = this.shadow.querySelector("#closeMenu")
        const sidebar = this.shadow.querySelector("#sidebar")
        const overlay = this.shadow.querySelector("#overlay")

        this.verifyWidthgScreen(sidebar, openMenu, closeMenu)

        window.addEventListener('resize', () => {
            this.verifyWidthgScreen(sidebar, openMenu, closeMenu)
            if (overlay.classList.contains('active')) {
                overlay.classList.remove('active')
            }
        });


        openMenu.addEventListener("click", () => {
            this.showSideBar(sidebar, overlay, openMenu)
        })

        closeMenu.addEventListener("click", () => {
            this.hideSideBar(sidebar, overlay, openMenu)
        })

        overlay.addEventListener("click", () => {
            this.hideSideBar(sidebar, overlay, openMenu)
        })

    }

    createHTML() {

        const template =
            `
     <div id="containerHeadHome">
        <div id="headHomeMenu">
           
        </div>
    </div>
 <button id="openMenu"> ☰ </button>
    <div id="sidebar" class="sidebar">
        <button id="closeMenu" class="close-btn">&times;</button>
        <div class="wrapImageLogo">
            <img src="app/assets/images/logo.PNG" alt="logo jumpStart">
        </div>

        <ul id="menu">

            <li>
                <a href="index.html"> 
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
                <a href="wallet.html"> 
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
                <a href="profile.html"> 
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
        componentRoot.setAttribute("class", "menu-component");
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

    verifyWidthgScreen(sideBar, openMenu, closeMenu) {
        var width = window.innerWidth;
        if (width >= 1024) {
            sideBar.classList.add("active")
            openMenu.style.display = "none"
            closeMenu.style.display = "none"

        } else {
            sideBar.classList.remove("active")
            openMenu.style.display = "block"
            closeMenu.style.display = "block"

        }
    }

    showSideBar(sideBar, overlay, openMenu) {
        sideBar.classList.add("active")
        overlay.classList.add('active')
        openMenu.style.display = "none"
    }

    hideSideBar(sideBar, overlay, openMenu) {
        sideBar.classList.remove('active');
        overlay.classList.remove('active');
        openMenu.style.display = "block"
    }

    defineTopSideBar() {
        this.shadow.querySelector("#openMenu").style.top = this.getAttribute("top-sidebar") + "%"
    }
    activateButton() {
        let button = this.getAttribute("highlight")
        if (!button) {
            return
        }

        this.shadow.querySelector("#imageHome").style.backgroundColor = "none"
        this.shadow.querySelector("#imageWallet").style.backgroundColor = "none"
        this.shadow.querySelector("#imageProfile").style.backgroundColor = "none"

        this.shadow.querySelector(`#image${button}`).style.backgroundColor = "#1465FF"
    }

    async makeRequest() {
        if (!localStorage.getItem("token") || localStorage.getItem("token") == "undefined" || localStorage.getItem("token") == "null") {
            return
        }
        const TOKEN = localStorage.getItem("token")
        const url = `${getUrl()}/investor/role/`;
        return await fetch(url, {
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

    async isAdm() {
       await this.makeRequest().then(data => {
            if (data.isAdm) {
                this.createLinkAdm()
            }
        }).catch(e => {})
    }

    createLinkAdm() {
        const menu = this.shadow.querySelector("#menu")

        const li = document.createElement("li");
        const a = document.createElement("a");
        a.href = "adm.html";

        const wrapItensMenu = document.createElement("div");
        wrapItensMenu.classList.add("wrapItensMenu");

        const containerItensMenu = document.createElement("div");
        containerItensMenu.classList.add("containerItensMenu");

        const wrapImageMenu = document.createElement("div");
        wrapImageMenu.classList.add("wrapImageMenu");
        wrapImageMenu.id = "imageAdmin";

        const img = document.createElement("img");
        img.src = "app/assets/images/admin_icon.png";
        img.alt = "admin";

        const p = document.createElement("p");
        p.textContent = "Admin";

        wrapImageMenu.appendChild(img);
        containerItensMenu.appendChild(wrapImageMenu);
        containerItensMenu.appendChild(p);
        wrapItensMenu.appendChild(containerItensMenu);
        a.appendChild(wrapItensMenu);
        li.appendChild(a);
        menu.appendChild(li);

    }

    
}

customElements.define("menu-component", SideBar);
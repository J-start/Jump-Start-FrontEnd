class UserProfile extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                .profile-container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    padding: 20px;
                    border-radius: 10px;
                    width: 400px;
                }

                .profile-card {
                    width: 100%;
                    padding: 40px;
                    border: 1px solid white; 
                    border-radius: 10px;
                    text-align: left;
                    margin-bottom: 15px;
                }

                .profile-card p {
                    margin: 5px 0;
                }

                .buttons {
                    display: flex;
                    gap: 10px;
                    padding-top: 40%;
                }

                button {
                    padding: 10px 15px;
                    border: none;
                    cursor: pointer;
                    border-radius: 5px;
                }

                .logout {
                    background: #0c5494;
                    color: white;
                }

                .edit {
                    background: #1465FF;
                    color: white;
                }
            </style>
            <div class="profile-container">
                <div class="profile-card">
                    <p><strong>Nome Usuário</strong></p>
                    <p>+55 082 1234 5678</p>
                    <p>EmailDoUsuario@gmail.com</p>
                </div>
                <div class="buttons">
                    <button class="logout">Sair do APP</button>
                    <button class="edit">Alterar dados</button>
                </div>
            </div>
        `;
    }
}

customElements.define("user-profile", UserProfile);

const botaoLogin = document.querySelector('#loginButton');
botaoLogin.addEventListener('click', () => {
    // Exibir a tela de carregamento

    const login = document.querySelector('#login_user').value;
    const password = document.querySelector('#password_user').value;

    const loginArea = document.querySelector('.grepolis-contents');
    const loader = document.querySelector('.loader');
    const data = {
        login,
        password
    };
    loginArea.style.display = 'none';
    loader.style.display = 'block';
    fetch('http://localhost:3000/enviarLogin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(result => {
            // Ocultar a tela de carregamento            

            if (result.message === true) {
                // Usuário logado com sucesso
                loader.style.display = 'none';
                const worldsContainer = document.querySelector('.worlds-container');
                const worldsContainerDiv = document.querySelector('.worlds-container div');

                result.mundos.forEach(mundo => {
                    const buttonWorld = document.createElement('button');
                    buttonWorld.textContent = mundo;
                    buttonWorld.addEventListener('click', () => {
                        worldsContainer.style.display = 'none';
                        loader.style.display = 'block';
                        requisicaoMundo(mundo);
                    })
                    worldsContainerDiv.appendChild(buttonWorld);
                });
                worldsContainer.style.display = 'block';

            } else {
                // Falha no login
                loader.style.display = 'none';
                loginArea.style.display = 'block';
                const smallLogin = document.querySelector('#smallLogin');
                smallLogin.style.display = 'block';
            }
        })
        .catch(error => {
            // Ocultar a tela de carregamento
            loading.style.display = 'none';

            console.error('Erro:', error);
        });

});

function requisicaoInicial() {
    const loader = document.querySelector('.loader');
    const loginArea = document.querySelector('.grepolis-contents');

    loginArea.style.display = 'none';
    loader.style.display = 'block';
    fetch('http://localhost:3000/iniciarNavegador', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: ''
    })
        .then(response => response.json())
        .then(result => {
            // Ocultar a tela de carregamento            

            if (result.startserver === true) {
                //Servidor inicializado com sucesso
                loginArea.style.display = 'flex';
                loader.style.display = 'none';
            }
        })
        .catch(error => {
            console.error('Erro na inicialização do server:', error);
        });
}
function requisicaoMundo(mundo) {
    fetch('http://localhost:3000/requisicaoMundo', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ mundo: mundo })
    })
        .then(response => response.json())
        .then(result => {


            if (result.complete === true) {
                fetch('http://localhost:3000/atualizarLogin', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: ''
                })
                    .then(response => response.json())
                    .then(result => {
                        
                    })
                    .catch(error => {
                        console.error('Erro:', error);
                    });

            } else {
                console.log('Erro kkkk')
            }
        })
        .catch(error => {
            console.error('Erro:', error);
        });
}
window.onload = function () {
    requisicaoInicial();
}
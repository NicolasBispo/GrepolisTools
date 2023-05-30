
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
                window.location.href = "./../../templates/loginsucess.html";
                console.log('Logado');
            } else {
                // Falha no login
                loader.style.display = 'none';
                loginArea.style.display = 'block';
                console.log('Não logado');
            }
        })
        .catch(error => {
            // Ocultar a tela de carregamento
            loading.style.display = 'none';

            console.error('Erro:', error);
        });

});

function requisicaoInicial() {
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
                console.log('servidor inicializado')
            }
        })
        .catch(error => {
            console.error('Erro na inicialização do server:', error);
        });
}

window.onload = function () {
    requisicaoInicial();
}
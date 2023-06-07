const express = require('express');
const app = express();
const port = 3000;
const GrepolisPuppeteer = require('./../puppeteer/GrepolisPuppeteer');
const { loadFile } = require('./../electron/electronService');

const grepolis = new GrepolisPuppeteer();
// Configuração do middleware para processar JSON
app.use(express.json());

app.post('/iniciarNavegador', (req, res) => {

    async function executar() {

        await grepolis.iniciarPuppeteer();
        res.json({
            startserver: true
        });
    }
    executar();

});
// Defina as rotas da sua API
app.post('/enviarLogin', (req, res) => {
    const login = req.body.login;
    const password = req.body.password;

    async function executar() {
        const loggedStatus = await grepolis.executarLogin(login, password);
        console.log('Valor de logged status: ' + loggedStatus)
        console.log('Método executarLogin concluído.');
        const mundosEncontrados = await grepolis.encontrarMundos();

        if (loggedStatus) {
            res.json({
                message: true,
                mundos: mundosEncontrados
            })
        }
        else {
            res.json({
                message: false
            })
        }

    }
    executar();
});
app.post('/requisicaoMundo', (req, res) => {

    const mundo = req.body.mundo;

    async function executar() {
        const statusSelecionarMundo = await grepolis.selecionarMundo(mundo);
        if (statusSelecionarMundo) {
            res.json({
                complete: true
            })
        }
        else {
            res.json({
                complete: false
            })
        }

    }
    executar();

});
app.post('/atualizarLogin', (req, res) => {

    async function executar() {
        loadFile('/electron/templates/functions.html');
        res.json({
            complete: true
        })
    }
    executar();


});

// Inicie o servidor
app.listen(port, () => {
    console.log(`[API] Servidor rodando na porta ${port}`);
});

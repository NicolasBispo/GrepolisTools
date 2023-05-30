const express = require('express');
const app = express();
const port = 3000;
const GrepolisPuppeteer = require('./../puppeteer/GrepolisPuppeteer');

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
        if (loggedStatus) {
            res.json({
                message: true
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

// Inicie o servidor
app.listen(port, () => {
    console.log(`[API] Servidor rodando na porta ${port}`);
});

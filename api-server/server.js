const express = require('express');
const app = express();
const port = 3000;

// Configuração do middleware para processar JSON
app.use(express.json());

// Defina as rotas da sua API
app.post('/enviarLogin', (req, res) => {
    const { login, password } = req.body;


});

// Inicie o servidor
app.listen(port, () => {
    console.log(`[API] Servidor rodando na porta ${port}`);
});

/*
Esse bloco inicializa os serviços de puppeteer e electron
*/

//Inicialização do spawn
const { spawn } = require('child_process');

//Inicialização do electron
const electronPath = require('electron');


//Inicialização do servidor de electron
const electron = spawn(electronPath, ['./electron/electronService.js']);
console.log('[ELECTRON-INTERFACE] - Servidor Electron iniciado');

//Inicialização do servidor de API
const apiServer = spawn('node', ['./api-server/server.js']);

//Capturando as saidas do serviço de API
apiServer.stdout.on('data', (data) => {
    console.log(data.toString().trim()); // Exibe a saída do servidor API
});

//Capturando erros do serviço de API
apiServer.stderr.on('data', (data) => {
    console.error(`[API] Erro no servidor, código: ${data}`);
});

//Capturando evento de fechar o serviço de API
apiServer.on('close', (code) => {
    console.log(`[API] Servidor fechado, código: ${code}`);
});

//Capturando evento de quando fechar o electron
electron.on('close', (code) => {
    console.log(`[ELECTRON-INTERFACE] - Processo finalizado, código: ${code}`);

    // Encerra o servidor API e o serviço de puppeteer
    apiServer.kill();
});
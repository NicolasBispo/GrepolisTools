const { app, BrowserWindow, ipcMain } = require('electron');
const { fork } = require('child_process');




function createWindow() {
    
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 800,
        webPreferences: {
            nodeIntegration: true // Permitir usar módulos do Node.js na página
        }
    });

    // Carregar o arquivo index.html
    mainWindow.loadFile('./templates/index.html');



    // Fechar a janela principal ao clicar no botão Fechar
    mainWindow.on('closed', () => {
        app.quit();
    });
}

app.whenReady().then(createWindow);

// Sair quando todas as janelas estiverem fechadas (exceto no macOS)
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        console.log('[ELECTRON-INTERFACE] Servidor iniciado');
        createWindow();

    }
});




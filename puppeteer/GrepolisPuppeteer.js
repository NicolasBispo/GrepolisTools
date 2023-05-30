const puppeteer = require('puppeteer');

class GrepolisPuppeteer {
    browser = null;
    page = null;

    async iniciarPuppeteer() {
        this.browser = await puppeteer.launch({ headless: false, handleSIGINT: false });
        this.page = await this.browser.newPage();
        await this.page.goto('https://br.grepolis.com');
        return;
    }

    async executarLogin(usuario, senha) {
        console.log('Usuário e senha no serviço ' + usuario, senha)
        const page = this.page;
        console.log('Valor de page' + page);
        console.log('Chegou na função executarLogin');
        //Seleciona o campo de usuário e digita o usuário definido
        await page.waitForSelector('#login_userid');
        await page.type('#login_userid', usuario);

        //Seleciona o campo de senha e digita a senha definida
        await page.waitForSelector('#login_password');
        await page.type('#login_password', senha);

        
        //Seleciona o botão de login e clica nele
        await page.waitForSelector('#login_Login');
        await page.click('#login_Login');

        //Verifica se o seguinte elemento existe na página, se não existir é porque a senha foi correta
        //Se existir o login foi malsucedido
        
         try {
            
            await page.waitForSelector('.validation-message-error', {timeout: 600});
            // Se a linha acima não gerar uma exceção, significa que o seletor foi encontrado
            // e o login foi malsucedido
            await page.click('.validation-error-close');
            console.log('User Não logado na classe Grepolis');
            return false;
        } catch (error) {
            // Se ocorrer uma exceção, significa que o seletor não foi encontrado
            // e o login foi bem-sucedido
            console.log('User Login com sucesso na classe Grepolis');
            await page.waitForNavigation();
            return true;
        }
             
    }
}

module.exports = GrepolisPuppeteer;

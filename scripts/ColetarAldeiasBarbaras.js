const GrepolisPuppeteer = require('./../puppeteer/GrepolisPuppeteer');
const BarbarianVillages = require('./../puppeteer/BarbarianVillages');
const WorldNavigation = require('./../puppeteer/WorldNavigation')

// Definir cores
const reset = "\x1b[0m";
const red = "\x1b[31m";
const green = "\x1b[32m";
const yellow = "\x1b[33m";
const blue = "\x1b[34m";
const white = "\x1b[37m";

let vistaAtual = ""
let cidadeAtual = "";

async function script() {
  const telaAtual = "";

  const grepolis = new GrepolisPuppeteer();
  await grepolis.iniciarPuppeteer();
  console.log(yellow + '[GREPOLIS-PUPPETER]' + red + '-' + white + 'Iniciando navegador.' + reset);

  const loggedStatus = await grepolis.executarLogin('usuario', 'senha');


  await grepolis.selecionarMundo('HIMERA');

  const barbarian = new BarbarianVillages();
  const worldNav = new WorldNavigation();
  const pageReceber = grepolis.obterPage();
  await barbarian.atualizarPage(pageReceber);
  await worldNav.atualizarPage(pageReceber);

  await worldNav.visaoIlha();
  vistaAtual = 'ilha';


  const cidadesExistentes = await worldNav.descobrirCidadesJogador('inicial');
  let contador = 0;
  let qtdeCidades = cidadesExistentes.length;
  console.log(yellow + '[EXECUCAO]' + red + '-' + white + 'Cidades encontradas:', cidadesExistentes + reset);
  console.log(yellow + '[EXECUCAO]' + red + '-' + white + 'Quantidade de cidades', qtdeCidades + reset);

  async function macroFarmBarbarian(cidade, min) {
    await worldNav.selecionarCidade(cidade);
    await worldNav.irParaCidadeSelecionada();
    await worldNav.esperarLoaderAjax();
    await barbarian.coletarRecursosVilaBarbaras(min);
  }

  async function executarMacro() {
    console.log(yellow + '[EXECUCAO]' + red + '-' + white + 'Iniciando execução da macro' + reset)
    for (contador = 0; contador < qtdeCidades; contador++) {
      const cidadeSelecionar = cidadesExistentes[contador].name;
      console.log(yellow + '[EXECUCAO]' + red + '-' + white + 'Executando macro barbaro na cidade:', cidadeSelecionar + reset)
      await macroFarmBarbarian(cidadeSelecionar, '10min');
    }    
  }
  
  await executarMacro();
  setInterval(async () => {
    await executarMacro();
  }, 11 * 60 * 1000);
  
  

}

script();

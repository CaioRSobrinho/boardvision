import { gerarNovaCoordenada } from './sorteio.js';

const elementoAlvo = document.getElementById('coordenada-alvo');
const botaoTeste = document.getElementById('btn-testar-sorteio');

function atualizarRodadaNaTela() {
    const casaSorteada = gerarNovaCoordenada();
    elementoAlvo.textContent = casaSorteada;
    console.log(`[Motor de Sorteio] Nova casa alvo: ${casaSorteada}`);
}

atualizarRodadaNaTela();
botaoTeste.addEventListener('click', atualizarRodadaNaTela);
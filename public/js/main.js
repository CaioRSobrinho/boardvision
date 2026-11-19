import { gerarNovaCoordenada } from './sorteio.js';
import { validarJogada } from './jogo.js';

const elementoAlvo = document.getElementById('coordenada-alvo');
const botaoTeste = document.getElementById('btn-testar-sorteio');
const containerTabuleiro = document.getElementById('tabuleiro-container');

function atualizarRodadaNaTela() {
    const casaSorteada = gerarNovaCoordenada();
    elementoAlvo.textContent = casaSorteada;
    console.log(`[Motor de Sorteio] Nova casa alvo: ${casaSorteada}`);
}

function lidarComCliqueTabuleiro(event) {
    const casaClicada = event.target.dataset.square;
    if (!casaClicada) return;

    const resultado = validarJogada(casaClicada);
    console.log(resultado);

    if (resultado.acertou) {
        atualizarRodadaNaTela()
    }
}

atualizarRodadaNaTela();
botaoTeste.addEventListener('click', atualizarRodadaNaTela);
containerTabuleiro.addEventListener('click', lidarComCliqueTabuleiro);
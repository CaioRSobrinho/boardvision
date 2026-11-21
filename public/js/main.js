import { gerarNovaCoordenada } from './sorteio.js';
import { validarJogada } from './jogo.js';
import { criarTabuleiro } from './tabuleiro.js';

const elementoAlvo = document.getElementById('coordenada-alvo');
const botaoTeste = document.getElementById('btn-testar-sorteio');
const containerTabuleiro = document.getElementById('tabuleiro-container');

function atualizarRodadaNaTela() {
    const casaSorteada = gerarNovaCoordenada();
    elementoAlvo.textContent = casaSorteada;
    console.log(`[Motor de Sorteio] Nova casa alvo: ${casaSorteada}`);
}

function lidarComCliqueTabuleiro(event) {
    const elementoClicado = event.target;
    const coordenada = elementoClicado.dataset.square

    if (!coordenada) return;

    const resultado = validarJogada(coordenada);

    if (resultado.acertou) {
        elementoClicado.classList.add('acerto');
        setTimeout(() => elementoClicado.classList.remove('acerto'), 300);

        atualizarRodadaNaTela()
    } else {
        elementoClicado.classList.add('erro');
        setTimeout(() => elementoClicado.classList.remove('erro'), 300);
    }
}

if (containerTabuleiro) {
    criarTabuleiro(containerTabuleiro);
}

atualizarRodadaNaTela();
botaoTeste.addEventListener('click', atualizarRodadaNaTela);
containerTabuleiro.addEventListener('click', lidarComCliqueTabuleiro);
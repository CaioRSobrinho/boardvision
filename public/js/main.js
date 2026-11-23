import { gerarNovaCoordenada } from './sorteio.js';
import { validarJogada } from './jogo.js';
import { criarTabuleiro } from './tabuleiro.js';
import { Cronometro } from './cronometro.js';
import { resetarPlacar } from './jogo.js';

const elementoAlvo = document.getElementById('coordenada-alvo');
const containerTabuleiro = document.getElementById('tabuleiro-container');

const elementoAcerto = document.getElementById('qtd-acertos');
const elementoSequencia = document.getElementById('qtd-sequencia');

const tempoRestante = document.getElementById('tempo-restante');
const btnIniciar = document.getElementById('btn-iniciar');



const relogioPartida = new Cronometro(
    30,
    (tempoAtual) => {
        tempoRestante.textContent = tempoAtual + 's';
    },
    () => {
        console.log(`[UI] O tempo acabou, A travar o tabuleiro`);
        containerTabuleiro.removeEventListener('click', lidarComCliqueTabuleiro);
    
        btnIniciar.disabled = false;
        btnIniciar.textContent = "Jogar Novamente";
    }
);

function atualizarRodadaNaTela() {
    const casaSorteada = gerarNovaCoordenada();
    elementoAlvo.textContent = casaSorteada;
}

function lidarComCliqueTabuleiro(event) {
    const elementoClicado = event.target;
    const coordenada = elementoClicado.dataset.square

    if (!coordenada) return;

    const resultado = validarJogada(coordenada);

    if (resultado.acertou) {
        elementoClicado.classList.add('acerto');
        setTimeout(() => elementoClicado.classList.remove('acerto'), 300);

        elementoAcerto.textContent = resultado.pontos;
        elementoSequencia.textContent = resultado.sequencia;

        atualizarRodadaNaTela()
    } else {
        elementoClicado.classList.add('erro');
        setTimeout(() => elementoClicado.classList.remove('erro'), 300);

        elementoSequencia.textContent = resultado.sequencia;
    }
}

if (containerTabuleiro) {
    criarTabuleiro(containerTabuleiro);
}

atualizarRodadaNaTela();

btnIniciar.addEventListener('click', () => {
    btnIniciar.disabled = true;

    relogioPartida.reset();
    
    resetarPlacar()
    elementoAcerto.textContent = 0;
    elementoSequencia.textContent = 0;

    relogioPartida.start();
    containerTabuleiro.addEventListener('click', lidarComCliqueTabuleiro);
});
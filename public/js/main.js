import { gerarNovaCoordenada } from './sorteio.js';
import { validarJogada, resetarPlacar, obterEstatisticasFinais } from './jogo.js';
import { criarTabuleiro } from './tabuleiro.js';
import { Cronometro } from './cronometro.js';

const elementoAlvo = document.getElementById('coordenada-alvo');
const containerTabuleiro = document.getElementById('tabuleiro-container');

const elementoAcerto = document.getElementById('qtd-acertos');
const elementoSequencia = document.getElementById('qtd-sequencia');
const modalFimJogo = document.getElementById('modal-fim-jogo');
const btnRestartModal = document.getElementById('btn-restart-modal');

const modalPontos = document.getElementById('modal-pontos');
const modalErros = document.getElementById('modal-erros');
const modalStreak = document.getElementById('modal-streak');
const modalPrecisao = document.getElementById('modal-precisao');

const tempoRestante = document.getElementById('tempo-restante');
const btnIniciar = document.getElementById('btn-iniciar');

const relogioPartida = new Cronometro(
    10,
    (tempoAtual) => {
        const segundoFormatados = String(tempoAtual).padStart(2, '0');
        tempoRestante.textContent = `00:${segundoFormatados}`;
    },
    () => {
        containerTabuleiro.removeEventListener('click', lidarComCliqueTabuleiro);
        
        const stats = obterEstatisticasFinais();

        modalPontos.textContent = stats.pontos;
        modalErros.textContent = stats.erros;
        modalStreak.textContent = stats.maiorSequencia;
        modalPrecisao.textContent = stats.precisao + '%';
        /*
        btnIniciar.disabled = false;
        btnIniciar.textContent = "Jogar Novamente";
        */

        modalFimJogo.classList.remove('oculto');
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

btnRestartModal.addEventListener('click', () => {
    modalFimJogo.classList.add('oculto');

    relogioPartida.reset();
    
    resetarPlacar();
    elementoAcerto.textContent = 0;
    elementoSequencia.textContent = 0;

    relogioPartida.start();
    containerTabuleiro.addEventListener('click', lidarComCliqueTabuleiro);
    atualizarRodadaNaTela();
});
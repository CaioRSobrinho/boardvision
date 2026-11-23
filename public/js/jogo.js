import { obterCoordenadaAtual } from "./sorteio.js";

let pontos = 0;
let sequencia = 0;

/**
 * Verifica se o botão clicado pelo usuario é o mesmo que foi sorteado e aplica a pontuação e a sequencia de acertos.
 * @param {string} casaClicada
 */
export function validarJogada(casaClicada) {
    const acertou = casaClicada === obterCoordenadaAtual();

    if (acertou) {
        pontos++;
        sequencia++;
    } else {
        sequencia = 0;
    }
    return { acertou, pontos, sequencia };
}

export function resetarPlacar() {
    pontos = 0;
    sequencia = 0;
}
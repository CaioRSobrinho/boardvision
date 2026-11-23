import { obterCoordenadaAtual } from "./sorteio.js";

let pontos = 0;
let erros = 0;
let sequencia = 0;
let maiorSequencia = 0;

/**
 * Verifica se o botão clicado pelo usuario é o mesmo que foi sorteado e aplica a pontuação e a sequencia de acertos.
 * @param {string} casaClicada
 */
export function validarJogada(casaClicada) {
    const acertou = casaClicada === obterCoordenadaAtual();

    if (acertou) {
        pontos++;
        sequencia++;

        if (sequencia > maiorSequencia) {
            maiorSequencia = sequencia;
        }
    } else {
        erros++;
        sequencia = 0;
    }
    return { acertou, pontos, sequencia };
}

export function resetarPlacar() {
    pontos = 0;
    erros = 0;
    sequencia = 0;
    maiorSequencia = 0;
}

export function obterEstatisticasFinais() {
    const totalCLiques = pontos + erros;
    let precisao = 0;

    if (totalCLiques > 0) {
        precisao= ((pontos / totalCLiques) *100).toFixed(1);
    }

    return {
        pontos: pontos,
        erros: erros,
        maiorSequencia: maiorSequencia,
        precisao: precisao
    };
}
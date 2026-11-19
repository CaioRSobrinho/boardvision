const COLUNAS = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const FILEIRAS = ['1', '2', '3', '4', '5', '6', '7', '8'];

let coordenadaAtual = '';

function sortearItemAleatorio(lista) {
    const indice = Math.floor(Math.random() * lista.length);
    return lista[indice];
}

/**
 * Gera uma nova coordenada algébrica (ex: 'e4') sem repetir a anterior (RN04).
 * @returns {string}
 */
export function gerarNovaCoordenada() {
    let novaCoordenada = '';

    // RN04: impede sortear a mesma casa duas vezes seguidas
    do {
        novaCoordenada = sortearItemAleatorio(COLUNAS) + sortearItemAleatorio(FILEIRAS);
    } while (novaCoordenada === coordenadaAtual);

    coordenadaAtual = novaCoordenada;
    return coordenadaAtual;
}

/**
 * Retorna a coordenada alvo ativa na rodada atual.
 * @returns {string}
 */
export function obterCoordenadaAtual() {
    return coordenadaAtual;
}
const COLUNAS = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',];
const FILEIRAS = ['1', '2', '3', '4', '5', '6', '7', '8',]

/**
 * Exporta a função para o main.js usar recebendo o container como alvo
 * @return {string}
 */
export function criarTabuleiro(containerTabuleiro) {
    for (let i = FILEIRAS.length - 1; i >= 0; i--) {
        for (let j = 0; j < COLUNAS.length; j++) {
            const coordenadaCasa = COLUNAS[j] + FILEIRAS[i];

            const casaTabuleiro = document.createElement('div');
            casaTabuleiro.classList.add('casa');

            if ((i + j) % 2 !== 0) {
                casaTabuleiro.classList.add('clara');
            } else {
                casaTabuleiro.classList.add('escura');
            }

            casaTabuleiro.dataset.square = coordenadaCasa;

            containerTabuleiro.appendChild(casaTabuleiro);
        }
    }
}

/**
 * ============================================================================
 * PROJETO: Boardvision - Treinador de Coordenadas de Xadrez
 * ARQUIVO: script.js (Motor de Sorteio e Controle de Estado)
 * TAREFA JIRA: BOAR-6 [US03]
 * ============================================================================
 */

// 1. CONSTANTES DO TABULEIRO
// Representam os eixos do tabuleiro de xadrez na notação algebrica oficial.
const COLUNAS = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',];
const FILEIRAS = ['1', '2', '3', '4', '5', '6', '7', '8',];

// 2. ETADO DO JOGO (state)
// Guardar a última coordenada sorteada para cumprir a regra de Négócio RN04
// (nunca repetir a mesma casa duas vezes seguidas).
let coordenadaAtual = '';

// 3. ELEMENTOS DA TELA (DOM)
// Referência aos elementos do HTML onde o JS vai exibir informações.
const elementoAlvo = document.getElementById('coordenada-alvo');
const botaoTeste = document.getElementById('btn-testar-sorteio');
const containerTabuleiro = document.getElementById('tabuleiro-container');

// FUNÇÕES DO SISTEMA

/**
* Sorteia um índice aleatório válido para um array.
* @param {Array} lista - O array de onde queremos sortear um item.
* @returns {string} O elemento sorteado de dentro do array. 
*/
function sortearItemAleatorio(lista) {
    const indiceAleatorio = Math.floor(Math.random() * lista.length);
    return lista[indiceAleatorio];
}

/**
* Gera uma nova coordenada de xadrez (ex: 'e4') garantindo que não seja
* igual à coordenada imediatamente anterior (Regra RN04).
* @returns {string} A nova coordenada sorteada.
*/
function gerarNovaCoordenada() {
    let novaCoordenada = '';

    // Executa o sorteio pelo menos uma vez. Se cair igual à anterior, sorteia de novo.
    do {
        const colunaSorteada = sortearItemAleatorio(COLUNAS);
        const fileiraSorteada = sortearItemAleatorio(FILEIRAS);
        novaCoordenada = colunaSorteada + fileiraSorteada;
    } while (novaCoordenada === coordenadaAtual);

    // Atualiza o estado global do jogo com a nova casa
    coordenadaAtual = novaCoordenada;
    return coordenadaAtual;
}

/**
 * Atualiza o texto no topo da tela com uma nova coordenada sorteada.
 */
function atualizarRodadaNaTela() {
    const casaSorteada = gerarNovaCoordenada();
    elementoAlvo.textContent = casaSorteada;
    console.log(`[Motor de sorteio] Nova casa alvo: ${casaSorteada}`);
}

/**
 * Gera dinamicamente as 64 casas do tabuleiro (8x8) no DOM
 * Atende à [US02] e aplica a Regra de Negócio RN01 (a8 clara, a1 escura).
 */
function criarTabuleiro() {
    // 1. Percorre as fileiras de cima para baixo (da 8 até a 1),
    // pois o navegador desenha os elementos do topo para a base da tela
    for (let i = FILEIRAS.length - 1; i >= 0; i--) {

        // 2. para cada fileira, percorre as colunas da esquerda para a direita (a até h)
        for (let j = 0; j < COLUNAS.length; j++) {
            const coordenadaCasa = COLUNAS[j] + FILEIRAS[i];

            // 3. Cria a div na memória e aplica a classe estrutural de tamanho
            const casaTabuleiro = document.createElement('div');
            casaTabuleiro.classList.add('casa');

            // 4. Lógica da matriz xadrez (RN01): se a soma dos indices (linha + coluna)
            // for ímpar, a casa é clara(ex: a8 -> 7+0 = 7); se for par, é escura (ex: a1 -> 0+0=0)
            if ((i + j) % 2 !== 0) {
                casaTabuleiro.classList.add('clara');
            } else {
                casaTabuleiro.classList.add('escura');
            }

            // 5. Grava a etiqueta da coordenada (data-square) para futura leitura do clique
            casaTabuleiro.dataset.square = coordenadaCasa;

            // 6. Insere a casa pronta dentro do tabuleiro na tela
            containerTabuleiro.appendChild(casaTabuleiro);
        }
    }
}

// 5. INICIALIZAÇÃO E EVENTOS
// Assim que a página carrega, já sorteia a primeira coordenada automaticamente:
criarTabuleiro();
atualizarRodadaNaTela();

// Evento no botão provisório para a equipe testar vários sorteios seguidos:
botaoTeste.addEventListener('click', atualizarRodadaNaTela);
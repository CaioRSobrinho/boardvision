/**
 * ============================================================================
 * PROJETO: Boardvision - Treinador de Coordenadas de Xadrez
 * ARQUIVO: script.js (Motor de Sorteio e Controle de Estado)
 * TAREFA JIRA: BOAR-6 [US03]
 * ============================================================================
 */

// 1. CONSTANTES DO TABULEIRO
// Representam os eixos do tabuleiro de xadrez na notação algébrica oficial.
const COLUNAS = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const FILEIRAS = ['1', '2', '3', '4', '5', '6', '7', '8'];

// 2. ESTADO DO JOGO (State)
// Guarda a última coordenada sorteada para cumprir a Regra de Negócio RN04
// (nunca repetir a mesma casa duas vezes seguidas).
let coordenadaAtual = '';

// 3. ELEMENTOS DA TELA (DOM)
// Referências aos elementos do HTML onde o JS vai exibir informações.
const elementoAlvo = document.getElementById('coordenada-alvo');
const botaoTeste = document.getElementById('btn-testar-sorteio');

// 4. FUNÇÕES DO SISTEMA

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
    console.log(`[Motor de Sorteio] Nova casa alvo: ${casaSorteada}`);
}

// 5. INICIALIZAÇÃO E EVENTOS
// Assim que a página carrega, já sorteia a primeira coordenada automaticamente:
atualizarRodadaNaTela();

// Evento no botão provisório para a equipe testar vários sorteios seguidos:
botaoTeste.addEventListener('click', atualizarRodadaNaTela);
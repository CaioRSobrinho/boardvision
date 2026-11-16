# Boardvision ♟️

Plataforma interativa de treinamento de visão de tabuleiro (*Board Vision*), ajudando enxadristas a memorizarem instantaneamente as 64 coordenadas algébricas do xadrez.

## 🚀 Tecnologias (Stack)
- **Front-End:** HTML5, CSS3 (Grid) e JavaScript Vanilla.
- **Back-End:** Node.js com Express.

## 📋 Regras de Negócio Iniciais
1. **Geometria:** Tabuleiro 8x8. A casa `a1` é escura e a casa `h1` é clara.
2. **Sorteio:** O sistema sorteia uma coordenada (ex: `e4`). Não pode repetir a mesma casa duas vezes seguidas.
3. **Mecânica:** Clique na casa correta soma +1 ponto. Erro zera a sequência (streak).

## 💻 Como rodar o projeto localmente
1. Clone este repositório: `git clone https://github.com/SEU-USUARIO/boardvision.git`
2. Instale as dependências: `npm install`
3. Rode o servidor: `node server.js`
4. Abra no navegador: `http://localhost:3000`
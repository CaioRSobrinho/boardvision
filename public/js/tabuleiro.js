export class Tabuleiro {
    constructor(containerDOM) {
        this.containerDOM = containerDOM;
        this.visaoBrancas = true;
        this.colunaLetras = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
        this.fileiraNumeros = ['1', '2', '3', '4', '5', '6', '7', '8'];
    }
    renderizar() {
        this.containerDOM.innerHTML = '';

        let ordemFileiraNumeros;
        let ordemColunaLetras;

        if (this.visaoBrancas) {
            ordemFileiraNumeros = [...this.fileiraNumeros].reverse();
            ordemColunaLetras = this.colunaLetras;
        } else {
            ordemFileiraNumeros = this.fileiraNumeros;;
            ordemColunaLetras = [...this.colunaLetras].reverse();
        }
        for (const numero of ordemFileiraNumeros) {
            for (const letra of ordemColunaLetras) {
                let coordenadaCasa = letra + numero;
                
                const indiceLetra = this.colunaLetras.indexOf(letra);
                const indiceNumero = this.fileiraNumeros.indexOf(numero);
                const eCasaClara = (indiceLetra + indiceNumero) % 2 !== 0;
                const casaTabuleiro = document.createElement('div');
                casaTabuleiro.classList.add('casa');  

                if(eCasaClara) {
                    casaTabuleiro.classList.add('clara');
                } else {
                    casaTabuleiro.classList.add('escura');
                }

                casaTabuleiro.dataset.square = coordenadaCasa;

                this.containerDOM.appendChild(casaTabuleiro);
            }
        }
    }
}
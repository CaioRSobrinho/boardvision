export class Cronometro {
    constructor(tempoInicial = 30, aoAtualizar, aoZerar) {
        this.tempoRestante = tempoInicial;
        this.intervalo = null;
        this.rodando = false;

        this.tempoOriginal = tempoInicial;

        this.aoAtualizar = aoAtualizar;
        this.aoZerar = aoZerar;

    }

    start() {
        if(this.rodando) return;

        this.rodando = true;
        this.intervalo = setInterval(() => {
            this.tempoRestante--;

            if (this.aoAtualizar) {
                this.aoAtualizar(this.tempoRestante);
            }

            if (this.tempoRestante == 0) {
                this.rodando = false;

                clearInterval(this.intervalo);

                if(this.aoZerar) {
                    this.aoZerar();
                }
            }
        }, 1000);
    }

    reset() {
        clearInterval(this.intervalo);
        this.rodando = false;
    
        this.tempoRestante = this.tempoOriginal;

        if (this.aoAtualizar) {
            this.aoAtualizar(this.tempoRestante);
        }
    }

    pause() {
        clearInterval(this.intervalo);
        this.rodando = false;
    }

    stop() {
        clearInterval(this.intervalo);
        this.rodando = false;
        this.tempoRestante = 30;
    }
}
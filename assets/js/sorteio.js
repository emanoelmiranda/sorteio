const Sorteio = function (totalDeNumeros, quantidaDeNumeros) {
    quantidaDeNumeros = quantidaDeNumeros || 6;
    totalDeNumeros = totalDeNumeros || 60;

    let arrayDeNumeros = [],
        numeroDeTentativas = 0,
        arrayDeNumerosSorteados = [];

    const that = this;

    const carregarArrayNumeros = function () {
        for (let i = 0; i < totalDeNumeros; i++) {
            arrayDeNumeros[i] = {
                valor: i + 1,
                sorteado: false
            };
        }

        return that;
    };

    const algoritmoRandomico = function () {
        return Math.floor(Math.random() * 100);
    };

    this.retornarArrayDeNumerosParaSorteio = function () {
        let listaDeNumeros = [];

        for (let i = 0; i < arrayDeNumeros.length; i++) {
            listaDeNumeros[i] = arrayDeNumeros[i].valor;
        }

        return listaDeNumeros;
    };

    this.retornarArrayDeNumerosSorteados = function () {
        return arrayDeNumerosSorteados;
    };

    this.sortear = function () {
        let chaveParaSortearNumero = algoritmoRandomico();

        if (
            chaveParaSortearNumero >= 0 &&
            chaveParaSortearNumero < totalDeNumeros &&
            arrayDeNumeros[chaveParaSortearNumero].sorteado === false
        ) {
            let numeroSorteado = arrayDeNumeros[chaveParaSortearNumero];

            arrayDeNumerosSorteados[numeroDeTentativas] = numeroSorteado.valor;
            arrayDeNumeros[chaveParaSortearNumero].sorteado = true;
            numeroDeTentativas++;
        } else {
            that.sortear();
        }
    };

    this.reiniciarSorteio = function () {
        arrayDeNumerosSorteados = [];
        numeroDeTentativas = 0;

        for (let itemDoArrayDeNumeros of arrayDeNumeros) {
            itemDoArrayDeNumeros.sorteado = false;
        }
    };

    this.retornarNumeroDaTentativaAtual = function () {
        return numeroDeTentativas;
    };

    this.retornarNumeroSorteado = function (numeroDaTentativa) {
        numeroDaTentativa = numeroDaTentativa || that.retornarNumeroDaTentativaAtual();

        return arrayDeNumerosSorteados[numeroDaTentativa - 1];
    };

    this.sortearSequenciaNumerica = function (totalDeNumerosDaSequencia) {
        totalDeNumerosDaSequencia = totalDeNumerosDaSequencia || 6;

        for (let i = 0; i < totalDeNumerosDaSequencia; i++) {
            that.sortear();
        }

        let arrayDeNumerosSorteados = that.retornarArrayDeNumerosSorteados();

        that.reiniciarSorteio();

        return arrayDeNumerosSorteados;
    };

    return carregarArrayNumeros();
};

const Raffle = function (totalDeNumeros, quantidaDeNumeros) {
  quantidaDeNumeros = quantidaDeNumeros || 6;
  totalDeNumeros = totalDeNumeros || 60;

  let arrayDeNumeros = [],
    numeroDeTentativas = 0,
    arrayDeNumerosSorteados = [];

  const carregarArrayNumeros = () => {
    for (let i = 0; i < totalDeNumeros; i++)
      arrayDeNumeros[i] = {valor: i + 1, sorteado: false };

    return this;
  };

  const algoritmoRandomico = () => Math.floor(Math.random() * 100);

  this.retornarArrayDeNumerosParaSorteio = () => {
    let listaDeNumeros = [];

    for (let i = 0; i < arrayDeNumeros.length; i++)
      listaDeNumeros[i] = arrayDeNumeros[i].valor;

    return listaDeNumeros;
  };

  this.retornarArrayDeNumerosSorteados = () => arrayDeNumerosSorteados;

  this.sortear = () => {
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
    } else
      this.sortear();
  };

  this.reiniciarSorteio = () => {
    arrayDeNumerosSorteados = [];
    numeroDeTentativas = 0;

    for (let itemDoArrayDeNumeros of arrayDeNumeros)
      itemDoArrayDeNumeros.sorteado = false;
  };

  this.retornarNumeroDaTentativaAtual = () => numeroDeTentativas;

  this.retornarNumeroSorteado = (numeroDaTentativa) =>
    arrayDeNumerosSorteados[numeroDaTentativa || this.retornarNumeroDaTentativaAtual() - 1];

  this.sortearSequenciaNumerica = (totalDeNumerosDaSequencia) => {
    totalDeNumerosDaSequencia = totalDeNumerosDaSequencia || 6;

    for (let i = 0; i < totalDeNumerosDaSequencia; i++)
      this.sortear();

    let arrayDeNumerosSorteados = this.retornarArrayDeNumerosSorteados();

    this.reiniciarSorteio();

    return arrayDeNumerosSorteados;
  };

  return carregarArrayNumeros();
};

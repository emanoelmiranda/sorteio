;(function () {
  const
    listaDeNumerosParaSorteio = document.querySelector('#lista-de-numeros ul'),
    listaDeNumerosSorteados = document.querySelector('#lista-de-numeros-sorteados ul'),
    botaoSortear = document.querySelector('button'),
    painelDeSequencias = document.querySelector('#sequencias-numericas'),
    painelNumeroAtual = document.querySelector('#painel-numero-atual'),
    elementoTentativaAtual = document.querySelector('#tentativa-atual'),
    painelSequenciasVencedoras = document.querySelector('#painel-sequencias-vencedoras'),
    sorteio = new Raffle();

  let interval,
    listaDeSequencias = [],
    listaDeSequenciasVencedoras = [],
    sorteioEvento;

  sorteioEvento = {
    sairamTodosOsNumeros: (nomeDaSequenciaVencedora) => {
      listaDeSequenciasVencedoras.push(nomeDaSequenciaVencedora);

      clearInterval(interval);

      inserirNomesDasSequeciasVencedorasNoPainel(listaDeSequenciasVencedoras.toString());
      desbloquearBotaoSortear();
    }
  };

  const criarElementoDOMLIDoNumeroPassado = (numero) => {
    const itemNumero = document.createElement('LI');

    itemNumero.innerHTML = numero;
    itemNumero.setAttribute('id', `numero-${numero}`);

    return itemNumero;
  };

  const carregarSequenciasNumericas = (totalDeSequencias, totalDeNumerosPorSequencia) => {
    totalDeSequencias = totalDeSequencias || 6;
    totalDeNumerosPorSequencia = totalDeNumerosPorSequencia || 6;

    let listas = [];

    painelDeSequencias.innerHTML = '';
    listaDeSequencias = [];

    for (let i = 0; i < totalDeSequencias; i++)
      listas[i] = sorteio.sortearSequenciaNumerica(totalDeNumerosPorSequencia);

    for (let i = 0; i < listas.length; i++) {
      const opcoes = {
        listaDeNumeros: listas[i],
        nome: `sequencia-${i}`,
        evento: sorteioEvento
      };

      listaDeSequencias[i] = new Sequencia(painelDeSequencias, opcoes);
    }
  };

  const informarSequencias = (numeroAtualSorteado) => {
    for (let listaDeSequencia of listaDeSequencias) {
      listaDeSequencia.notificarSequencia({
        numeroAtualSorteado: numeroAtualSorteado
      });
    }
  };

  const carregarListaDeNumeros = (elemento, _arrayDeNumeros) => {
    let arrayDeNumeros = _arrayDeNumeros;
    elemento.innerHTML = '';

    for (let numero of arrayDeNumeros) {
      elemento.appendChild(criarElementoDOMLIDoNumeroPassado(numero));
    }
  };

  const bloquearBotaoSortear = () => {
    botaoSortear.classList.add('botao-bloqueado');
    botaoSortear.setAttribute('disable', true);
    botaoSortear.textContent = 'SORTEANDO...';
    botaoSortear.removeEventListener('click', iniciaSorteio);
  };

  const desbloquearBotaoSortear = () => {
    botaoSortear.classList.remove('botao-bloqueado');
    botaoSortear.removeAttribute('disable');
    botaoSortear.textContent = 'Iniciar sorteio';

    botaoSortear.removeEventListener('click', reiniciarSorteio);
    botaoSortear.addEventListener('click', reiniciarSorteio);
  };

  const reiniciarSorteio = () => {
    prepararNovoSorteio();
    iniciaSorteio();
  };

  const inserirNumeroAtualSorteadoNoPainel = (numeroAtual) =>
    painelNumeroAtual.innerHTML = numeroAtual;

  const inserirNomesDasSequeciasVencedorasNoPainel = (nomesDasSequenciasVencedoras) =>
    painelSequenciasVencedoras.innerHTML = nomesDasSequenciasVencedoras;

  const inserirNumeroDeTentativasNoPainel = (numeroDeTentativas) =>
    elementoTentativaAtual.innerHTML = numeroDeTentativas;

  const marcarNumeroSorteado = (numero) => {
    const elementoNumeroAtualSorteado = document.querySelector(`#numero-${numero}`);
    elementoNumeroAtualSorteado.classList.add('numero-sorteado');
  };

  const adicionarNumeroNaListaDeNumerosSorteados = (numero) =>
    listaDeNumerosSorteados.appendChild(criarElementoDOMLIDoNumeroPassado(numero));

  const limparListaDeNumerosSorteados = () => listaDeNumerosSorteados.innerHTML = '';

  const zerarSequenciaVencedora = () => {
    listaDeSequenciasVencedoras = [];
    painelSequenciasVencedoras.innerHTML = '';
  };

  const prepararNovoSorteio = () => {
    sorteio.reiniciarSorteio();

    const itensDalistaDeNumeros = listaDeNumerosParaSorteio.querySelectorAll('li');

    for (let i in itensDalistaDeNumeros)
      if (itensDalistaDeNumeros.hasOwnProperty(i))
        itensDalistaDeNumeros[i].classList.remove('numero-sorteado');

    carregarSequenciasNumericas();
    limparListaDeNumerosSorteados();
    zerarSequenciaVencedora();
  };

  const iniciaSorteio = () => {
    bloquearBotaoSortear();

    interval = setInterval(() => {
      sorteio.sortear();

      let numero = sorteio.retornarNumeroSorteado();

      adicionarNumeroNaListaDeNumerosSorteados(numero);
      marcarNumeroSorteado(numero);
      inserirNumeroDeTentativasNoPainel(sorteio.retornarNumeroDaTentativaAtual());
      inserirNumeroAtualSorteadoNoPainel(numero);
      informarSequencias(numero);
    }, 250);
  }

  botaoSortear.addEventListener('click', iniciaSorteio);

  carregarSequenciasNumericas();
  carregarListaDeNumeros(listaDeNumerosParaSorteio, sorteio.retornarArrayDeNumerosParaSorteio());
}());

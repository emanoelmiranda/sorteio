const Sequencia = function (elemento, opcoes) {
  opcoes = opcoes || {
    nome: '',
    listaDeNumeros: [],
    evento: {
      sairamTodosOsNumeros: () => console.log('Foi tudo!!!')
    }
  };

  const that = this,
    sequenciaPainel = document.createElement('DIV'),
    componenteTitulo = document.createElement('H4'),
    componenteLista = document.createElement('UL');

  let totalDeNumerosSorteados = 0;

  const adicionarItensNaLista = (_listaDeNumeros) => {
    for (let _lista of _listaDeNumeros) {
      const elementoNumeroDaSequencia = document.createElement('LI');

      elementoNumeroDaSequencia.setAttribute('data-value', _lista);
      elementoNumeroDaSequencia.innerHTML = _lista;
      componenteLista.appendChild(elementoNumeroDaSequencia);
    }
  };

  const adicionarSequenciaNoElemento = (_elemento) => {
    sequenciaPainel.appendChild(componenteTitulo);
    sequenciaPainel.appendChild(componenteLista);
    sequenciaPainel.setAttribute('id', opcoes.nome);

    componenteTitulo.innerHTML = opcoes.nome;

    _elemento.appendChild(sequenciaPainel);
  };

  this.notificarSequencia = (notificacao) => {
    notificacao = notificacao || {numeroAtualSorteado: null};

    const numerosSorteado = sequenciaPainel.querySelector(`[data-value="${notificacao.numeroAtualSorteado}"]`);

    if (numerosSorteado !== null) {
      numerosSorteado.classList.add('numero-sorteado');
      totalDeNumerosSorteados++;
    }

    if (totalDeNumerosSorteados === 6) {
      opcoes.evento.sairamTodosOsNumeros(opcoes.nome);
      sequenciaPainel.classList.add('sequencia-vencedora');
    }
  };

  const init = (opcoes, elemento) => {
    adicionarSequenciaNoElemento(elemento);
    adicionarItensNaLista(opcoes.listaDeNumeros);

    return that;
  };

  return init(opcoes, elemento);
};

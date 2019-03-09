var Sequencia = function (elemento, opcoes) {
    /**
     * Configuração padrão.
     */
    opcoes = opcoes || {
        nome: '',
        listaDeNumeros: [],
        evento: {
            sairamTodosOsNumeros: function () {
                console.log('Foi tudo!!!')
            }
        }
    };

    var that = this,
        totalDeNumerosSorteados = 0,
        sequenciaPainel = document.createElement('DIV'),
        componenteTitulo = document.createElement('DIV'),
        componenteCorpo = document.createElement('DIV');

    /**
     * Adicionar número da interface gráfica (html)
     *
     * @param array lista array de números a serem renderizados
     * @param return void
     */
    function adicionarItensNaLista(lista) {
        for (var i = 0; i < lista.length; i++) {
            var elementoNumeroDaSequencia = document.createElement('SPAN');

            elementoNumeroDaSequencia.setAttribute('data-value', lista[i]);
            elementoNumeroDaSequencia.innerHTML = lista[i];
            componenteCorpo.appendChild(elementoNumeroDaSequencia);
        }
    };

    function adicionarSequenciaNoElemento(_elemento) {
        sequenciaPainel.appendChild(componenteTitulo)
        sequenciaPainel.appendChild(componenteCorpo);
        sequenciaPainel.setAttribute('id', opcoes.nome);

        componenteTitulo.innerHTML = opcoes.nome;

        _elemento.appendChild(sequenciaPainel);
    };

    /**
     * Método recebe a notificação do sorteio informando
     * último número sorteado.
     */
    this.notificarSequencia = function (notificacao) {
        notificacao = notificacao || {numeroAtualSorteado: null};

        var numerosSorteado = sequenciaPainel.querySelector('[data-value="' + notificacao.numeroAtualSorteado + '"]');

        if (numerosSorteado !== null) {
            numerosSorteado.classList.add('numero-sorteado');
            totalDeNumerosSorteados++;
        }

        if (totalDeNumerosSorteados === 6) {
            opcoes.evento.sairamTodosOsNumeros(opcoes.nome);
        }
    };

    /**
     * Inicializa a sequência.
     *
     * @param Object opcoes objeto literal com configurações do objeto.
     * @param elemento elemnto html para ser manipulado
     */
    var init = function (opcoes, elemento) {
        adicionarSequenciaNoElemento(elemento);
        adicionarItensNaLista(opcoes.listaDeNumeros);

        return that;
    };

    return init(opcoes, elemento);
};
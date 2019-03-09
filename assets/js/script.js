/**
 * Está função prepara o sorteio em geral.
 */
;(function () {
    var interval,
        listaDeNumerosParaSorteio = document.querySelector('#lista-de-numeros ul'),
        listaDeNumerosSorteados = document.querySelector('#lista-de-numeros-sorteados ul'),
        botaoSortear = document.querySelector('button'),
        sorteio = new Sorteio(),
        painelDeSequencias = document.querySelector('#sequencias-numericas'),
        painelNumeroAtual = document.querySelector('#painel-numero-atual'),
        elementoTentativaAtual = document.querySelector('#tentativa-atual'),
        painelSequenciasVencedoras = document.querySelector('#painel-sequencias-vencedoras'),
        listaDeSequencias = [],
        listaDeSequenciasVencedoras = [],
        botaoPrepararNovoSorteio = document.querySelector('.preparar-novo-sorteio'),
        sorteioEvento;

    sorteioEvento = {
        sairamTodosOsNumeros: function (nomeDaSequenciaVencedora) {
            listaDeSequenciasVencedoras.push(nomeDaSequenciaVencedora);

            clearInterval(interval);

            inserirNomesDasSequeciasVencedorasNoPainel(listaDeSequenciasVencedoras.toString())
            desbloquearBotaoSortear();
        }
    };

    /**
     * Criar um elemento DOM LI com o número atual passado.
     *
     * @param int numero
     * @return DOMElement retorna uma LI
     */
    function criarElementoDOMLIDoNumeroPassado(numero) {
        var itemNumero = document.createElement('LI')

        itemNumero.innerHTML = numero;
        itemNumero.setAttribute('id', 'numero-' + numero);

        return itemNumero;
    };

    /**
     * Carrega sequências númericas a serem sorteadas.
     *
     * @param int totalDeSequencia
     * @param int totalDeNumerosPorSequencia
     * @return void
     */
    function carregarSequenciasNumericas(totalDeSequencias, totalDeNumerosPorSequencia) {
        totalDeSequencias = totalDeSequencias || 6;
        totalDeNumerosPorSequencia = totalDeNumerosPorSequencia || 6;

        var listas = [];

        painelDeSequencias.innerHTML = '';
        listaDeSequencias = [];

        for (var i = 0; i < totalDeSequencias; i++) {
            listas[i] = sorteio.sortearSequenciaNumerica(totalDeNumerosPorSequencia);
        }

        for (var i = 0; i < listas.length; i++) {
            var opcoes = {
                listaDeNumeros: listas[i],
                nome: 'sequencia-' + i,
                evento: sorteioEvento
            };

            listaDeSequencias[i] = new Sequencia(painelDeSequencias, opcoes);
        }
    }

    /**
     * Informa as sequencias númericas os números sorteados.
     *
     * @param numeroArualSorteado int número atual sorteado
     */
    function informarSequencias(numeroAtualSorteado) {
        for (var i = 0; i < listaDeSequencias.length; i++) {
            listaDeSequencias[i].notificarSequencia({
                numeroAtualSorteado: numeroAtualSorteado
            });
        }
    }

    /**
     * Prepara o painel dos possíveis números a serem sorteados.
     *
     * @param elemento
     */
    function carregarListaDeNumeros(elemento, _arrayDeNumeros) {
        var arrayDeNumeros = _arrayDeNumeros;
        elemento.innerHTML = '';

        for (var i = 0; i < arrayDeNumeros.length; i++) {
            elemento.appendChild(criarElementoDOMLIDoNumeroPassado(arrayDeNumeros[i]));
        }
    }

    /**
     * Bloqueia o botão de sorteio.
     *
     * @return void
     */
    function bloquearBotaoSortear() {
        botaoSortear.classList.add('botao-bloqueado');
        botaoSortear.setAttribute('disable', true);
        botaoSortear.textContent = 'Sorteando...';
        botaoSortear.removeEventListener('click', iniciaSorteio);
    }

    /**
     * Desbloqueia o botão de sorteio
     *
     * @return void
     */
    function desbloquearBotaoSortear() {
        botaoSortear.classList.remove('botao-bloqueado');
        botaoSortear.removeAttribute('disable');
        botaoSortear.textContent = 'Iniciar sorteio';

        botaoSortear.removeEventListener('click', reiniciarSorteio);
        botaoSortear.addEventListener('click', reiniciarSorteio);
    }

    /**
     * Prepara um novo sorteio
     *
     * @return void
     */
    function reiniciarSorteio() {
        prepararNovoSorteio();
        iniciaSorteio();
    }

    /**
     * Insere o número atual sorteado no painel.
     *
     * @param int numeroAtual Número atual sorteado.
     * @return void
     */
    function inserirNumeroAtualSorteadoNoPainel(numeroAtual) {
        painelNumeroAtual.innerHTML = numeroAtual;
    }

    /**
     * Insere os nomes das sequências vencedoras no painel
     *
     * @param String nomesDasSequenciasVencedoras das sequências vencedoras
     * @return void
     */
    function inserirNomesDasSequeciasVencedorasNoPainel(nomesDasSequenciasVencedoras) {
        painelSequenciasVencedoras.innerHTML = nomesDasSequenciasVencedoras;
    }

    /**
     * Insere o número de tentativas no painel.
     *
     * @param int numeroDeTentativas Número de tentativas.
     * @return void
     */
    function inserirNumeroDeTentativasNoPainel(numeroDeTentativas) {
        elementoTentativaAtual.innerHTML = numeroDeTentativas;
    }

    /**
     * Marca o número atual sorteado no painel dos possíveis números a serem sorteados.
     *
     * @param int numero Número atual sorteado
     * @return void
     */
    function marcarNumeroSorteado(numero) {
        var elementoNumeroAtualSorteado = document.querySelector('#numero-' + numero);
        elementoNumeroAtualSorteado.classList.add('numero-sorteado');
    }

    /**
     * Adicionar número atual à lista de números sorteados.
     *
     * @param int numero Número atual sorteado.
     * @return void
     */
    function adicionarNumeroNaListaDeNumerosSorteados(numero) {
        listaDeNumerosSorteados.appendChild(criarElementoDOMLIDoNumeroPassado(numero));
    }

    /**
     * Limpa de lista de números sorteados.
     *
     * @return void
     */
    function limparListaDeNumerosSorteados() {
        listaDeNumerosSorteados.innerHTML = '';
    }

    /**
     * Reinicia array com nome das sequencias vencedoras.
     *
     * @return void
     */
    function zerarSequenciaVencedora() {
        listaDeSequenciasVencedoras = [];
        painelSequenciasVencedoras.innerHTML = '';
    };

    /**
     *
     */
    function prepararNovoSorteio() {
        sorteio.reiniciarSorteio();

        var itensDalistaDeNumeros = listaDeNumerosParaSorteio.querySelectorAll('li');

        for (var i in itensDalistaDeNumeros) {
            if (itensDalistaDeNumeros.hasOwnProperty(i)) {
                itensDalistaDeNumeros[i].classList.remove('numero-sorteado');
            }
        }

        carregarSequenciasNumericas();
        limparListaDeNumerosSorteados();
        zerarSequenciaVencedora();
    }

    /**
     * Inicializa sorteio de sequencias numéricas.
     *
     * @return void
     */
    function iniciaSorteio() {
        var tentativa = 1;

        bloquearBotaoSortear();

        interval = setInterval(function () {
            sorteio.sortear();

            var numero = sorteio.retornarNumeroSorteado();

            adicionarNumeroNaListaDeNumerosSorteados(numero)
            marcarNumeroSorteado(numero);
            inserirNumeroDeTentativasNoPainel(sorteio.retornarNumeroDaTentativaAtual())
            inserirNumeroAtualSorteadoNoPainel(numero);
            informarSequencias(numero);
        }, 250);
    }

    botaoSortear.addEventListener('click', iniciaSorteio);

    carregarSequenciasNumericas();
    carregarListaDeNumeros(listaDeNumerosParaSorteio, sorteio.retornarArrayDeNumerosParaSorteio());
}());
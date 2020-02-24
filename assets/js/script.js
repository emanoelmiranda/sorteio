;(function () {
    const
        listaDeNumerosParaSorteio = document.querySelector('#lista-de-numeros ul'),
        listaDeNumerosSorteados = document.querySelector('#lista-de-numeros-sorteados ul'),
        botaoSortear = document.querySelector('button'),
        painelDeSequencias = document.querySelector('#sequencias-numericas'),
        painelNumeroAtual = document.querySelector('#painel-numero-atual'),
        elementoTentativaAtual = document.querySelector('#tentativa-atual'),
        painelSequenciasVencedoras = document.querySelector('#painel-sequencias-vencedoras'),
        sorteio = new Sorteio();

    let interval,
        listaDeSequencias = [],
        listaDeSequenciasVencedoras = [],
        sorteioEvento;

    sorteioEvento = {
        sairamTodosOsNumeros: function (nomeDaSequenciaVencedora) {
            listaDeSequenciasVencedoras.push(nomeDaSequenciaVencedora);

            clearInterval(interval);

            inserirNomesDasSequeciasVencedorasNoPainel(listaDeSequenciasVencedoras.toString());
            desbloquearBotaoSortear();
        }
    };

    function criarElementoDOMLIDoNumeroPassado(numero) {
        const itemNumero = document.createElement('LI');

        itemNumero.innerHTML = numero;
        itemNumero.setAttribute('id', `numero-${numero}`);

        return itemNumero;
    };

    function carregarSequenciasNumericas(totalDeSequencias, totalDeNumerosPorSequencia) {
        totalDeSequencias = totalDeSequencias || 6;
        totalDeNumerosPorSequencia = totalDeNumerosPorSequencia || 6;

        let listas = [];

        painelDeSequencias.innerHTML = '';
        listaDeSequencias = [];

        for (let i = 0; i < totalDeSequencias; i++) {
            listas[i] = sorteio.sortearSequenciaNumerica(totalDeNumerosPorSequencia);
        }

        for (let i = 0; i < listas.length; i++) {
            const opcoes = {
                listaDeNumeros: listas[i],
                nome: `sequencia-${i}`,
                evento: sorteioEvento
            };

            listaDeSequencias[i] = new Sequencia(painelDeSequencias, opcoes);
        }
    }

    function informarSequencias(numeroAtualSorteado) {
        for (let listaDeSequencia of listaDeSequencias) {
            listaDeSequencia.notificarSequencia({
                numeroAtualSorteado: numeroAtualSorteado
            });
        }
    }

    function carregarListaDeNumeros(elemento, _arrayDeNumeros) {
        let arrayDeNumeros = _arrayDeNumeros;
        elemento.innerHTML = '';

        for (let numero of arrayDeNumeros) {
            elemento.appendChild(criarElementoDOMLIDoNumeroPassado(numero));
        }
    }

    function bloquearBotaoSortear() {
        botaoSortear.classList.add('botao-bloqueado');
        botaoSortear.setAttribute('disable', true);
        botaoSortear.textContent = 'Sorteando...';
        botaoSortear.removeEventListener('click', iniciaSorteio);
    }

    function desbloquearBotaoSortear() {
        botaoSortear.classList.remove('botao-bloqueado');
        botaoSortear.removeAttribute('disable');
        botaoSortear.textContent = 'Iniciar sorteio';

        botaoSortear.removeEventListener('click', reiniciarSorteio);
        botaoSortear.addEventListener('click', reiniciarSorteio);
    }

    function reiniciarSorteio() {
        prepararNovoSorteio();
        iniciaSorteio();
    }

    function inserirNumeroAtualSorteadoNoPainel(numeroAtual) {
        painelNumeroAtual.innerHTML = numeroAtual;
    }

    function inserirNomesDasSequeciasVencedorasNoPainel(nomesDasSequenciasVencedoras) {
        painelSequenciasVencedoras.innerHTML = nomesDasSequenciasVencedoras;
    }

    function inserirNumeroDeTentativasNoPainel(numeroDeTentativas) {
        elementoTentativaAtual.innerHTML = numeroDeTentativas;
    }

    function marcarNumeroSorteado(numero) {
        const elementoNumeroAtualSorteado = document.querySelector(`#numero-${numero}`);
        elementoNumeroAtualSorteado.classList.add('numero-sorteado');
    }

    function adicionarNumeroNaListaDeNumerosSorteados(numero) {
        listaDeNumerosSorteados.appendChild(criarElementoDOMLIDoNumeroPassado(numero));
    }

    function limparListaDeNumerosSorteados() {
        listaDeNumerosSorteados.innerHTML = '';
    }

    function zerarSequenciaVencedora() {
        listaDeSequenciasVencedoras = [];
        painelSequenciasVencedoras.innerHTML = '';
    };

    function prepararNovoSorteio() {
        sorteio.reiniciarSorteio();

        const itensDalistaDeNumeros = listaDeNumerosParaSorteio.querySelectorAll('li');

        for (let i in itensDalistaDeNumeros) {
            if (itensDalistaDeNumeros.hasOwnProperty(i)) {
                itensDalistaDeNumeros[i].classList.remove('numero-sorteado');
            }
        }

        carregarSequenciasNumericas();
        limparListaDeNumerosSorteados();
        zerarSequenciaVencedora();
    }

    function iniciaSorteio() {
        bloquearBotaoSortear();

        interval = setInterval(function () {
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

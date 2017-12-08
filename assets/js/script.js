var interval,
		listaDeNumerosParaSorteio		= document.querySelector('#lista-de-numeros ul'),
		listaDeNumerosSorteados 		= document.querySelector('#lista-de-numeros-sorteados ul'),
		botaoSortear 								= document.querySelector('button'),
		sorteio 										= new Sorteio(),
		painelDeSequencias					= document.querySelector('#sequencias-numericas'),
		listaDeSequencias						= [],
		listaDeSequenciasVencedoras = [],
		sorteioEvento;

sorteioEvento	= {
	sairamTodosOsNumeros: function (nomeDaSequenciaVencedora) {
			listaDeSequenciasVencedoras.push(nomeDaSequenciaVencedora);
			
			clearInterval(interval);

			var painelNumeroAtual = document.querySelector('#painel-sequencias-vencedoras');

			painelNumeroAtual.innerHTML = listaDeSequenciasVencedoras.toString();
	}
};

var adicionarNumeroNaListaDeNumerosSorteados = function (numero) {
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
var carregarSequenciasNumericas = function (totalDeSequencias, totalDeNumerosPorSequencia) {
	totalDeSequencias = totalDeSequencias || 6;
	totalDeNumerosPorSequencia = totalDeNumerosPorSequencia || 6;

	var listas = [];

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
};

/**
 * Informa as sequencias númericas os números sorteados.
 *
 * @param numeroArualSorteado int número atual sorteado
 */
var informarSequencias = function (numeroAtualSorteado) {
		for (var i = 0; i < listaDeSequencias.length; i++) {
			listaDeSequencias[i].notificarSequencia({
				numeroAtualSorteado: numeroAtualSorteado
			});
		}
};

var carregarListaDeNumeros = function (element, _arrayDeNumeros) {
	var arrayDeNumeros = _arrayDeNumeros;
	element.innerHTML  = '';

	for (var i = 0; i < arrayDeNumeros.length; i++) {
		element.appendChild(adicionarNumeroNaListaDeNumerosSorteados(arrayDeNumeros[i]));
	}
};

/**
 * Inicializa sorteio de sequencias numéricas.
 */
var iniciaSorteio = function () {
		var tentativa = 1;

		interval = setInterval(function () {
			sorteio.sortear();
			
			var numero = sorteio.retornarNumeroSorteado();

			listaDeNumerosSorteados.appendChild(adicionarNumeroNaListaDeNumerosSorteados(numero));

			var elementoNumeroAtualSorteado  = document.querySelector('#numero-' + numero);
			var elementoTentativaAtual 			 = document.querySelector('#tentativa-atual');
			var painelNumeroAtual 					 = document.querySelector('#painel-numero-atual');

			elementoNumeroAtualSorteado.classList.add('numero-sorteado');
			elementoTentativaAtual.innerHTML = sorteio.retornarNumeroDaTentativaAtual();
			painelNumeroAtual.innerHTML 		 = numero;

			informarSequencias(numero);
		}, 250);
};

botaoSortear.addEventListener('click', iniciaSorteio);

carregarSequenciasNumericas();
carregarListaDeNumeros(listaDeNumerosParaSorteio, sorteio.retornarArrayDeNumerosParaSorteio());
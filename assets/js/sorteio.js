
/**
 * Função com implementação de sorteio de números aleatoriamente.
 *
 * @param int totalDeNumeros quantidade de números possíveis a serem sorteados.
 * @param int quantidadeDeNumeros quantidade de números para fim de sorteio.
 * @return this
 */
var Sorteio = function (totalDeNumeros, quantidaDeNumeros) {
	quantidaDeNumeros 	= quantidaDeNumeros || 6;
	totalDeNumeros 		= totalDeNumeros || 60;

	var arrayDeNumeros 	= [],
		that 			= this,
		arrayDeNumerosSorteados = [],
		_carregarArrayNumeros;

	/**
	 * Carrega todos os possíveis números
	 * a serem sorteados.
	 *
	 * @return this 
	 */
	_carregarArrayNumeros = function () {
		for (var i = 0; i < totalDeNumeros; i++) {
			arrayDeNumeros[i] = {
				valor: i + 1,
				sorteado: false
			};
		}

		return that;
	};

	/**
	 * Retorna array de números possíveis para sorteio.
	 *
	 * @return array
	 */
	this.retornarArrayDeNumerosParaSorteio = function () {
		var listaDeNumeros = [];

		for (var i = 0; i < arrayDeNumeros.length; i++) {
			listaDeNumeros[i] = arrayDeNumeros[i].valor;
		}

		return listaDeNumeros;
	};

	/**
	 * Retorna array de números sorteados.
	 *
	 * @return array
	 */
	this.retornarArrayDeNumerosSorteados = function () {
		return arrayDeNumerosSorteados;
	};

	/**
	 * Realiza o sorteio dos números.
	 *
	 * @return void 
	 */
	this.sortear = function () {
		var numeroDeTentativas = 0;

		while (numeroDeTentativas < quantidaDeNumeros) {
			var chaveParaSortearNumero = Math.floor(Math.random() * 100);
		
			if (chaveParaSortearNumero >= 0 && chaveParaSortearNumero < totalDeNumeros) {
				var numeroSorteado = arrayDeNumeros[chaveParaSortearNumero];

				if (numeroSorteado.sorteado === false) {
					arrayDeNumerosSorteados[numeroDeTentativas] = numeroSorteado.valor;
					arrayDeNumeros[chaveParaSortearNumero].sorteado = true;
					numeroDeTentativas++;
				}
			}
		}
	}

	return _carregarArrayNumeros();	
};
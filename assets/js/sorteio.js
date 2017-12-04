/**
 * Função com implementação de sorteio de números aleatoriamente.
 *
 * @param int totalDeNumeros quantidade de números possíveis a serem sorteados.
 * @param int quantidadeDeNumeros quantidade de números para fim de sorteio.
 * @return this
 */
var Sorteio = function (totalDeNumeros, quantidaDeNumeros) {
	quantidaDeNumeros  				= quantidaDeNumeros || 6;
	totalDeNumeros 		 				= totalDeNumeros || 60;

	var arrayDeNumeros 				= [],
		that 										= this,
		numeroDeTentativas 			= 0,
		arrayDeNumerosSorteados = [],
		numeroAtualSorteado,
		carregarArrayNumeros,
		algoritmoRandomico

	/**
	 * Carrega todos os possíveis números
	 * a serem sorteados.
	 *
	 * @return this 
	 */
	carregarArrayNumeros = function () {
		for (var i = 0; i < totalDeNumeros; i++) {
			arrayDeNumeros[i] = {
				valor: i + 1,
				sorteado: false
			};
		}

		return that;
	};

	/**
	 * Retorna número gerado aleatoriamente de duas casas decimais.
	 *
	 * @return int
	 */
	algoritmoRandomico = function () {
		return Math.floor(Math.random() * 100);
	}

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
		var chaveParaSortearNumero = algoritmoRandomico();

		if (chaveParaSortearNumero >= 0 && chaveParaSortearNumero < totalDeNumeros) {
			var numeroSorteado = arrayDeNumeros[chaveParaSortearNumero];

			if (numeroSorteado.sorteado === false) {
				arrayDeNumerosSorteados[numeroDeTentativas] = numeroSorteado.valor;
				arrayDeNumeros[chaveParaSortearNumero].sorteado = true;
				numeroDeTentativas++;
			} else {
				that.sortear();	
			}
		} else {
			that.sortear();
		}
	};

	/**
	 * Reinicializa o sorteio.
	 *
	 * @return void
	 */
	this.reiniciarSorteio = function () {
		arrayDeNumerosSorteados = [];
		numeroDeTentativas = [];
	}

	/**
	 * Retona número da tentativa atual do sorteio
	 *
	 * @return int
	 */
	this.retornarNumeroDaTentativaAtual = function () {
		return numeroDeTentativas;
	}

	/**
	 * Retona número sorteado da pela tentativa passada.
	 *
	 * @param int numeroDaTentativa
	 * @return int
	 */
	this.retornarNumeroSorteado = function (numeroDaTentativa) {
		numeroDaTentativa = numeroDaTentativa || that.retornarNumeroDaTentativaAtual();

		return arrayDeNumerosSorteados[numeroDaTentativa - 1];
	}

	this.sortearSequencia = function () {
		var sequencia = [],
				_chaveParaSortearNumero = algoritmoRandomico();

		if (_chaveParaSortearNumero >= 0 && _chaveParaSortearNumero < totalDeNumeros) {
			var _numeroSorteado = _arrayDeNumeros[_chaveParaSortearNumero];

			if (numeroSorteado.sorteado === false) {
				arrayDeNumerosSorteados[numeroDeTentativas] = numeroSorteado.valor;
				arrayDeNumeros[chaveParaSortearNumero].sorteado = true;
				numeroDeTentativas++;
			} else {
				that.sortear();	
			}
		} else {
			that.sortear();
		}		
	}

	return carregarArrayNumeros();	
};
;(function (_document) {

	var listaDeNumerosParaSorteio = _document.querySelector('#lista-de-numeros ul'),
		listaDeNumerosSorteados = _document.querySelector('#lista-de-numeros-sorteados ul'),
		botaoSortear = _document.querySelector('button'),
		sorteio = new Sorteio();

		sorteio.sortear();

	var carregarListaDeNumeros = function (element, _arrayDeNumeros) {
		var arrayDeNumeros = _arrayDeNumeros;

		element.innerHTML = '';

		for (var i = 0; i < arrayDeNumeros.length; i++) {
			var itemNumero = document.createElement('LI')

			itemNumero.innerHTML = arrayDeNumeros[i];
			itemNumero.setAttribute('id', 'numero-' + i);

			element.appendChild(itemNumero);
		}
	}

	carregarListaDeNumeros(
		listaDeNumerosParaSorteio, 
		sorteio.retornarArrayDeNumerosParaSorteio()
	);

	carregarListaDeNumeros(
		listaDeNumerosSorteados, 
		sorteio.retornarArrayDeNumerosSorteados()
	);

	botaoSortear.addEventListener('click', function () {
		document.location = document.location;
	});

}(document));
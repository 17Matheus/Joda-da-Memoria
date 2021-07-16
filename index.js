(function(){
	//array que armazenará os objetos com src e id de 1 a 8
	var images = [];
	
	//-->array que armazena as cartas viradas
	var flippedCards = [];
	
	//estrutura de atribiução das imagens aos card
	for(var i = 0; i < 16; i++){
		//cria um objeto img com um src e um id
		var img = {
			src: "image/" + i + ".png",
			id: i%8
		};
		
		//inserer o objeto criado no array
		images.push(img);
	}
	
	//chama a função de inicialização do jogo
	startGame();
	
	function startGame(){
		//-->zera o array de cartas viradas
		flippedCards = [];
		
		//embaralhamento do array de imagens
		images = randomSort(images);
	
		//lista de elementos div com as classes front
		var frontFaces = document.getElementsByClassName("front");
	
		for(var i = 0; i < 16; i++){
			var card = document.querySelector("#card" + i);
			card.style.left = i % 8 === 0 ? 5 + "px" : i % 8 * 165 + 5 + "px";
			card.style.top = i < 8 ? 5 + "px" : 250 + "px";
			
			card.addEventListener("click",flipCard,false);
			
			//adiciona as imagense IDs às cartas
			frontFaces[i].style.background = "url('"+images[i].src+"')";
			frontFaces[i].setAttribute("id",images[i].id);
		}
	}
	
	//função que embaralha as cartas recebendo um array por parâmetro
	function randomSort(oldArray){
		//cria um array vazio
		var newArray = [];
		
		//executa o bloco de comandos enquanto o novo array não atingir o mesmo número de elementos do array passado por parâmetro
		while(newArray.length !== oldArray.length){
			//cria uma variável i recebendo um número aleatório entre 0 e o número de elementos do array -1
			var i = Math.floor(Math.random()*16);
			
			
			//verifica se o elemento indicado pelo índice i já existe no novo array
			if(newArray.indexOf(oldArray[i]) < 0){
				//caso o elemento não exista, ele é inserido
				newArray.push(oldArray[i]);
			}
		}
		
		//retorna o array novo, que agora possui todos os elementos do original porém organizados aleatóriamente
		return newArray;
		
	}
	
	function flipCard(){
		//-->verifica se o número de cartas clicadas é menor que 2
		if(flippedCards.length < 2){
			//pega as faces da carta clicada
			var faces = this.getElementsByClassName("face");
			
			//-->confere se a carta já está virada, verificando a quantidade de classes da face. O que imprede que a mesma carta seja virada duas vezes
			if(faces[0].classList.length > 2){
				return;
			}

			//adiciona a classe fliped às faces da carta para que sejam viradas
			faces[0].classList.toggle("flipped");
			faces[1].classList.toggle("flipped");
			
			//-->adiciona a carta clicada ao array de cartas viradas
			flippedCards.push(this);
		} else {
			//-->em caso haver duas cartas no array de cartas viradas (terceiro click) remove a classe flipped das cartas no array de cartas viradas
			flippedCards[0].childNodes[1].classList.toggle("flipped");
			flippedCards[0].childNodes[3].classList.toggle("flipped");
			flippedCards[1].childNodes[1].classList.toggle("flipped");
			flippedCards[1].childNodes[3].classList.toggle("flipped");
			
			//-->limpa o array de cartas viradas
			flippedCards = [];
		}
	}
}());
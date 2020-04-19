var flipped = 0;
var canFlip = true;
var currentImage = '';
var currentId = '';
var score = 0;
var level = '';
var totalMatches = 12;
var success = 0;

function start(){
	let uniqueImages = ['bird.jpg', 
					'cat.jpg',
					'dog.jpg', 
					'elephant.jpg',
					'rabbit.jpg',
					'giraffe.jpg'];

	let sceneEasy = '';

	if(level != 'easy'){	
		uniqueImages.push('chameleon.jpg',
						'hamster.jpg', 
						'lioness.jpg',
						'rhinoceros.jpg',
						'ferret.jpg',
						'lizard.jpg');
	}else{
		totalMatches = 6;
		sceneEasy = ' scene-easy';
	}

	let images = uniqueImages.concat(uniqueImages);

	let count = images.length - 1;

	let random;

	while(count >= 0){
		random = Math.floor(Math.random() * count);

		document.getElementById('cards').innerHTML += 
		'<div class="scene'+sceneEasy+'">' +
			'<div class="card" onclick="flipCard(this)" data-image="'+images[random]+'" id="'+count+'">' +
				'<div class="card-face back">' +
					'<img src="images/paw.png"/>' +
				'</div>' +
				'<div class="front card-face">' +
					'<img src="images/'+images[random]+'"/>' +
				'</div>' +
			'</div>' +
		'</div>';

		images.splice(random, 1);

		count--;
	}
}

function play(){
	if (level == ''){
		alert('Selecione uma dificuldade!');
	}else{
		start();
    	document.getElementById('menu').style.display = 'none';
	}
}

function flipLevelCard(element){
 	let flippedOnes = document.getElementsByClassName('is-flipped');

	while (flippedOnes.length){
	    flippedOnes[0].classList.remove('is-flipped');
	}

 	element.classList.toggle('is-flipped');

 	level = element.getAttribute('id');
}

function flipCard(element){
	if(canFlip && !element.classList.contains('is-flipped')){
	 	element.classList.add('is-flipped');
	 	flipped++;

	 	if(flipped % 2 == 0){
	 		canFlip = false;
	 		let flippedOnes = document.getElementsByClassName('is-flipped');

	 		if(currentImage == element.getAttribute('data-image') && currentId != element.getAttribute('id')){
		 		setTimeout(function () {
		 			for (let i = flippedOnes.length - 1; i >= 0; i--) {
					    flippedOnes[i].classList.add('permanent-flipped');
					    flippedOnes[i].classList.remove('is-flipped');
		 			}
				    document.getElementById('score').innerHTML = score;
					canFlip = true;
			    }, 500);
				score += level != 'hard' ? 5 : 10;
				success++;
	 		}else{
				if (level == 'hard'){
					score -= 5;
				    document.getElementById('score').innerHTML = score;
				}
		 		setTimeout(function () {
					while (flippedOnes.length){
					    flippedOnes[0].classList.remove('is-flipped');
					}
					canFlip = true;
			    }, 2000);
	 		}

	 		if(totalMatches == success){
				document.getElementById('final-score').innerHTML = score;
	 			document.getElementById('game-over').style.display = 'flex';
	 		}
	 	}

	 	currentImage = element.getAttribute('data-image');
	 	currentId = element.getAttribute('id');
	}
}

function exit(){
	flipped = 0;
	canFlip = true;
	currentImage = '';
	currentId = '';
	score = 0;
	level = '';
	totalMatches = 12;
	success = 0;

 	let flippedOnes = document.getElementsByClassName('is-flipped');

	while (flippedOnes.length){
	    flippedOnes[0].classList.remove('is-flipped');
	}

    document.getElementById('menu').style.display = 'flex';
    document.getElementById('game-over').style.display = 'none';
	document.getElementById('cards').innerHTML = '';
}

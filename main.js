const $arenas = document.querySelector('.arenas');
const $buttonRandom = document.querySelector('.button');

const player1 = {
	player: 1,
	name: 'scorpion',
	hp: 100,
	img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
	weapon: [
		'sword',
		'nunchucks'
	],
	attack: function() {
		console.log(`${this.name} Fight...`);
	}
};

const player2 = {
	player: 2,
	name: 'sonya',
	hp: 100,
	img: 'http://reactmarathon-api.herokuapp.com/assets/sonya.gif',
	weapon: [
		'sword',
		'shild'
	],
	attack: function() {
		console.log(`${this.name} Fight...`);
	}
};

function createElement(tag, className) {
	const $element = document.createElement(tag);

	if (className) {
		$element.classList.add(className);
	}

	return $element;
}

function createPlayer(playerObj) {
	const $player = createElement('div', 'player' + playerObj.player);
	const $progressbar = createElement('div', 'progressbar');
	const $life = createElement('div', 'life');
	const $name = createElement('div', 'name');
	const $character = createElement('div', 'character');
	const $img = createElement('img');

	$life.style.width = `${playerObj.hp}%`;
	$name.innerText = playerObj.name;
	$img.src = playerObj.img;

	$progressbar.appendChild($life);
	$progressbar.appendChild($name);
	$character.appendChild($img);
	$player.appendChild($progressbar);
	$player.appendChild($character);

	return $player;
}

function getRandomNumber(min, max) {
	const range = Math.abs(max - min);

	return Math.round(Math.random() * range) + min;
}

function changeHP(player, damage) {
	player.hp -= damage;

	if (player.hp <= 0) {
		player.hp = 0;
	}

	$playerLife = document.querySelector('.player' + player.player + ' .life');
	$playerLife.style.width = `${player.hp}%`;
}

function getResult(player1, player2) {
	if (player1.hp === 0 && player2.hp === 0) {
		createResultTitle('tie');
		disableRandomButton();
	} else if (player1.hp === 0) {
		createResultTitle(`${player2.name} wins`);
		disableRandomButton();
	} else if (player2.hp === 0) {
		createResultTitle(`${player1.name} wins`);
		disableRandomButton();
	}
}

function createResultTitle(resultName) {
	const $resultTitle = createElement('div', 'resultTitle');
	$resultTitle.innerText = resultName;

	$arenas.appendChild($resultTitle);
}

function disableRandomButton() {
	$buttonRandom.disabled = true;
}

$buttonRandom.addEventListener('click', function() {
	changeHP(player1, getRandomNumber(0, 20));
	changeHP(player2, getRandomNumber(0, 20));

	getResult(player1, player2);
});

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));

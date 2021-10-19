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
	},
	changeHP: changeHP,
	elHP: elHP,
	renderHP: renderHP
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
	},
	changeHP: changeHP,
	elHP: elHP,
	renderHP: renderHP
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

function changeHP(damage) {
	this.hp -= damage;

	if (this.hp <= 0) {
		this.hp = 0;
	}
}

function elHP() {
	const $elemHP = document.querySelector(`.player${this.player} .life`);

	return $elemHP;
}

function renderHP() {
	this.elHP().style.width = `${this.hp}%`;
}

function createResultTitle(name) {
	const $resultTitle = createElement('div', 'resultTitle');

	if (name) {
		$resultTitle.innerText = `${name} wins`;
	} else {
		$resultTitle.innerText = 'draw'
	}

	$arenas.appendChild($resultTitle);
}

function disableRandomButton() {
	$buttonRandom.disabled = true;
}

$buttonRandom.addEventListener('click', function() {
	player1.changeHP(getRandomNumber(0, 20));
	player2.changeHP(getRandomNumber(0, 20));

	player1.renderHP();
	player2.renderHP();

	if (player1.hp === 0 || player2.hp === 0) {
		disableRandomButton();
	}

	if (player1.hp === 0 && player2.hp === 0) {
		createResultTitle();
	} else if (player1.hp === 0 && player1.hp < player2.hp) {
		createResultTitle(player2.name);
	} else if (player2.hp === 0 && player2.hp < player1.hp) {
		createResultTitle(player1.name);
	}
});

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));

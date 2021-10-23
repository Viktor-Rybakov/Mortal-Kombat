const $arenas = document.querySelector('.arenas');
const $formFight = document.forms.attack;
const $buttonFight = $formFight.querySelector('.button');

const HIT = {
	head: 30,
	body: 25,
	foot: 20,
}
const ATTACK = ['head', 'body', 'foot'];

const player1 = {
	player: 1,
	name: 'scorpion',
	hp: 100,
	img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
	weapon: [
		'sword',
		'nunchucks'
	],
	attack,
	changeHP,
	elHP,
	renderHP,
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
	attack,
	changeHP,
	elHP,
	renderHP,
};

function attack() {
	console.log(`${this.name} Fight...`);
}

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
	return document.querySelector(`.player${this.player} .life`);
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

	return $resultTitle;
}

function createReloadButton() {
	const $reloadButton = createElement('button', 'button');
	const $reloadButtonWrapper = createElement('div', 'reloadWrap');

	$reloadButton.setAttribute('type', 'button');
	$reloadButton.innerText = 'Restart';
	$reloadButton.addEventListener('click', function() {
		window.location.reload();
	});

	$reloadButtonWrapper.appendChild($reloadButton);

	return $reloadButtonWrapper;
}

function getComputerAttack() {
	const hit = ATTACK[getRandomNumber(0, 2)];
	const defence = ATTACK[getRandomNumber(0, 2)];

	return {
		value: getRandomNumber(0, HIT[hit]),
		hit,
		defence,
	}
}

function getPlayerAttack(form) {
	const playerAttack = {};

	for (let item of form) {
		if (item.checked && item.name === 'hit') {
			playerAttack.value = getRandomNumber(0, HIT[item.value]);
			playerAttack.hit = item.value;
		}
		if (item.checked && item.name === 'defence') {
			playerAttack.defence = item.value;
		}

		item.checked = false;
	}

	return playerAttack;
}

function playRound(enemyAttackObj, playerAttackObj) {
	if (playerAttackObj.defence !== enemyAttackObj.hit) {
		this.changeHP(enemyAttackObj.value);
		this.renderHP();
	}
}

$formFight.addEventListener('submit', function(event) {
	event.preventDefault();

	const computerAttack = getComputerAttack();
	const playerAttack = getPlayerAttack($formFight);

	playRound.call(player1, playerAttack, computerAttack);
	playRound.call(player2, computerAttack, playerAttack);

	if (player1.hp === 0 || player2.hp === 0) {
		$buttonFight.disabled = true;
		$arenas.appendChild(createReloadButton());
	}

	if (player1.hp === 0 && player2.hp === 0) {
		$arenas.appendChild(createResultTitle());
	} else if (player1.hp === 0 && player1.hp < player2.hp) {
		$arenas.appendChild(createResultTitle(player2.name));
	} else if (player2.hp === 0 && player2.hp < player1.hp) {
		$arenas.appendChild(createResultTitle(player1.name));
	}
});

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));

const $arenas = document.querySelector('.arenas');
const $formFight = document.forms.attack;
const $buttonFight = $formFight.querySelector('.button');
const $chat = document.querySelector('.chat');

const HIT = {
	head: 30,
	body: 25,
	foot: 20,
}
const ATTACK = ['head', 'body', 'foot'];

const LOGS = {
	start: 'Часы показывали [time], когда [player1] и [player2] бросили вызов друг другу.',
	end: [
			'Результат удара [playerWins]: [playerLose] - труп',
			'[playerLose] погиб от удара бойца [playerWins]',
			'Результат боя: [playerLose] - жертва, [playerWins] - убийца',
	],
	hit: [
			'[playerDefence] пытался сконцентрироваться, но [playerKick] разбежавшись раздробил копчиком левое ухо врага.',
			'[playerDefence] расстроился, как вдруг, неожиданно [playerKick] случайно раздробил грудью грудину противника.',
			'[playerDefence] зажмурился, а в это время [playerKick], прослезившись, раздробил кулаком пах оппонента.',
			'[playerDefence] чесал <вырезано цензурой>, и внезапно неустрашимый [playerKick] отчаянно размозжил грудью левый бицепс оппонента.',
			'[playerDefence] задумался, но внезапно [playerKick] случайно влепил грубый удар копчиком в пояс оппонента.',
			'[playerDefence] ковырялся в зубах, но [playerKick] проснувшись влепил тяжелый удар пальцем в кадык врага.',
			'[playerDefence] вспомнил что-то важное, но внезапно [playerKick] зевнув, размозжил открытой ладонью челюсть противника.',
			'[playerDefence] осмотрелся, и в это время [playerKick] мимоходом раздробил стопой аппендикс соперника.',
			'[playerDefence] кашлянул, но внезапно [playerKick] показав палец, размозжил пальцем грудь соперника.',
			'[playerDefence] пытался что-то сказать, а жестокий [playerKick] проснувшись размозжил копчиком левую ногу противника.',
			'[playerDefence] забылся, как внезапно безумный [playerKick] со скуки, влепил удар коленом в левый бок соперника.',
			'[playerDefence] поперхнулся, а за это [playerKick] мимоходом раздробил коленом висок врага.',
			'[playerDefence] расстроился, а в это время наглый [playerKick] пошатнувшись размозжил копчиком губы оппонента.',
			'[playerDefence] осмотрелся, но внезапно [playerKick] робко размозжил коленом левый глаз противника.',
			'[playerDefence] осмотрелся, а [playerKick] вломил дробящий удар плечом, пробив блок, куда обычно не бьют оппонента.',
			'[playerDefence] ковырялся в зубах, как вдруг, неожиданно [playerKick] отчаянно размозжил плечом мышцы пресса оппонента.',
			'[playerDefence] пришел в себя, и в это время [playerKick] провел разбивающий удар кистью руки, пробив блок, в голень противника.',
			'[playerDefence] пошатнулся, а в это время [playerKick] хихикая влепил грубый удар открытой ладонью по бедрам врага.',
	],
	defence: [
			'[playerKick] потерял момент и храбрый [playerDefence] отпрыгнул от удара открытой ладонью в ключицу.',
			'[playerKick] не контролировал ситуацию, и потому [playerDefence] поставил блок на удар пяткой в правую грудь.',
			'[playerKick] потерял момент и [playerDefence] поставил блок на удар коленом по селезенке.',
			'[playerKick] поскользнулся и задумчивый [playerDefence] поставил блок на тычок головой в бровь.',
			'[playerKick] старался провести удар, но непобедимый [playerDefence] ушел в сторону от удара копчиком прямо в пятку.',
			'[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.',
			'[playerKick] не думал о бое, потому расстроенный [playerDefence] отпрыгнул от удара кулаком куда обычно не бьют.',
			'[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.'
	],
	draw: 'Ничья - это тоже победа!'
};

const player1 = {
	player: 1,
	name: 'SCORPION',
	hp: 100,
	img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
	weapon: [
		'sword',
		'nunchucks'
	],
	changeHP,
	elHP,
	renderHP,
};

const player2 = {
	player: 2,
	name: 'SONIA',
	hp: 100,
	img: 'http://reactmarathon-api.herokuapp.com/assets/sonya.gif',
	weapon: [
		'sword',
		'shild'
	],
	changeHP,
	elHP,
	renderHP,
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

function getEnemyAttack() {
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

function getWinner(player1, player2) {
	if (player1.hp === 0 && player2.hp === 0) {
		generateLog('draw');
		return null;
	} else if (player1.hp === 0 && player1.hp < player2.hp) {
		generateLog('end', player2, player1);
		return player2.name;
	} else if (player2.hp === 0 && player2.hp < player1.hp) {
		generateLog('end', player1, player2);
		return player1.name;
	}
}

function makeKick(playerKick, playerDefence, playerKickAttack, playerDefenceAttack) {
	if (playerDefenceAttack.defence === playerKickAttack.hit) {
		generateLog('defence', playerKick, playerDefence);
	}

	if (playerDefenceAttack.defence !== playerKickAttack.hit) {
		playerDefence.changeHP(playerKickAttack.value);
		playerDefence.renderHP();
		generateLog('hit', playerKick, playerDefence, playerKickAttack.value);
	}
}

function generateLog(type, player1, player2, damage) {
	const date = new Date();
	const time = `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
	let text;
	let randomLogNumber;

	switch(type) {
		case 'start':
			text = LOGS[type].replace('[time]', time).replace('[player1]', player1.name).replace('[player2]', player2.name);
			$chat.insertAdjacentHTML('afterbegin', `<p>${text}</p>`);
			break;

		case 'end':
			randomLogNumber = getRandomNumber(0, LOGS[type].length - 1);
			text = LOGS[type][randomLogNumber].replace('[playerWins]', player1.name).replace('[playerLose]', player2.name);
			$chat.insertAdjacentHTML('afterbegin', `<p>${text}</p>`);
			break;

		case 'hit':
			randomLogNumber = getRandomNumber(0, LOGS[type].length - 1);
			text = LOGS[type][randomLogNumber].replace('[playerKick]', player1.name).replace('[playerDefence]', player2.name);
			$chat.insertAdjacentHTML('afterbegin', `<p>${time} - ${text} - ${damage} [${player2.hp}/100]</p>`);
			break;

		case 'defence':
			randomLogNumber = getRandomNumber(0, LOGS[type].length - 1);
			text = LOGS[type][randomLogNumber].replace('[playerKick]', player1.name).replace('[playerDefence]', player2.name);
			$chat.insertAdjacentHTML('afterbegin', `<p>${time} - ${text}</p>`);
			break;

		case 'draw':
			text = LOGS[type];
			break;
	}

}

$formFight.addEventListener('submit', function(event) {
	event.preventDefault();

	const enemyAttack = getEnemyAttack();
	const playerAttack = getPlayerAttack($formFight);

	makeKick(player1, player2, playerAttack, enemyAttack)
	makeKick(player2, player1, enemyAttack,playerAttack)

	if (player1.hp === 0 || player2.hp === 0) {
		const winner = getWinner(player1, player2);

		$buttonFight.disabled = true;
		$arenas.appendChild(createReloadButton());
		$arenas.appendChild(createResultTitle(winner));	}
});

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));
generateLog('start', player1, player2);

const $arenas = document.querySelector('.arenas');

const player1 = {
	name: 'SCORPION',
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
	name: 'SONYA',
	hp: 80,
	img: 'http://reactmarathon-api.herokuapp.com/assets/sonya.gif',
	weapon: [
		'sword',
		'shild'
	],
	attack: function() {
		console.log(`${this.name} Fight...`);
	}
};


function createPlayer(player, playerData) {
	const $player = document.createElement('div');
	$player.classList.add(player);

	const $progressbar = document.createElement('div');
	$progressbar.classList.add('progressbar');

	const $life = document.createElement('div');
	$life.classList.add('life');
	$life.style.width = `${playerData.hp}%`;

	const $name = document.createElement('div');
	$name.classList.add('name');
	$name.innerText = playerData.name;

	const $character = document.createElement('div');
	$character.classList.add('character');

	const $img = document.createElement('img');
	$img.src = playerData.img;

	$progressbar.appendChild($life);
	$progressbar.appendChild($name);
	$character.appendChild($img);
	$player.appendChild($progressbar);
	$player.appendChild($character);

	return $player;
}

$arenas.appendChild(createPlayer('player1', player1));
$arenas.appendChild(createPlayer('player2', player2));

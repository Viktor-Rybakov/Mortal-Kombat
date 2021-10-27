export const player1 = {
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

export const player2 = {
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

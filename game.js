import { Player } from './player.js';
import { createPlayer, createReloadButton, createResultTitle } from './utils.js';
import { generateLog } from './log.js';
import { getRandomNumber } from './commonUtils.js';

const HIT = {
	head: 30,
	body: 25,
	foot: 20,
}

const ATTACK = ['head', 'body', 'foot'];

export class Game {

	constructor(arenasClass, buttonClass) {
		this.$arenas = document.querySelector(arenasClass),
		this.$formFight = document.forms.attack,
		this.$buttonFight = this.$formFight.querySelector(buttonClass);
		this.player1 = new Player(
			{
				player: 1,
				name: 'SCORPION',
				hp: 100,
				img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
				weapon: [
					'sword',
					'nunchucks'
				]
			}
		),
		this.player2 = new Player(
			{
				player: 2,
			name: 'SONIA',
			hp: 100,
			img: 'http://reactmarathon-api.herokuapp.com/assets/sonya.gif',
			weapon: [
					'sword',
					'shild'
				]
			}
		);
	}

	strat = () => {
		this.$formFight.addEventListener('submit', (event) => {
			event.preventDefault();

			const enemyAttack = this.getEnemyAttack();
			const playerAttack = this.getPlayerAttack();

			this.makeKick(this.player1, this.player2, playerAttack, enemyAttack)
			this.makeKick(this.player2, this.player1, enemyAttack,playerAttack)

			if (this.player1.hp === 0 || this.player2.hp === 0) {
				const winner = this.getWinner(this.player1, this.player2);

				this.$buttonFight.disabled = true;
				this.$arenas.appendChild(createReloadButton());
				this.$arenas.appendChild(createResultTitle(winner));
			}
		});

		this.$arenas.appendChild(createPlayer(this.player1));
		this.$arenas.appendChild(createPlayer(this.player2));
		generateLog('start', this.player1, this.player2);
	}

	getEnemyAttack = () => {
		const hit = ATTACK[getRandomNumber(0, 2)];
		const defence = ATTACK[getRandomNumber(0, 2)];

		return {
			value: getRandomNumber(0, HIT[hit]),
			hit,
			defence,
		}
	}

	getPlayerAttack = () => {
		const playerAttack = {};

		for (let item of this.$formFight) {
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

	getWinner = ({ hp: hp1, name: name1 }, { hp: hp2, name: name2 }) => {

		if (hp1 === 0 && hp2 === 0) {
			generateLog('draw');
			return null;
		} else if (hp1 === 0 && hp1 < hp2) {
			generateLog('end', this.player2, this.player1);
			return name2;
		} else if (hp2 === 0 && hp2 < hp1) {
			generateLog('end', this.player1, this.player2);
			return name1;
		}
	}

	makeKick = (playerKick, playerDefence, playerKickAttack, playerDefenceAttack) => {
		if (playerDefenceAttack.defence === playerKickAttack.hit) {
			generateLog('defence', playerKick, playerDefence);
		}

		if (playerDefenceAttack.defence !== playerKickAttack.hit) {
			playerDefence.changeHP(playerKickAttack.value);
			playerDefence.renderHP();
			generateLog('hit', playerKick, playerDefence, playerKickAttack.value);
		}
	}
}

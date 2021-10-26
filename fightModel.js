import {getRandomNumber} from './commonUtils.js';
import {generateLog} from './log.js';

const HIT = {
	head: 30,
	body: 25,
	foot: 20,
}

const ATTACK = ['head', 'body', 'foot'];

export const getEnemyAttack = () => {
	const hit = ATTACK[getRandomNumber(0, 2)];
	const defence = ATTACK[getRandomNumber(0, 2)];

	return {
		value: getRandomNumber(0, HIT[hit]),
		hit,
		defence,
	}
}

export const getPlayerAttack = (form) => {
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

export const getWinner = (player1, player2) => {
	const { hp: hp1, name: name1 } = player1;
	const { hp: hp2, name: name2 } = player2;

	if (hp1 === 0 && hp2 === 0) {
		generateLog('draw');
		return null;
	} else if (hp1 === 0 && hp1 < hp2) {
		generateLog('end', player2, player1);
		return name2;
	} else if (hp2 === 0 && hp2 < hp1) {
		generateLog('end', player1, player2);
		return name1;
	}
}

export const makeKick = (playerKick, playerDefence, playerKickAttack, playerDefenceAttack) => {
	if (playerDefenceAttack.defence === playerKickAttack.hit) {
		generateLog('defence', playerKick, playerDefence);
	}

	if (playerDefenceAttack.defence !== playerKickAttack.hit) {
		playerDefence.changeHP(playerKickAttack.value);
		playerDefence.renderHP();
		generateLog('hit', playerKick, playerDefence, playerKickAttack.value);
	}
}

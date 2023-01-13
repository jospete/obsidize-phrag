import { choose, combineRandom, randomRange } from '../utility/random';

const specialCharsBase = '!#$%&()*+,-.:;<=>?@[]^_{}~'.split('');
const specialCharsExtra = '\'/\\|"'.split('');
const specialChars = specialCharsBase.concat(specialCharsExtra);
const specialCharSet = new Set(specialChars);

const digitChars = '1234567890'.split('');
const digitCharSet = new Set(digitChars);

function generateRandomCharacterSequenceFromSet(
	charSet: string[],
	min: number = 1,
	max: number = 3
): string {

	const count = randomRange(min, max);
	let result = choose(charSet);

	for (let i = 1; i < count; i++)
		result += choose(charSet);

	return result;
}

function generateDigitCharacterSequence(): string {
	return generateRandomCharacterSequenceFromSet(digitChars);
}

function generateSpecialCharacterSequence(excludeUncommonSpecialChars?: boolean): string {
	const charSet = excludeUncommonSpecialChars ? specialCharsBase : specialChars;
	return generateRandomCharacterSequenceFromSet(charSet);
}

export function getSpecialCharsExtra(): string[] {
	return specialCharsExtra.slice();
}

export function isSpecialCharacter(value: string): boolean {
	return specialCharSet.has(value);
}

export function isDigitCharacter(value: string): boolean {
	return digitCharSet.has(value);
}

export function combinedWithRandomSpecialCharacterSequence(
	input: string,
	excludeUncommonSpecialChars?: boolean
): string {
	return combineRandom(input, generateSpecialCharacterSequence(excludeUncommonSpecialChars));
}

export function combinedWithRandomDigitCharacterSequence(input: string): string {
	return combineRandom(input, generateDigitCharacterSequence());
}
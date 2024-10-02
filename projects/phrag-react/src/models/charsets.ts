import { choose, combineRandom, randomRange } from '../utility/random';

export const digitChars = '1234567890';
export const specialCharsBase = '!@#$^+-=_?';
export const specialCharsExtra = '<>~\'/\\|"*{}&()%[],.:;';
export const specialChars = specialCharsBase + specialCharsExtra;

const specialCharsArray = specialChars.split('');
const digitCharsArray = digitChars.split('');
const specialCharSet = new Set(specialCharsArray);
const digitCharSet = new Set(digitCharsArray);

function generateRandomCharacterSequenceFromSet(
	charSet: string[],
	min: number = 1,
	max: number = 2
): string {

	const count = randomRange(min, max);
	let result = choose(charSet);

	for (let i = 1; i < count; i++)
		result += choose(charSet);

	return result;
}

export function isSpecialCharacter(value: string): boolean {
	return specialCharSet.has(value);
}

export function isDigitCharacter(value: string): boolean {
	return digitCharSet.has(value);
}

export function combinedWithRandomDigitCharacterSequence(input: string): string {
	return combineRandom(input, generateRandomCharacterSequenceFromSet(digitCharsArray));
}

export function combinedWithRandomSpecialCharacterSequence(
	input: string,
	includeSpecialChars: string[]
): string {
	return combineRandom(input, generateRandomCharacterSequenceFromSet(includeSpecialChars));
}

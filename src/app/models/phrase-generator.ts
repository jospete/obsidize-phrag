import { choose, coinflip, randomRange } from '../utility/random';
import { capitalize } from '../utility/text-transformation';
import { getDefaultLeetSpeakMap, type LeetSpeakMap } from './leet-speak';
import { getAllWords } from '../@generated/dictionary';

const specialChars = '!#$%&\'()*+,-./:;<=>?@[\\]^_{|}~'.split('');
const specialCharSet = new Set(specialChars);

const digitChars = '1234567890'.split('');
const digitCharSet = new Set(digitChars);

function combineRandom(a: string, b: string): string {
	return coinflip() ? (a + b) : (b + a);
}

function applyDynamicCharacterInjection(
	input: string,
	generateSequence: () => string
): string {
	let tackOn = coinflip() ? generateSequence() : '';
	return combineRandom(tackOn, input);
}

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

function generateDigitCharacterSequence(min: number = 1, max: number = 3): string {
	return generateRandomCharacterSequenceFromSet(digitChars, min, max);
}

function generateSpecialCharacterSequence(min: number = 1, max: number = 3): string {
	return generateRandomCharacterSequenceFromSet(specialChars, min, max);
}

function applySpecialCharacterInjection(input: string): string {
	return applyDynamicCharacterInjection(input, generateSpecialCharacterSequence);
}

export const enum CapitalizationMode {
	NONE = 'NONE',
	TITLE_CASE = 'TITLE_CASE',
	START_CASE = 'START_CASE',
	RANDOMIZE = 'RANDOMIZE'
}

export interface PhraseGenerationOptions {
	requiredLength: number;
	capitalizationMode: CapitalizationMode;
	randomizeWithLeetSpeak?: boolean;
	injectSpecialChars?: boolean;
}

const phraseGenerationDefaults: PhraseGenerationOptions = {
	requiredLength: 20,
	capitalizationMode: CapitalizationMode.TITLE_CASE,
	randomizeWithLeetSpeak: true,
	injectSpecialChars: true
};

export function getDefaultGeneratorOptions(): PhraseGenerationOptions {
	return Object.assign({}, phraseGenerationDefaults);
}

class PhraseGeneratorContext {

	private readonly distinctWordSet = new Set<string>();
	private currentWordIndex: number = -1;
	private accumulator: string = '';

	constructor(
		private readonly words: string[],
		private readonly leetSpeak: LeetSpeakMap,
		private readonly options: PhraseGenerationOptions
	) {
	}

	private get currentSpecialCharacterCount(): number {
		return this.accumulator.split('').filter(c => specialCharSet.has(c)).length;
	}

	private get currentDigitCharacterCount(): number {
		return this.accumulator.split('').filter(c => digitCharSet.has(c)).length;
	}

	private get hasMinRequiredSpecialChars(): boolean {
		return this.currentSpecialCharacterCount >= 2;
	}

	public generate(): string {

		const { requiredLength } = this.options;

		this.distinctWordSet.clear();
		this.currentWordIndex = 0;
		this.accumulator = '';

		while (this.accumulator.length < requiredLength) {

			const choice = choose(this.words);
			if (this.distinctWordSet.has(choice)) continue; // already picked this word, try again

			this.distinctWordSet.add(choice);
			this.accumulator += this.applyGeneratorOptions(choice);
			this.currentWordIndex++;
		}

		if (this.currentSpecialCharacterCount <= 0)
			this.accumulator = combineRandom(this.accumulator, generateSpecialCharacterSequence());

		if (this.currentDigitCharacterCount <= 0)
			this.accumulator = combineRandom(this.accumulator, generateDigitCharacterSequence());

		return this.accumulator;
	}

	private applyGeneratorOptions(word: string): string {

		const { capitalizationMode, randomizeWithLeetSpeak, injectSpecialChars } = this.options;

		const shouldCapitalize = capitalizationMode === CapitalizationMode.TITLE_CASE
			|| (CapitalizationMode.START_CASE && this.currentWordIndex === 0)
			|| (CapitalizationMode.RANDOMIZE && coinflip());

		let result = word;

		if (shouldCapitalize)
			result = capitalize(result);

		if (randomizeWithLeetSpeak && !this.hasMinRequiredSpecialChars)
			result = this.applyRandomLeetSpeak(result);

		if (injectSpecialChars && !this.hasMinRequiredSpecialChars)
			result = applySpecialCharacterInjection(result);

		return result;
	}

	private applyRandomLeetSpeak(
		input: string,
		maxReplacements: number = 1
	): string {

		if (!coinflip()) {
			return input;
		}

		let result = '';
		let currentChar: string;
		let appendText: string;
		let replaceOptions: string[];
		let replaceCount = 0;

		for (let i = 0; i < input.length; i++) {

			currentChar = input[i];
			replaceOptions = this.leetSpeak[currentChar.toLowerCase()];

			if (replaceCount < maxReplacements
				&& coinflip()
				&& Array.isArray(replaceOptions)
				&& replaceOptions.length > 0) {
				appendText = choose(replaceOptions);
				replaceCount++;

			} else {
				appendText = currentChar;
			}

			result += appendText;
		}

		return result;
	}
}

export class PhraseGenerator {

	private readonly words: string[];
	private readonly leetSpeak: LeetSpeakMap;

	constructor() {
		this.words = getAllWords();
		this.leetSpeak = getDefaultLeetSpeakMap();
	}

	public generatePhrase(options: Partial<PhraseGenerationOptions> = {}): string {
		const combinedOptions = Object.assign({}, phraseGenerationDefaults, options || {});
		return new PhraseGeneratorContext(this.words, this.leetSpeak, combinedOptions).generate();
	}
}
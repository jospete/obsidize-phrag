import { choose, coinflip, randomRange } from '../utility/random';
import { capitalize } from '../utility/text-transformation';
import { getDefaultLeetSpeakMap, type LeetSpeakMap } from './leet-speak';
import { getAllWords } from './words';

const specialChars = '!#$%&\'()*+,-./:;<=>?@[\\]^_{|}~'.split('');

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

function generateSpecialCharacterSequence(min: number = 1, max: number = 3): string {

	const count = randomRange(min, max);
	let result = choose(specialChars);

	for (let i = 1; i < count; i++)
		result += choose(specialChars);

	return result;
}

function applySpecialCharacterInjection(
	input: string
): string {
	let tackOn = coinflip() ? generateSpecialCharacterSequence() : '';
	return coinflip() ? (tackOn + input) : (input + tackOn);
}

function applyRandomLeetSpeak(
	leetSpeakMap: LeetSpeakMap,
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
		replaceOptions = leetSpeakMap[currentChar];

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

class PhraseGeneratorContext {

	private readonly distinctWordSet = new Set<string>();
	private currentWordIndex: number = -1;

	constructor(
		private readonly words: string[],
		private readonly leetSpeak: LeetSpeakMap,
		private readonly options: PhraseGenerationOptions
	) {
	}

	public generate(): string {

		this.distinctWordSet.clear();
		this.currentWordIndex = 0;

		const { requiredLength } = this.options;

		let result: string = '';

		while (result.length < requiredLength) {

			const choice = choose(this.words);
			if (this.distinctWordSet.has(choice)) continue; // already picked this word, try again

			this.distinctWordSet.add(choice);
			result += this.applyGeneratorOptions(choice);
			this.currentWordIndex++;
		}

		return result;
	}

	private applyGeneratorOptions(word: string): string {

		const { capitalizationMode, randomizeWithLeetSpeak, injectSpecialChars } = this.options;
		const shouldCapitalize = capitalizationMode === CapitalizationMode.TITLE_CASE
			|| (CapitalizationMode.START_CASE && this.currentWordIndex === 0)
			|| (CapitalizationMode.RANDOMIZE && coinflip());

		let result = word;

		if (shouldCapitalize)
			result = capitalize(result);

		if (randomizeWithLeetSpeak)
			result = applyRandomLeetSpeak(this.leetSpeak, result);

		if (injectSpecialChars)
			result = applySpecialCharacterInjection(result);

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
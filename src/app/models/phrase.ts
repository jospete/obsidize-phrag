import { LeetSpeakMap } from './leet-speak';
import { capitalize } from '../utility/text-transformation';
import { choose, coinflip } from '../utility/random';
import { CapitalizationMode, PhraseGenerationOptions } from './phrase-generator-options';

import {
	combinedWithRandomDigitCharacterSequence,
	combinedWithRandomSpecialCharacterSequence,
	isDigitCharacter,
	isSpecialCharacter
} from './charsets';

/**
 * Main phrase builder that operates on a fixed set of inputs,
 * and maintains an internal state for the output over several iterations.
 */
export class Phrase {

	private readonly distinctWordSet = new Set<string>();
	private currentWordIndex: number = -1;
	private accumulator: string = '';

	constructor(
		private readonly words: string[],
		private readonly leetSpeak: LeetSpeakMap,
		private readonly options: PhraseGenerationOptions
	) {
	}

	public get value(): string {
		return this.accumulator;
	}

	private get currentSpecialCharacterCount(): number {
		return this.getCharacterCountBy(isSpecialCharacter);
	}

	private get currentDigitCharacterCount(): number {
		return this.getCharacterCountBy(isDigitCharacter);
	}

	private get hasMinRequiredSpecialChars(): boolean {
		return this.currentSpecialCharacterCount >= 2;
	}

	private get hasMinRequiredDigitChars(): boolean {
		return this.currentDigitCharacterCount >= 1;
	}

	public build(): string {

		const {
			requiredLength,
			excludeUncommonSpecialChars
		} = this.options;

		this.distinctWordSet.clear();
		this.currentWordIndex = 0;
		this.accumulator = '';

		while (this.accumulator.length < requiredLength) {

			const choice = choose(this.words);

			// don't allow picking the same word more than once
			if (this.distinctWordSet.has(choice)) continue;

			this.distinctWordSet.add(choice);
			this.accumulator += this.applyGeneratorOptionsTo(choice);
			this.currentWordIndex++;
		}

		if (!this.hasMinRequiredSpecialChars)
			this.accumulator = combinedWithRandomSpecialCharacterSequence(
				this.accumulator,
				excludeUncommonSpecialChars
			);

		if (!this.hasMinRequiredDigitChars)
			this.accumulator = combinedWithRandomDigitCharacterSequence(
				this.accumulator
			);

		return this.accumulator;
	}

	private getCharacterCountBy(predicate: (value: string) => boolean): number {
		return this.accumulator.split('').filter(c => predicate(c)).length;
	}

	private applyGeneratorOptionsTo(word: string): string {

		const {
			capitalizationMode,
			randomizeWithLeetSpeak,
			injectSpecialChars,
			excludeUncommonSpecialChars
		} = this.options;

		const shouldCapitalize = capitalizationMode === CapitalizationMode.TITLE_CASE
			|| (CapitalizationMode.START_CASE && this.currentWordIndex === 0)
			|| (CapitalizationMode.RANDOMIZE && coinflip());

		let result = word;

		if (shouldCapitalize)
			result = capitalize(result);

		if (randomizeWithLeetSpeak && !this.hasMinRequiredSpecialChars && coinflip())
			result = this.transformWithLeetSpeak(result);

		if (injectSpecialChars && !this.hasMinRequiredSpecialChars && coinflip())
			result = combinedWithRandomSpecialCharacterSequence(result, excludeUncommonSpecialChars);

		return result;
	}

	private transformWithLeetSpeak(
		input: string,
		maxReplacements: number = 1
	): string {

		let result = '';
		let currentChar: string;
		let appendText: string;
		let replaceOptions: string[];
		let replaceCount = 0;

		for (let i = 0; i < input.length; i++) {

			currentChar = input[i];
			replaceOptions = this.leetSpeak[currentChar.toLowerCase()];

			if (coinflip()
				&& replaceCount < maxReplacements
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
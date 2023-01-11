import { getDefaultLeetSpeakMap, type LeetSpeakMap } from './leet-speak';
import { getAllWords } from '../@generated/dictionary';
import { Phrase } from './phrase';

import {
	PhraseGenerationOptions,
	sanitizeGeneratorOptions
} from './phrase-generator-options';

export class PhraseGenerator {

	private readonly words: string[];
	private readonly leetSpeak: LeetSpeakMap;

	constructor() {
		this.words = getAllWords();
		this.leetSpeak = getDefaultLeetSpeakMap();
	}

	public generate(options: Partial<PhraseGenerationOptions> = {}): string {
		return this.createPhrase(options).build();
	}

	public createPhrase(options: Partial<PhraseGenerationOptions> = {}): Phrase {
		return new Phrase(
			this.words,
			this.leetSpeak,
			sanitizeGeneratorOptions(options)
		);
	}
}
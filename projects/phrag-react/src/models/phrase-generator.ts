import { getDefaultLeetSpeakMap, type LeetSpeakMap } from './leet-speak';
import { Phrase } from './phrase';
import { getAllWords } from './xkcd-words';
import {
	PhraseGenerationOptions,
	sanitizeGeneratorOptions
} from './phrase-generator-options';

export class PhraseGenerator {

	private readonly leetSpeak: LeetSpeakMap;

	private constructor(private readonly words: string[]) {
		this.leetSpeak = getDefaultLeetSpeakMap();
	}

	public static async createAsync(): Promise<PhraseGenerator> {
		return new PhraseGenerator(getAllWords());
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

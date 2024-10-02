import { specialCharsBase } from './charsets';

export const enum CapitalizationMode {
	NONE = 'NONE',
	TITLE_CASE = 'TITLE_CASE',
	START_CASE = 'START_CASE',
	RANDOMIZE = 'RANDOMIZE'
}

export interface PhraseGenerationOptions {
	requiredLength: number;
	capitalizationMode: CapitalizationMode;
	includeSpecialCharacters: string;
	useLeetSpeak: boolean;
}

const phraseGenerationDefaults: PhraseGenerationOptions = {
	requiredLength: 20,
	capitalizationMode: CapitalizationMode.TITLE_CASE,
	useLeetSpeak: false,
	includeSpecialCharacters: specialCharsBase
};

export function getDefaultGeneratorOptions(): PhraseGenerationOptions {
	return Object.assign({}, phraseGenerationDefaults);
}

export function sanitizeGeneratorOptions(
	options: Partial<PhraseGenerationOptions> = {}
): PhraseGenerationOptions {
	return Object.assign({}, phraseGenerationDefaults, options || {});
}

const CUSTOM_GENERATOR_OPTIONS_KEY = 'phragGeneratorOptions';

export function loadGeneratorOptions(): PhraseGenerationOptions {
	const savedOptionsStr = localStorage.getItem(CUSTOM_GENERATOR_OPTIONS_KEY);
	try {
		const savedOptions = JSON.parse(savedOptionsStr!);
		return sanitizeGeneratorOptions(savedOptions);
	} catch {
		return getDefaultGeneratorOptions();
	}
}

export function saveGeneratorOptions(options: PhraseGenerationOptions): boolean {
	try {
		const optionsToSerialize = sanitizeGeneratorOptions(options);
		const optionsValue = JSON.stringify(optionsToSerialize);
		localStorage.setItem(CUSTOM_GENERATOR_OPTIONS_KEY, optionsValue);
		return true;
	} catch (e) {
		console.error(`failed to save generator options`, e);
		return false;
	}
}

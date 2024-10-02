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
	excludeUncommonSpecialChars?: boolean;
}

const phraseGenerationDefaults: PhraseGenerationOptions = {
	requiredLength: 20,
	capitalizationMode: CapitalizationMode.TITLE_CASE,
	randomizeWithLeetSpeak: true,
	injectSpecialChars: false,
	excludeUncommonSpecialChars: true
};

export function getDefaultGeneratorOptions(): PhraseGenerationOptions {
	return Object.assign({}, phraseGenerationDefaults);
}

export function sanitizeGeneratorOptions(
	options: Partial<PhraseGenerationOptions> = {}
): PhraseGenerationOptions {
	return Object.assign({}, phraseGenerationDefaults, options || {});
}

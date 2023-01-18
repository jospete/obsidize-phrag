import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { getSpecialCharsExtra } from './models/charsets';
import { PhraseGenerator } from './models/phrase-generator';

import {
	getDefaultGeneratorOptions,
	PhraseGenerationOptions
} from './models/phrase-generator-options';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {

	private readonly mExtraSpecialChars = getSpecialCharsExtra();
	private generator: PhraseGenerator | undefined;
	private mDidInitialize = false;

	public generatorOptions: PhraseGenerationOptions = getDefaultGeneratorOptions();
	public generatedPhrases: string[] = [];
	public lastCopiedPhrase: string = '';
	public phraseCount: number = 10;
	public showSettings: boolean = false;

	constructor() {
		this.initialize().catch(console.error);
	}

	public get appVersion(): string {
		return environment.version;
	}

	public get didInitialize(): boolean {
		return this.mDidInitialize;
	}

	public get extraSpecialChars(): string[] {
		return this.mExtraSpecialChars;
	}

	public get includeAllSpecialCharacters(): boolean {
		return !this.generatorOptions.excludeUncommonSpecialChars;
	}

	public set includeAllSpecialCharacters(value: boolean) {
		this.generatorOptions.excludeUncommonSpecialChars = !value;
	}

	public toggleShowSettings(): void {
		this.showSettings = !this.showSettings;
	}

	public async copyToClipboard(value: string): Promise<void> {
		await navigator.clipboard.writeText(value);
		this.lastCopiedPhrase = value;
	}

	public regenerate(): void {
		this.generatedPhrases = [];
		for (let i = 0; i < this.phraseCount; i++)
			this.generatedPhrases[i] = this.createNewPhrase();
	}

	private createNewPhrase(): string {
		return this.generator?.generate(this.generatorOptions) ?? 'N/A';
	}

	private async initialize(): Promise<void> {
		this.generator = await PhraseGenerator.createAsync();
		this.mDidInitialize = true;
		this.regenerate();
	}
}

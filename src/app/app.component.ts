import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

import {
	getDefaultGeneratorOptions,
	PhraseGenerationOptions,
	PhraseGenerator
} from './models/phrase-generator';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {

	private readonly generator = new PhraseGenerator();

	public generatorOptions: PhraseGenerationOptions = getDefaultGeneratorOptions();
	public phraseCount: number = 10;
	public generatedPhrases: string[] = [];
	public lastCopiedPhrase: string = '';

	constructor() {
		this.regenerate();
	}

	public get appVersion(): string {
		return environment.version;
	}

	public async copyToClipboard(value: string): Promise<void> {
		await navigator.clipboard.writeText(value);
		this.lastCopiedPhrase = value;
	}

	public regenerate(): void {
		this.generatedPhrases = [];
		for (let i = 0; i < this.phraseCount; i++)
			this.generatedPhrases[i] = this.generator.generatePhrase(this.generatorOptions);
	}
}

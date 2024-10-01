import { Component, HostListener } from '@angular/core';
import { environment } from 'src/environments/environment';
import { getSpecialCharsExtra } from './models/charsets';
import { PhraseGenerator } from './models/phrase-generator';

import {
	getDefaultGeneratorOptions,
	PhraseGenerationOptions
} from './models/phrase-generator-options';

const shortTitle = 'Phrag';
const longTitle = '(Phra)se (G)enerator';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {

	private readonly mExtraSpecialChars = getSpecialCharsExtra();
	private generator: PhraseGenerator | undefined;
	private mDidInitialize: boolean = false;
	private mDynamicTitle: string = longTitle;

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

	public get dynamicTitle(): string {
		return this.mDynamicTitle;
	}

	public set includeAllSpecialCharacters(value: boolean) {
		this.generatorOptions.excludeUncommonSpecialChars = !value;
	}

	@HostListener('window:resize', ['$event'])
	public onResize(event: any): void {
		this.mDynamicTitle = event.target.innerWidth > 500
			? longTitle
			: shortTitle;
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
		for (let i = 0; i < this.phraseCount; i++) {
			this.generatedPhrases[i] = this.createNewPhrase();
		}
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

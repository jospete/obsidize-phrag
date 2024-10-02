import React, { useEffect, useState } from 'react';
import Header from './components/header/Header';
import SettingsMenu from './components/settings-menu/SettingsMenu';
import Content from './components/content/Content';
import Footer from './components/footer/Footer';
import { PhraseGenerator } from './models/phrase-generator';
import {
	PhraseGenerationOptions,
	loadGeneratorOptions,
	saveGeneratorOptions
} from './models/phrase-generator-options';
import './App.css';

const phraseCount = 10;

let generator: PhraseGenerator;

const App: React.FC = () => {
	const generatorOptions = loadGeneratorOptions();
	const [initialized, setInitialized] = useState(false);
	const [settingsVisible, setSettingsVisible] = useState(false);
	const [useLeetSpeak, setUseLeetSpeak] = useState(generatorOptions.useLeetSpeak);
	const [targetLength, setTargetLength] = useState(generatorOptions.requiredLength);
	const [includeSpecialCharacters, setIncludeSpecialCharacters] = useState(generatorOptions.includeSpecialCharacters);
	const [generatedPhrases, setGeneratedPhrases] = useState<string[]>([]);
	
	const toggleShowSettings = () => {
		setSettingsVisible(!settingsVisible);
	};

	const regeneratePhrases = () => {
		const generatedPhrases = [];
		const options: PhraseGenerationOptions = {
			...generatorOptions,
		};

		for (let i = 0; i < phraseCount; i++) {
			generatedPhrases[i] = generator?.generate(options) ?? 'N/A';
		}
		
		setGeneratedPhrases(generatedPhrases);
	};

	const onTargetLengthChanged = (value: number) => {
		generatorOptions.requiredLength = value;
		setTargetLength(value);
		saveGeneratorOptions(generatorOptions);
	};

	const onUseLeetSpeakChanged = (value: boolean) => {
		generatorOptions.useLeetSpeak = value;
		setUseLeetSpeak(value);
		saveGeneratorOptions(generatorOptions);
	};

	const onSpecialCharactersSelectionChanged = (value: string) => {
		generatorOptions.includeSpecialCharacters = value;
		setIncludeSpecialCharacters(value);
		saveGeneratorOptions(generatorOptions);
	};

	useEffect(() => {
		const initialize = async () => {
			generator = await PhraseGenerator.createAsync();
			regeneratePhrases();
			setInitialized(true);
		};

		initialize().catch(console.error);
	}, []);

	return (
		<>
			<Header toggleShowSettings={toggleShowSettings} />
			<SettingsMenu
				settingsVisible={settingsVisible}
				useLeetSpeak={useLeetSpeak}
				setUseLeetSpeak={onUseLeetSpeakChanged}
				targetLength={targetLength}
				setTargetLength={onTargetLengthChanged}
				includeSpecialCharacters={includeSpecialCharacters}
				setIncludeSpecialCharacters={onSpecialCharactersSelectionChanged} />
			<Content
				initialized={initialized}
				generatedPhrases={generatedPhrases}
				regeneratePhrases={regeneratePhrases} />
			<Footer initialized={initialized} appVersion={APP_VERSION} />
		</>
	);
};

export default App;

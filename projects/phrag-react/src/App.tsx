import React, { useEffect, useState } from 'react';
import Header from './components/header/Header';
import SettingsMenu from './components/settings-menu/SettingsMenu';
import Content from './components/content/Content';
import Footer from './components/footer/Footer';
import './App.css';
import { PhraseGenerator } from './models/phrase-generator';
import { getDefaultGeneratorOptions, PhraseGenerationOptions } from './models/phrase-generator-options';
import { getSpecialCharsExtra } from './models/charsets';

const phraseCount = 10;
const generatorOptions: PhraseGenerationOptions = getDefaultGeneratorOptions();
const extraSpecialChars = getSpecialCharsExtra();

let generator: PhraseGenerator;

const App: React.FC = () => {
	const [initialized, setInitialized] = useState(false);
	const [settingsVisible, setSettingsVisible] = useState(false);
	const [includeSpecialCharacters, setIncludeSpecialCharacters] = useState(false);
	const [generatedPhrases, setGeneratedPhrases] = useState<string[]>([]);
	
	const toggleShowSettings = () => {
		setSettingsVisible(!settingsVisible);
	};

	const regeneratePhrases = () => {
		const generatedPhrases = [];
		const options: PhraseGenerationOptions = {
			...generatorOptions,
			excludeUncommonSpecialChars: !includeSpecialCharacters
		};

		for (let i = 0; i < phraseCount; i++) {
			generatedPhrases[i] = generator?.generate(options) ?? 'N/A';
		}
		
		setGeneratedPhrases(generatedPhrases);
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
				extraSpecialChars={extraSpecialChars}
				includeAllSpecialCharacters={includeSpecialCharacters}
				setIncludeSpecialCharacters={setIncludeSpecialCharacters}
				settingsVisible={settingsVisible} />
			<Content
				initialized={initialized}
				generatedPhrases={generatedPhrases}
				regeneratePhrases={regeneratePhrases} />
			<Footer initialized={initialized} appVersion={APP_VERSION} />
		</>
	);
};

export default App;

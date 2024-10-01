import { useState } from 'react';
import { Settings } from '@mui/icons-material';
import './App.css';

function App() {
	const [showSettings, setShowSettings] = useState(false);
	const [initialized, setInitialized] = useState(false);
	const [lastCopiedPhrase, setLastCopiedPhrase] = useState('');
	const [generatedPhrases, setGeneratedPhrases] = useState([]);
	const [includeAllSpecialCharacters, setIncludeAllSpecialCharacters] = useState(false);
	const extraSpecialChars: string[] = [];
	const appVersion = '1.0.0';

	const toggleShowSettings = () => {
	};

	const regenerate = () => {
	};

	const copyToClipboard = () => {
	};

	const handleIncludeAllSpecialCharactersChange = () => {
	};

  return (
	<div className="content-wrapper" role="main">
		<div className="header">
			<div className="header-inner">
				<h1 className="title">
					<img src="./assets/icons/favicon-32x32.png" />
					<span className="title-text">(Phra)se (G)enerator</span>
				</h1>
				<button className="settings-button" onClick={toggleShowSettings}>
					<Settings />
				</button>
			</div>
		</div>
		<div className={"settings" + (showSettings ? 'visible' : '')}>
			<div className="settings-inner">
				<div className="setting-option">
					<div className="settings-option-label-wrapper">
						<label>Use Advanced Characters</label>
						<div className="charset-block">
							{extraSpecialChars.map(c => (<span className="char-block">{c}</span>))}
						</div>
					</div>
					<input type="checkbox" checked={includeAllSpecialCharacters} onChange={handleIncludeAllSpecialCharactersChange} />
				</div>
			</div>
		</div>
		<div className="content">
			<div className="content-inner">
				{!initialized &&
				<div className="loading">
						Loading...
				</div>
				}
				{initialized &&
				<>
					<button className="regenerate-button" onClick={regenerate}>
						Regenerate
					</button>
					<div className="phrase-generation-output">
						{generatedPhrases.map(phrase => (
							<div className="phrase-row">
								<div className={"phrase-value-col" + (phrase === lastCopiedPhrase ? "last-copied-value": "")}>
									{phrase}
								</div>
								<div className="phrase-copy-button-col">
									<button onClick={copyToClipboard}>
										{phrase === lastCopiedPhrase ? 'Copied!' : 'Copy'}
									</button>
								</div>
							</div>
						))}
					</div>
				</>
				}
			</div>
		</div>
		{initialized &&
		<div className="footer">
			<div className="footer-inner">
				<a className="version-button-container" target="_blank" href="https://github.com/jospete/obsidize-phrag">
					<button className="version-button">
						<img className="version-button-icon" src="./assets/icons/github-mark.svg" />
						<label className="version-button-label">Version {appVersion}</label>
					</button>
				</a>
			</div>
		</div>
		}
	</div>
  )
}

export default App

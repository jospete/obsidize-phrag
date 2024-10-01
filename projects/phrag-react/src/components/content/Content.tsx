import { useState } from 'react';
import './Content.css';

function Content(): JSX.Element {
	const [initialized, setInitialized] = useState(false);
	const [lastCopiedPhrase, setLastCopiedPhrase] = useState('');
	const [generatedPhrases, setGeneratedPhrases] = useState([]);

	const regenerate = () => {
	};

	const copyToClipboard = () => {
	};

	return (
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
	);
}

export default Content;
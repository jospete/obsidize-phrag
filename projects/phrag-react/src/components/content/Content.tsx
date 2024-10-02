import React, { useState } from 'react';
import './Content.css';

export interface ContentProps {
	initialized: boolean;
	generatedPhrases: string[];
	regeneratePhrases(): void;
}

const Content: React.FC<ContentProps> = (props: ContentProps) => {
	const {
		initialized,
		generatedPhrases,
		regeneratePhrases
	} = props;

	const [lastCopiedPhrase, setLastCopiedPhrase] = useState('');

	const copyToClipboard = async (phrase: string) => {
		await navigator.clipboard.writeText(phrase);
		setLastCopiedPhrase(phrase);
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
					<button className="regenerate-button" onClick={regeneratePhrases}>
						Regenerate
					</button>
					<div className="phrase-generation-output">
						{generatedPhrases.map(phrase => (
							<div key={phrase} className="phrase-row">
								<div className={"phrase-value-col" + (phrase === lastCopiedPhrase ? "last-copied-value": "")}>
									{phrase}
								</div>
								<div className="phrase-copy-button-col">
									<button onClick={() => copyToClipboard(phrase)}>
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
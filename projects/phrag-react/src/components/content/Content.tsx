import React, { useState } from 'react';
import PhraseRowItem from '../phrase-row-item/PhraseRowItem';
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

	if (!initialized) {
		return undefined;
	}

	return (
		<div className="content">
			<div className="content-inner">
				<button className="regenerate-button" onClick={regeneratePhrases}>
					Regenerate
				</button>
				<div className="phrase-generation-output">
					{generatedPhrases.map((phrase, i) => (
						<PhraseRowItem
							key={i}
							rowId={i}
							phrase={phrase}
							isLastCopied={phrase === lastCopiedPhrase}
							onCopy={copyToClipboard} />
					))}
				</div>
			</div>
		</div>
	);
}

export default Content;
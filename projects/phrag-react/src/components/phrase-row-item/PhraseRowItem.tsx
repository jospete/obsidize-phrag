import React, { useState } from 'react';
import './PhraseRowItem.css';

export interface PhraseRowItemProps {
	phrase: string;
	isLastCopied: boolean;
	rowId: number;
	onCopy: (value: string) => void;
}

const PhraseRowItem: React.FC<PhraseRowItemProps> = (props: PhraseRowItemProps) => {
	const {
		phrase,
		isLastCopied,
		rowId,
		onCopy
	} = props;

	const [previousPhrase, setPreviousPhrase] = useState(phrase);
	const [phraseChanged, setPhraseChanged] = useState(false);
	let phraseValueClasses = 'phrase-value-col';

	if (isLastCopied) {
		phraseValueClasses += ' last-copied-value';
	}

	if (!phraseChanged && previousPhrase !== phrase) {
		setTimeout(() => {
			setPhraseChanged(true);
		}, rowId * 50);
	}

	if (phraseChanged) {
		phraseValueClasses += ' next-phrase-value';
		setTimeout(() => {
			setPreviousPhrase(phrase);
			setPhraseChanged(false);
		}, 300);
	}

	const mainPhrase = phraseChanged ? phrase : previousPhrase;

	return (
		<div className="phrase-row">
			<div className={phraseValueClasses}>
				<label>{mainPhrase}</label>
				<label className="char-count-label">{mainPhrase.length} Characters</label>
			</div>
			{phraseChanged && (
				<div className="phrase-value-col previous-phrase-value">
					<label>{previousPhrase}</label>
					<label className="char-count-label">{previousPhrase.length} Characters</label>
				</div>
			)}
			<div className="phrase-copy-button-col">
				<button onClick={() => onCopy(phrase)}>
					{isLastCopied ? 'Copied!' : 'Copy'}
				</button>
			</div>
		</div>
	);
}

export default PhraseRowItem;
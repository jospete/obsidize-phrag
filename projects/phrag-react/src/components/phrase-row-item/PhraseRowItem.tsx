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
	let phraseValueClasses = 'phrase-value-col' + (isLastCopied ? ' last-copied-value': '');

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

	return (
		<div className="phrase-row">
			<div className={phraseValueClasses}>
				{phraseChanged ? phrase : previousPhrase}
			</div>
			{phraseChanged &&
			<div className="phrase-value-col previous-phrase-value">
				{previousPhrase}
			</div>
			}
			<div className="phrase-copy-button-col">
				<button onClick={() => onCopy(phrase)}>
					{isLastCopied ? 'Copied!' : 'Copy'}
				</button>
			</div>
		</div>
	);
}

export default PhraseRowItem;
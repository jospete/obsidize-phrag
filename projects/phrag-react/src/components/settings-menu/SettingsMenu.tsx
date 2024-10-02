import React from 'react';
import './SettingsMenu.css';
import { specialChars } from '../../models/charsets';

export interface SettingsMenuProps {
	settingsVisible: boolean;
	targetLength: number;
	setTargetLength: (value: number) => void;
	includeSpecialCharacters: string;
	setIncludeSpecialCharacters: (value: string) => void;
	useLeetSpeak: boolean;
	setUseLeetSpeak: (value: boolean) => void;
}

const SettingsMenu: React.FC<SettingsMenuProps> = (props: SettingsMenuProps) => {
	const {
		settingsVisible,
		targetLength,
		setTargetLength,
		includeSpecialCharacters,
		setIncludeSpecialCharacters,
		useLeetSpeak,
		setUseLeetSpeak
	} = props;

	const onTargetLengthSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTargetLength(parseInt(e.target.value));
	};

	const toggleSpecialChar = (v: string) => {
		if (includeSpecialCharacters.includes(v)) {
			setIncludeSpecialCharacters(includeSpecialCharacters.replace(v, ''));
		} else {
			setIncludeSpecialCharacters(includeSpecialCharacters + v);
		}
	};

	const specialCharsArray = specialChars.split('');

	return (
		<div className={"settings" + (settingsVisible ? ' visible' : '')}>
			<div className="settings-inner">
				<div className="setting-option" onClick={() => setUseLeetSpeak(!useLeetSpeak)}>
					<label className="checkbox-label">
						Use 1337 5p34k
					</label>
					<input
						className="checkbox"
						type="checkbox"
						checked={useLeetSpeak} 
						onChange={(e) => setUseLeetSpeak(e.target.checked)} />
				</div>
				<div className="setting-option">
					<div className="range-slider">
						<label>Target Length</label>
						<input
							className="slider"
							type="range"
							min={14}
							max={64}
							value={targetLength} 
							onChange={onTargetLengthSliderChange} />
						<label className="slider-value-label">{targetLength}</label>
					</div>
				</div>
				<div className="setting-option">
					<label className="special-chars-label">Include Special Characters</label>
					<div className="special-char-multiselect">
						{specialCharsArray.map(v => (
							<button
								key={v}
								className={'special-char-button ' + (includeSpecialCharacters.includes(v) ? 'active' : '')}
								onClick={() => toggleSpecialChar(v)}>
								{v}
							</button>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default SettingsMenu;
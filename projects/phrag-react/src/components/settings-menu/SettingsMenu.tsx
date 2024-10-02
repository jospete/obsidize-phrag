import React from 'react';
import './SettingsMenu.css';

export interface SettingsMenuProps {
	extraSpecialChars: string[];
	includeAllSpecialCharacters: boolean;
	setIncludeSpecialCharacters(value: boolean): void;
	settingsVisible: boolean;
}

const SettingsMenu: React.FC<SettingsMenuProps> = (props: SettingsMenuProps) => {
	const {
		extraSpecialChars,
		includeAllSpecialCharacters,
		setIncludeSpecialCharacters,
		settingsVisible
	} = props;

	return (
		<div className={"settings" + (settingsVisible ? 'visible' : '')}>
			<div className="settings-inner">
				<div className="setting-option">
					<div className="settings-option-label-wrapper">
						<label>Use Advanced Characters</label>
						<div className="charset-block">
							{extraSpecialChars.map(c => (
								<span key={c} className="char-block">{c}</span>
							))}
						</div>
					</div>
					<input
						type="checkbox"
						checked={includeAllSpecialCharacters}
						onChange={(e) => setIncludeSpecialCharacters(e.target.checked)} />
				</div>
			</div>
		</div>
	);
};

export default SettingsMenu;
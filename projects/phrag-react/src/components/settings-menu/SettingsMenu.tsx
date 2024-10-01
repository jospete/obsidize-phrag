import { useState } from 'react';
import './SettingsMenu.css';

function SettingsMenu(): JSX.Element {
	const extraSpecialChars: string[] = [];
	const [includeAllSpecialCharacters, setIncludeAllSpecialCharacters] = useState(false);

	const handleIncludeAllSpecialCharactersChange = () => {
	};

	return (
		<div className={"settings" + (false ? 'visible' : '')}>
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
	);
}

export default SettingsMenu;
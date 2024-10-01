import { Settings } from '@mui/icons-material';
import { useState } from 'react';
import logo from '../assets/icons/favicon-32x32.png';
import './Header.css';

function Header(): JSX.Element {
	const [showSettings, setShowSettings] = useState(false);

	const toggleShowSettings = () => {
	};

	return (
		<div className="header">
			<div className="header-inner">
				<h1 className="title">
					<img src={logo} />
					<span className="title-text">(Phra)se (G)enerator</span>
				</h1>
				<button className="settings-button" onClick={toggleShowSettings}>
					<Settings />
				</button>
			</div>
		</div>
	);
}

export default Header;
import { useState } from 'react';

function Footer(): JSX.Element {
	const [initialized, setInitialized] = useState(false);
	const appVersion = '1.0.0';

	if (!initialized) {
		return (<></>);
	}

	return (
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
	);
}

export default Footer;
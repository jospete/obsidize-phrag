import React from 'react';
import githubLogo from '../../assets/icons/github-mark.svg';

export interface FooterProps {
	initialized: boolean;
	appVersion: string;
}

const Footer: React.FC<FooterProps> = (props: FooterProps) => {
	const {
		initialized,
		appVersion
	} = props;

	if (!initialized) {
		return undefined;
	}

	return (
		<div className="footer">
			<div className="footer-inner">
				<a className="version-button-container" target="_blank" href="https://github.com/jospete/obsidize-phrag">
					<button className="version-button">
						<img className="version-button-icon" src={githubLogo} />
						<label className="version-button-label">Version {appVersion}</label>
					</button>
				</a>
			</div>
		</div>
	);
};

export default Footer;
import { Settings } from '@mui/icons-material';
import React, { useLayoutEffect, useState } from 'react';
import logo from '../../assets/icons/favicon-32x32.png';
import './Header.css';

export interface HeaderProps {
	toggleShowSettings(): void;
}

const shortTitle = 'Phrag';
const longTitle = '(Phra)se (G)enerator';

const getTitleForCurrentWidth = (): string => {
	return window.innerWidth > 500 ? longTitle : shortTitle;
};

const Header: React.FC<HeaderProps> = (props: HeaderProps) => {
	const {
		toggleShowSettings
	} = props;

	const [title, setTitle] = useState(getTitleForCurrentWidth());

	useLayoutEffect(() => {
		const onResize = () => setTitle(getTitleForCurrentWidth());
		window.addEventListener('resize', onResize);
		return () => window.removeEventListener('resize', onResize);
	  }, []);

	return (
		<div className="header">
			<div className="header-inner">
				<h1 className="title">
					<img src={logo} />
					<span className="title-text">{title}</span>
				</h1>
				<button className="settings-button" onClick={toggleShowSettings}>
					<Settings />
				</button>
			</div>
		</div>
	);
};

export default Header;
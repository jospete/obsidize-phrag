import Header from './components/header/Header';
import SettingsMenu from './components/settings-menu/SettingsMenu';
import Content from './components/content/Content';
import Footer from './components/footer/Footer';
import './App.css';

function App() {
  return (
	<>
		<Header />
		<SettingsMenu />
		<Content />
		<Footer />
	</>
  );
}

export default App;

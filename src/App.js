import Calculator from "./components/Calculator";
import logo from "./images/logo.svg";

const App = () => {
	return (
		<div className="app">
			<img src={logo} alt="splitter" className="logo" />
			<Calculator />
		</div>
	);
};

export default App;

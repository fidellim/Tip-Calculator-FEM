import React from "react";
import ReactDOM from "react-dom";
import "./sass/index.scss";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

// if ("serviceWorker" in navigator) {
// 	navigator.serviceWorker
// 		.register("sw.js")
// 		.then((registration) => {
// 			console.log(`SW Registered!`);
// 			console.log(registration);
// 		})
// 		.catch((err) => {
// 			console.log(`SW Registration Failed${err}`);
// 		});
// }

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

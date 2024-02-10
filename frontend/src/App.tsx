import React from "react";
import AuthenticationProvider from "./context/AuthenticationContext";
import Routes from "./routes/Routes";

function App() {
	return (
		<AuthenticationProvider>
			<Routes />
		</AuthenticationProvider>
	);
}

export default App;


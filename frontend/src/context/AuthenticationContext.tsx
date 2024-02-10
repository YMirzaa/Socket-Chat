import {
	createContext,
	useState,
	useEffect,
	ReactNode,
	useMemo,
	useContext,
} from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";

interface IAuthenticationContextProps {
	token: string | null;
	setToken: (token: string | null) => void;
	username: string;
}

interface IAuthenticationProviderProps {
	children: ReactNode;
}

const AuthenticationContext = createContext<IAuthenticationContextProps>({
	token: null,
	setToken: () => {},
	username: "",
});

const AuthenticationProvider: React.FC<IAuthenticationProviderProps> = ({
	children,
}) => {
	// delete axios.defaults.headers.common["Authorization"];
	// localStorage.removeItem("token");
	const [token, _setToken] = useState<string | null>(
		localStorage.getItem("token")
	);
	const [username, _setUsername] = useState<string>("");

	const setToken = (newToken: string | null) => {
		_setToken(newToken);
	};

	const contextValue = useMemo(
		() => ({
			token,
			setToken,
			username,
		}),
		[token, username]
	);

	useEffect(() => {
		if (token) {
			const {
				exp: expirationDate,
				sub: _username,
			}: { exp: number; sub: string } = jwtDecode(token);

			const currentDate: number = Date.now() / 1000;

			_setUsername(_username);
			if (currentDate > expirationDate) {
				setToken(null);
			}
		}
	}, [token]);

	useEffect(() => {
		if (token) {
			axios.defaults.headers.common["Authorization"] = "Bearer " + token;
			localStorage.setItem("token", token);
		} else {
			delete axios.defaults.headers.common["Authorization"];
			localStorage.removeItem("token");
		}
	}, [token]);

	return (
		<AuthenticationContext.Provider value={contextValue}>
			{children}
		</AuthenticationContext.Provider>
	);
};

// Custom hook that shorthands the context!
export const useAuthentication = (): IAuthenticationContextProps => {
	return useContext(AuthenticationContext);
};

export default AuthenticationProvider;


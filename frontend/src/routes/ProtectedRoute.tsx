import { Navigate, Outlet } from "react-router-dom";
import { useAuthentication } from "../context/AuthenticationContext";
import { SocketClientContextProvider } from "../context/SocketClientContext";
import ConversationProvider from "../context/ConversationContext";

const ProtectedRoute = () => {
	const { token } = useAuthentication();

	// Check if the user is authenticated
	if (!token) {
		// If not authenticated, redirect to the login page
		return <Navigate to='/' />;
	}

	// If authenticated, render the child routes
	return (
		<ConversationProvider>
			<SocketClientContextProvider>
				<Outlet />
			</SocketClientContextProvider>
		</ConversationProvider>
	);
	// <Outlet />;
};

export { ProtectedRoute };


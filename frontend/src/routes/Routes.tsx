import {
	Navigate,
	RouterProvider,
	createBrowserRouter,
} from "react-router-dom";
import { useAuthentication } from "../context/AuthenticationContext";
import { ProtectedRoute } from "./ProtectedRoute";
import LandingPage from "../components/LandingPage";
import ChatPage from "../components/ChatPage";

const Routes = () => {
	const { token } = useAuthentication();
	// Route configurations go here

	const routesForPublic = [
		{
			path: "/service",
			element: <div>Service Page</div>,
		},
		{
			path: "/about-us",
			element: <div>About Us</div>,
		},
	];

	const routesForAuthenticatedOnly = [
		{
			path: "/",
			element: <ProtectedRoute />,
			children: [
				{
					path: "/",
					element: <Navigate to='/chat' />,
				},
				{
					path: "/chat",
					element: <ChatPage />,
				},
			],
		},
		{
			path: "/*",
			element: <div>404</div>,
		},
	];

	const routesForNotAuthenticatedOnly = [
		{
			path: "/",
			element: <LandingPage />,
		},
		{
			path: "/*",
			element: <LandingPage />,
		},
	];

	const router = createBrowserRouter([
		...routesForPublic,
		...(!token ? routesForNotAuthenticatedOnly : []),
		...routesForAuthenticatedOnly,
	]);

	return <RouterProvider router={router} />;
};

export default Routes;


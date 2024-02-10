import React from "react";
import Header from "./Header";

interface MainLayoutProps {
	children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
	return (
		<div>
			<Header />
			<main>{children}</main>
			{/* Add footer or other MainLayout components here */}
		</div>
	);
};

export default MainLayout;

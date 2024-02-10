import React from "react";

// interface HeaderProps {
// 	title: string;
// }

const Header: React.FC = () => {
	return (
		<header className='bg-blue-500 py-4'>
			<h1 className='text-white text-2xl font-bold'>
				{"Mirza Chat App"}
			</h1>
		</header>
	);
};

export default Header;


import React, { useState } from "react";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";

type PopupType = "login" | "signup" | null;

const LandingPage: React.FC = () => {
	const [popupType, setPopupType] = useState<PopupType>(null);

	const openPopup = (type: PopupType) => {
		setPopupType(type);
	};

	const closePopup = () => {
		setPopupType(null);
	};

	const renderPopup = () => {
		const handleOverlayClick = (
			event: React.MouseEvent<HTMLDivElement>
		) => {
			if (event.target === event.currentTarget) {
				closePopup();
			}
		};

		if (popupType === "login") {
			return (
				<div
					className='fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50'
					onClick={handleOverlayClick}
				>
					<LoginForm onClose={closePopup} />
				</div>
			);
		}

		if (popupType === "signup") {
			return (
				<div
					className='fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50'
					onClick={handleOverlayClick}
				>
					<SignUpForm onClose={closePopup} />
				</div>
			);
		}

		return null;
	};

	return (
		<div className='flex items-center justify-center h-screen'>
			<div>
				<h1 className='text-4xl font-bold mb-4'>
					Welcome to the Landing Page!
				</h1>
				<button
					className='bg-blue-500 text-white px-4 py-2 rounded '
					onClick={() => openPopup("login")}
				>
					Login
				</button>
				<button
					className='bg-green-500 text-white px-4 py-2 rounded'
					onClick={() => openPopup("signup")}
				>
					Signup
				</button>
			</div>
			{renderPopup()}
		</div>
	);
};

export default LandingPage;


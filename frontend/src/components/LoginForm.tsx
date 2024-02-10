import React, { useState } from "react";
import axios from "axios";
import { useAuthentication } from "../context/AuthenticationContext";

type LoginFormProps = {
	onClose: () => void;
};

const LoginForm: React.FC<LoginFormProps> = ({ onClose }) => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const { setToken } = useAuthentication();

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();

		try {
			const response = await axios.post(
				"http://localhost:8081/api/v1/auth/login",
				{
					username,
					password,
				},
				{
					headers: {
						"Access-Control-Allow-Origin": "*",
						"Access-Control-Allow-Methods":
							"GET,PUT,POST,DELETE,PATCH,OPTIONS",
						"Access-Control-Allow-Headers":
							"Origin, X-Requested-With, Content-Type, Accept, Authorization",
					},
				}
			);

			setToken(response.data.token);

			// Close the popup
			onClose();
		} catch (error: any) {
			// Handle error here
			console.error(error.response.data);
		}
	};

	return (
		<div className='bg-white p-4'>
			<h2 className='text-xl font-bold mb-4'>Login</h2>
			<form onSubmit={handleSubmit}>
				<div className='mb-4'>
					<label
						htmlFor='username'
						className='block text-gray-700 font-bold mb-2'
					>
						Username
					</label>
					<input
						type='text'
						id='username'
						className='w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500'
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
					/>
				</div>
				<div className='mb-4'>
					<label
						htmlFor='password'
						className='block text-gray-700 font-bold mb-2'
					>
						Password
					</label>
					<input
						type='password'
						id='password'
						className='w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</div>
				<button
					type='submit'
					className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none'
				>
					Login
				</button>
				<button
					type='button'
					className='ml-2 text-gray-600 hover:text-gray-800 focus:outline-none'
					onClick={onClose}
				>
					Close
				</button>
			</form>
		</div>
	);
};

export default LoginForm;


import React, { useState } from "react";
import axios from "axios";

type SignUpFormProps = {
	onClose: () => void;
};

const SignUpForm: React.FC<SignUpFormProps> = ({ onClose }) => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();

		try {
			const response = await axios.post(
				"http://localhost:8081/api/v1/auth/register",
				{
					username,
					email,
					password,
				}
			);

			// Handle successful response here
			console.log("Register Success!");

			// Close the popup
			onClose();
		} catch (error) {
			// Handle error here
			console.error(error);
		}
	};

	return (
		<div className='bg-white p-4'>
			<h2 className='text-xl font-bold mb-4'>Sign Up</h2>
			<form onSubmit={handleSubmit}>
				<div className='mb-4'>
					<label
						htmlFor='name'
						className='block text-gray-700 font-bold mb-2'
					>
						Name
					</label>
					<input
						type='text'
						id='name'
						className='w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500'
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
					/>
				</div>
				<div className='mb-4'>
					<label
						htmlFor='email'
						className='block text-gray-700 font-bold mb-2'
					>
						Email
					</label>
					<input
						type='email'
						id='email'
						className='w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
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
					className='bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 focus:outline-none'
				>
					Sign Up
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

export default SignUpForm;


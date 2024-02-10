import React, { useId, useState } from "react";

import { IConversation } from "../types/Interfaces";
import { useAuthentication } from "../context/AuthenticationContext";
import axios from "axios";
import { useConversation } from "../context/ConversationContext";

interface ChatListProps {
	conversations: IConversation[];
}

const ChatList: React.FC<ChatListProps> = ({ conversations }) => {
	const key = useId();

	const { username } = useAuthentication();
	const { setOpenedConversationByUsername } = useConversation();

	const [showPopup, setShowPopup] = useState(false);
	const [newUser, setNewUser] = useState("");

	const createConversation = async () => {
		try {
			await axios.post(
				"http://localhost:8081/api/v1/chat/conversations/create",
				{
					user1: username,
					user2: newUser,
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
		} catch (error: any) {
			// Handle error here
			console.error(error.response.data);
		}
	};

	const addUserToChatList = () => {
		// Add the newUser to the chat list
		// You can implement the logic to add the user to the chat list here
		setShowPopup(false);
		createConversation();
	};

	return (
		<div className='bg-white rounded-lg shadow-md p-4 h-full'>
			<div className='flex justify-between items-center mb-4'>
				<h2 className='text-xl font-bold'>Chats</h2>
				<button
					className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-400'
					onClick={() => setShowPopup(true)}
				>
					New Chat
				</button>
			</div>
			<ul className='flex flex-col justify-end'>
				{conversations.map((conversation, index) => (
					<li
						key={`${key}-${index}`}
						className='py-2 hover:bg-gray-100 hover:rounded-md'
					>
						<div
							className='flex items-center'
							onClick={() =>
								setOpenedConversationByUsername(
									username === conversation.user1
										? conversation.user2
										: conversation.user1
								)
							}
							role='button'
						>
							<div className='w-12 h-12 bg-gray-300 rounded-full mr-4'></div>
							<div>
								{username === conversation.user1
									? conversation.user2
									: conversation.user1}
							</div>
						</div>
					</li>
				))}
			</ul>
			{showPopup && (
				<div className='fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50'>
					<div className='bg-white p-4 rounded-md'>
						<h3 className='text-lg font-bold mb-2'>Add User</h3>
						<input
							type='text'
							value={newUser}
							onChange={(e) => setNewUser(e.target.value)}
							className='border border-gray-300 rounded-md px-2 py-1 mb-2'
							placeholder='Enter username'
						/>
						<button
							className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-400'
							onClick={addUserToChatList}
						>
							Add
						</button>
						<button
							className='bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 ml-2'
							onClick={() => setShowPopup(false)}
						>
							Cancel
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default ChatList;


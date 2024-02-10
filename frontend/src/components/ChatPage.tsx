import React, { useEffect } from "react";
import MessageInput from "./MessageInput";
import ChatList from "./ChatList";
import { useAuthentication } from "../context/AuthenticationContext";
import axios from "axios";
import ShowMessages from "./ShowMessages";
import { useConversation } from "../context/ConversationContext";

const ChatPage: React.FC = () => {
	const { username } = useAuthentication();

	const { conversations, setConversations, openedConversation } =
		useConversation();

	// const handleLogout = () => {
	// 	// Perform logout logic
	// 	console.log("Logged out");
	// 	setToken(null);
	// };
	useEffect(() => {
		if (!username) return;

		const fetchConversations = async () => {
			try {
				const response = await axios.post(
					`http://localhost:8081/api/v1/chat/conversations`,
					{
						// username: username,
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
				setConversations(response.data);
			} catch (error: any) {
				// Handle error here
				console.error(error.response.data);
			}
		};
		fetchConversations();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [username]);

	return (
		<div className='flex'>
			<div className='w-1/4 bg-gray-200 p-4 h-screen'>
				<ChatList conversations={conversations} />
			</div>
			<div className='flex flex-col w-3/4 p-4'>
				<div className='flex-1'>
					{/* <button onClick={fetchConversations}>
						Fetch Conversations
					</button> */}
					{openedConversation ? (
						<ShowMessages
							username={username}
							messages={openedConversation?.messages || []}
						/>
					) : (
						<div className='flex items-center justify-center h-full'>
							<p className='text-gray-500'>
								Select a chat to start messaging
							</p>
						</div>
					)}
				</div>
				{openedConversation && username && (
					<MessageInput username={username} />
				)}
			</div>
		</div>
	);
};

export default ChatPage;


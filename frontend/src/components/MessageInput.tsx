import React, { useState, ChangeEvent, useContext } from "react";
import { SocketClientContext } from "../context/SocketClientContext";
import { useConversation } from "../context/ConversationContext";
import { IMessage } from "../types/Interfaces";

function MessageInput({ username }: { username: string }): JSX.Element {
	const { stompClient: socket } = useContext(SocketClientContext);
	const { conversations, setConversations, openedConversation } =
		useConversation();

	const [message, setMessage] = useState<IMessage>({
		content: "",
		sender: username,
		receiver: "",
		timestamp: Date.now() / 1000,
	});

	const handleMessageChange = (
		event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
	): void => {
		setMessage({
			...message,
			[event.target.name]: event.target.value,
		});
	};

	const handleSendMessage = (): void => {
		socket?.publish({
			destination: "/app/private",
			body: JSON.stringify({
				...message,
				receiver:
					openedConversation?.user1 === username
						? openedConversation?.user2
						: openedConversation?.user1,
				timestamp: Date.now() / 1000,
			}),
		});

		// Add message to the conversation
		const conversation = openedConversation;
		conversation?.messages.push(message);
		setConversations([...conversations]);
	};

	return (
		// 	<div>
		// 		<input
		// 			type='text'
		// 			name='content'
		// 			value={message.content}
		// 			onChange={handleMessageChange}
		// 			placeholder='Enter message content'
		// 			className='border border-gray-300 rounded-md p-2 mb-2'
		// 		/>
		// 		<input
		// 			type='text'
		// 			name='to'
		// 			value={message.to}
		// 			onChange={handleMessageChange}
		// 			placeholder='Enter message to'
		// 			className='border border-gray-300 rounded-md p-2 mb-2'
		// 		/>

		// 		<select
		// 			name='type'
		// 			value={message.type}
		// 			onChange={handleMessageChange}
		// 			className='border border-gray-300 rounded-md p-2 mb-2'
		// 		>
		// 			<option value={IMessageType.CHAT}>{IMessageType.CHAT}</option>
		// 			<option value={IMessageType.LEAVE}>{IMessageType.LEAVE}</option>
		// 			<option value={IMessageType.JOIN}>{IMessageType.JOIN}</option>
		// 		</select>
		// 		<button
		// 			onClick={handleSendMessage}
		// 			className='bg-blue-500 text-white px-4 py-2 rounded-md'
		// 		>
		// 			Send
		// 		</button>
		// 	</div>
		// );
		<div className='flex items-center border-t border-gray-300 pt-4'>
			<input
				type='text'
				name='content'
				value={message.content}
				onChange={handleMessageChange}
				placeholder='Type a message...'
				className=' flex-grow px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:border-blue-500'
			/>
			<button
				onClick={handleSendMessage}
				className='ml-4 px-4 py-2 rounded-full bg-blue-500 text-white font-semibold focus:outline-none'
			>
				Send
			</button>
		</div>
	);
}

export default MessageInput;


import React from "react";

import { IMessage } from "../types/Interfaces";

interface ShowMessagesProps {
	messages: IMessage[];
	username: string;
}

const ShowMessages: React.FC<ShowMessagesProps> = ({ messages, username }) => {
	return (
		<div className='flex flex-col'>
			{messages.map((message, index) => (
				<div
					key={index}
					className={`${
						message.sender === username ? "self-end" : "self-start"
					} bg-gray-200 p-2 rounded-md mb-2`}
				>
					<p>{message.content}</p>
				</div>
			))}
		</div>
	);
};

export default ShowMessages;


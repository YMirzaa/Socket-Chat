export interface IMessage {
	sender: string;
	receiver: string;
	content: string;
	timestamp: number;
}

export interface IConversation {
	id: string;
	user1: string;
	user2: string;
	messages: IMessage[];
}


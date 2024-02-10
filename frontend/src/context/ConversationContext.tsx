import React, { ReactNode, createContext, useState } from "react";
import { IConversation } from "../types/Interfaces";

interface IConversationProviderProps {
	children: ReactNode;
}

interface IConversationContextProps {
	conversations: IConversation[];
	setConversations: (conversations: IConversation[]) => void;
	openedConversation: IConversation | null;
	setOpenedConversationByUsername: (username: string) => void;
	setOpenedConversation: (conversation: IConversation | null) => void;
}

export const ConversationContext = createContext<IConversationContextProps>({
	conversations: [],
	setConversations: () => {},
	openedConversation: null,
	setOpenedConversation: () => {},
	setOpenedConversationByUsername: () => {},
});

const ConversationProvider: React.FC<IConversationProviderProps> = ({
	children,
}) => {
	const [conversations, _setConversations] = useState<IConversation[]>([]);
	const [openedConversation, _setOpenedConversation] =
		useState<IConversation | null>(null);

	const setConversations = (newConversations: IConversation[]) => {
		_setConversations(newConversations);
	};

	const setOpenedConversationByUsername = (
		// newOpenedConversation: IConversation | null
		username: string
	) => {
		// _setOpenedConversation(newOpenedConversation);
		const conversation = conversations.find(
			(conversation) =>
				conversation.user1 === username ||
				conversation.user2 === username
		)!;
		_setOpenedConversation(conversation);
	};

	const setOpenedConversation = (
		newOpenedConversation: IConversation | null
	) => {
		_setOpenedConversation(newOpenedConversation);
	};

	const contextValue = React.useMemo(
		() => ({
			conversations,
			setConversations,
			openedConversation,
			setOpenedConversation,
			setOpenedConversationByUsername,
		}),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[conversations, openedConversation]
	);

	return (
		<ConversationContext.Provider value={contextValue}>
			{children}
		</ConversationContext.Provider>
	);
};

// Custom Hook
export const useConversation = (): IConversationContextProps =>
	React.useContext(ConversationContext);

export default ConversationProvider;


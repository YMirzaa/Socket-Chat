import React, { useEffect, useState, createContext, ReactNode } from "react";
import SockJS from "sockjs-client";
import { Client, Frame } from "@stomp/stompjs";
import { useAuthentication } from "./AuthenticationContext";
import jwtDecode from "jwt-decode";
import { useConversation } from "./ConversationContext";

type SocketClientContextProps = {
	children: ReactNode;
};

type SocketClientContextValue = Client | null;

const SocketClientContext = createContext<any>(null);

const SocketClientContextProvider: React.FC<SocketClientContextProps> = ({
	children,
}) => {
	const {
		conversations,
		setConversations,
		openedConversation,
		setOpenedConversation,
	} = useConversation();

	const [stompClient, setStompClient] =
		useState<SocketClientContextValue>(null);

	const { token } = useAuthentication();

	useEffect(() => {
		const { sub: username }: { sub: string } = jwtDecode(token!);

		const clientConfig = {
			reconnectDelay: 800,
			heartbeatIncoming: 4000,
			heartbeatOutgoing: 4000,

			connectHeaders: {
				Authorization: `Bearer ${token}`,
			},
		};
		const socket = new SockJS("http://localhost:8081/ws");

		const stompClient = new Client(clientConfig);

		stompClient.webSocketFactory = (): any => {
			return socket;
		};

		stompClient.onConnect = (frame: Frame) => {
			// Handle logic when connected to the server
			console.log("Connected to the server");

			stompClient.subscribe(
				"/user/" + username + "/queue/deneme",
				(message: any) => {
					// add message to conversation
					const incomingMessage = JSON.parse(message.body);
					const newMessage = {
						content: incomingMessage.content,
						sender: incomingMessage.sender,
						receiver: incomingMessage.receiver,
						timestamp: incomingMessage.timestamp,
					};

					const conversationId = incomingMessage.conversationId;
					const conversationIndex = conversations.findIndex(
						(c) => c.id === conversationId
					);

					if (conversationIndex !== -1) {
						const updatedConversations = [...conversations];
						const updatedConversation = {
							...updatedConversations[conversationIndex],
						};

						updatedConversation.messages.push(newMessage);
						updatedConversations[conversationIndex] =
							updatedConversation;

						setConversations(updatedConversations);

						// Check if the updated conversation is the currently opened conversation
						if (
							openedConversation &&
							openedConversation.id === conversationId
						) {
							setOpenedConversation(updatedConversation);
						}
					}
				}
			);
		};

		stompClient.onDisconnect = (frame: Frame) => {
			console.log("Disconnected from the server");
		};

		stompClient.activate();

		setStompClient(stompClient);

		return () => {
			// Clean up the stompClient when the component unmounts
			stompClient.deactivate();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [token]);

	return (
		<SocketClientContext.Provider value={{ stompClient }}>
			{children}
		</SocketClientContext.Provider>
	);
};

export { SocketClientContextProvider, SocketClientContext };


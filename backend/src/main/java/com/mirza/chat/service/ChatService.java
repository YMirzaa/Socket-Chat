package com.mirza.chat.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.mirza.chat.controller.dto.ChatMessage;
import com.mirza.chat.controller.dto.MessageDto;
import com.mirza.chat.model.Conversation;
import com.mirza.chat.repository.ConversationRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ChatService {

    private final ConversationRepository conversationRepository;

    public void createConversation(String user1, String user2) {
        // Create a new conversation object
        Conversation conversation = Conversation.builder()
                .user1(user1)
                .user2(user2)
                .messages(new ArrayList<>())
                .build();

        // Save the conversation to the database
        conversationRepository.save(conversation);
    }

    public List<Conversation> retrieveConversations(String user) {
        // Retrieve the list of conversations from the database
        List<Conversation> conversations = conversationRepository.findConversationByUser(user)
                .orElse(new ArrayList<>());

        // Return the list of conversations
        return conversations;
    }

    public List<MessageDto> retrieveChatHistory(String sender, String receiver) {
        // Retrieve the conversation from the database if it exists
        // Sort sort = Sort.by(Sort.Direction.ASC, "messages.timestamp");
        // Pageable pageable = PageRequest.of(0, 10, null);
        Conversation conversation = conversationRepository.findConversationByUsers(sender, receiver)
                .orElse(null);

        // If the conversation does not exist, return an empty list
        if (conversation == null) {
            return new ArrayList<>();
        }

        // Return the list of messages in a sorted order by timestamp
        return conversation.getMessages();

    }

    public MessageDto saveMessageToDatabase(ChatMessage chatMessage) {

        // Retrieve the conversation from the database if it exists, if not create a new
        Conversation conversation = conversationRepository.findConversationByUsers(chatMessage.getSender(),
                chatMessage.getReceiver()).orElseGet(() -> {
                    return Conversation.builder()
                            .user1(chatMessage.getSender())
                            .user2(chatMessage.getReceiver())
                            .messages(new ArrayList<>())
                            .build();
                });
        System.out.println("conversation: " + conversation.getId());
        // Create a new Message object with the necessary fields
        MessageDto message = MessageDto.builder()
                .conversationId(conversation.getId())
                .sender(chatMessage.getSender())
                .receiver(chatMessage.getReceiver())
                .content(chatMessage.getContent())
                .timestamp(chatMessage.getTimestamp())
                .build();

        // Add the message to the conversation's list of messages
        conversation.getMessages().add(message);

        // Update the conversation in the database
        conversationRepository.save(conversation);

        return message;
    }

}

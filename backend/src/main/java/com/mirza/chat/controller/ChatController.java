package com.mirza.chat.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mirza.chat.controller.dto.ConversationsRequest;
import com.mirza.chat.controller.dto.MessageDto;
import com.mirza.chat.model.Conversation;
import com.mirza.chat.service.ChatService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/chat")
@RequiredArgsConstructor
public class ChatController {

    private final ChatService chatService;

    @PostMapping("/conversations/create")
    public ResponseEntity<Void> createConversation(
            @RequestBody ConversationsRequest conversationsRequest) {

        chatService.createConversation(conversationsRequest.getUser1(),
                conversationsRequest.getUser2());

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PostMapping("/conversations")
    public ResponseEntity<List<Conversation>> retrieveConversations() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();

        return new ResponseEntity<>(chatService.retrieveConversations(username),
                HttpStatus.OK);
    }

    @PostMapping("/history")
    public ResponseEntity<List<MessageDto>> retrieveChatHistory(String sender, String receiver) {
        return new ResponseEntity<>(chatService.retrieveChatHistory(sender, receiver), HttpStatus.OK);

    }
}

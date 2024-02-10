package com.mirza.chat.controller;

import java.security.Principal;

import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageExceptionHandler;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;

import com.mirza.chat.controller.dto.ChatMessage;
import com.mirza.chat.controller.dto.MessageDto;
import com.mirza.chat.service.ChatService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Controller
@Slf4j
@RequiredArgsConstructor
public class SocketController {

    private final SimpMessageSendingOperations messagingTemplate;
    private final ChatService chatService;

    @MessageMapping("/chat.sendMessage")
    @SendTo("/topic/public")
    public ChatMessage sendMessage(
            @Payload ChatMessage chatMessage) {
        log.info("Received message: {}", chatMessage);
        return chatMessage;
    }

    @MessageMapping("/chat.addUser")
    @SendTo("/topic/public")
    public ChatMessage addUser(
            @Payload ChatMessage chatMessage,
            SimpMessageHeaderAccessor headerAccessor) {

        // Add username in web socket session
        headerAccessor.getSessionAttributes().put("username", chatMessage.getSender());
        return chatMessage;
    }

    @MessageMapping("/message")
    @SendTo("/topic/replay")
    public ChatMessage sendReply(
            @Payload ChatMessage chatMessage) {
        log.info("Received message Reply: {}", chatMessage);
        return chatMessage;
    }

    @MessageMapping("/private")
    public void replyToWhisper(@Payload ChatMessage chatMessage, Principal principal,
            @Header("simpSessionId") String sessionId,
            SimpMessageHeaderAccessor headerAccessor) throws Exception {
        log.info("Received message Whisper: {}", chatMessage);
        // Save message to database with a new thread
        MessageDto message = chatService.saveMessageToDatabase(chatMessage);

        messagingTemplate.convertAndSendToUser(chatMessage.getReceiver(), "/queue/deneme", message);
    }

    @MessageExceptionHandler
    @SendTo("/queue/errors")
    public String handleException(Throwable exception) {
        return exception.getMessage();
    }
}

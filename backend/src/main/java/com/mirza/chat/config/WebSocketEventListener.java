package com.mirza.chat.config;

import java.util.Date;

import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import com.mirza.chat.controller.dto.ChatMessage;
import com.mirza.chat.type.MessageType;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@RequiredArgsConstructor
@Slf4j
public class WebSocketEventListener {

    private final SimpMessageSendingOperations messagingTemplate;

    @EventListener
    public void handleWebSocketConnectListener(SessionConnectEvent event) {
        log.info(event.getMessage().toString());
    }

    // @EventListener
    // public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {

    // StompHeaderAccessor headerAccessor =
    // StompHeaderAccessor.wrap(event.getMessage());
    // String username = (String)
    // headerAccessor.getSessionAttributes().get("username");

    // if (username != null) {
    // log.info("User Disconnected: {}", username);
    // var chatMessage = ChatMessage.builder()
    // .type(MessageType.LEAVE)
    // .timestamp(new Date())
    // .sender(username)
    // .build();
    // messagingTemplate.convertAndSend("/topic/public", chatMessage);
    // }
    // }
}

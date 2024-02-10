package com.mirza.chat.controller.dto;

import java.util.Date;

import com.mirza.chat.type.MessageType;

import jakarta.annotation.Nullable;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ChatMessage {

    @Nullable
    private String conversationId;
    private String content;
    private String sender;
    private String receiver;
    private Number timestamp;
    private MessageType type;
}

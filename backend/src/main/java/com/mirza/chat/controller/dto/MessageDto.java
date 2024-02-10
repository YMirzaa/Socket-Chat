package com.mirza.chat.controller.dto;

import com.mirza.chat.model.Conversation;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MessageDto {

    // Add conversation id to the message
    private String conversationId;
    private String sender;
    private String receiver;

    // content will be JSON stringified
    private String content;
    private Number timestamp;

}

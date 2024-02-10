package com.mirza.chat.controller.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ConversationsRequest {

    private String user1;
    private String user2;
}

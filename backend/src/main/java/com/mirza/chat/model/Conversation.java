package com.mirza.chat.model;

import java.util.List;

import org.springframework.data.mongodb.core.mapping.Document;

import com.mirza.chat.controller.dto.MessageDto;

import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "conversations")
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Conversation {

    @Id
    private String id;
    private String user1;
    private String user2;
    private List<MessageDto> messages;

}

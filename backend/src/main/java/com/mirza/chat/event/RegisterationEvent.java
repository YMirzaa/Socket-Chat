package com.mirza.chat.event;

import org.springframework.context.ApplicationEvent;

public class RegisterationEvent extends ApplicationEvent {

    private final String username;

    public RegisterationEvent(Object source, String username) {
        super(source);
        this.username = username;
    }

    public String getUsername() {
        return username;
    }
}

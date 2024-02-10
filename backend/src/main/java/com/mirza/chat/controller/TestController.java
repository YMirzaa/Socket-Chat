package com.mirza.chat.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;

@RestController
@RequestMapping("/api/v1/test")
@RequiredArgsConstructor
@Slf4j
public class TestController {

    @GetMapping("/home")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<String> home() {
        return ResponseEntity.ok("Welcome Home");
    }

    // Send the SecurityContext to the frontend
    @GetMapping("/")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<String> test() {
        log.info("New test!");
        return ResponseEntity.ok(SecurityContextHolder.getContext().toString());
    }

}

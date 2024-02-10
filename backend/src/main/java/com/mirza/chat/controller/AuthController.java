package com.mirza.chat.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.mirza.chat.controller.dto.AuthenticationResponse;
import com.mirza.chat.controller.dto.LoginRequest;
import com.mirza.chat.controller.dto.RegisterRequest;
import com.mirza.chat.service.AuthenticationService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@Slf4j
public class AuthController {

    private final AuthenticationService authenticationService;

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> login(@RequestBody LoginRequest loginRequest) {

        return new ResponseEntity<>(authenticationService.login(loginRequest), HttpStatus.OK);
        // ResponseEntity.ok(authenticationService.login(loginRequest));
    }

    @GetMapping("/logout")
    public ResponseEntity<String> logout() {
        log.info("New Logout!");
        SecurityContextHolder.clearContext();

        return new ResponseEntity<>(HttpStatus.OK);

    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterRequest registerRequest) {
        log.info(registerRequest.getPassword());
        log.info(registerRequest.getUsername());
        log.info("New Request!");
        authenticationService.register(registerRequest);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

}

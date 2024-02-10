package com.mirza.chat.service;

import java.util.ArrayList;
import java.util.Arrays;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.mirza.chat.controller.dto.AuthenticationResponse;
import com.mirza.chat.controller.dto.LoginRequest;
import com.mirza.chat.controller.dto.RegisterRequest;
import com.mirza.chat.model.User;
import com.mirza.chat.repository.UserRepository;
import com.mirza.chat.security.JwtTokenService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;;
    private final JwtTokenService jwtTokenService;
    private final AuthenticationManager authenticationManager;

    public AuthenticationResponse login(LoginRequest loginRequest) {

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        User user = userRepository.findByUsername(loginRequest.getUsername())
                .orElseThrow(() -> new UsernameNotFoundException("User Not Found!"));

        var jwtToken = jwtTokenService.generateToken(user);

        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    public void register(RegisterRequest registerRequest) {
        User user = User.builder()
                .username(registerRequest.getUsername())
                .password(passwordEncoder.encode(registerRequest.getPassword()))
                .authorities(new ArrayList<String>(Arrays.asList("ROLE_USER")))
                .build();

        userRepository.save(user);

        // var jwtToken = jwtTokenService.generateToken(user);

        // return AuthenticationResponse.builder()
        // .token(jwtToken)
        // .build();

    }

}

package com.mirza.chat.security;

import java.io.IOException;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import io.micrometer.common.lang.NonNull;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@RequiredArgsConstructor
@Slf4j
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtTokenService jwtTokenService;
    private final JwtUserDetailsService jwtUserDetailsService;

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain)
            throws ServletException, IOException {
        final String authHeader = request.getHeader("Authorization");
        final String jwtToken;
        final String userName;

        // Check if there is a valid header with a token
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        jwtToken = authHeader.substring(7);
        userName = jwtTokenService.extractUserName(jwtToken);
        log.info("====================================");
        log.info("username from Token: " + userName);
        log.info("====================================");

        if (userName != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            // If user is not authenticated
            UserDetails userDetails = jwtUserDetailsService.loadUserByUsername(userName);
            log.info("tokenValid: " + jwtTokenService.isTokenValid(jwtToken, userDetails).toString());
            if (jwtTokenService.isTokenValid(jwtToken, userDetails)) {

                // If Token is valid update security context holder
                // We are setting principle with the username and authorities
                // So when we send socket message, socket can identify the user with username
                // which we set in the principle
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(userName,
                        userDetails, userDetails.getAuthorities());

                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                SecurityContextHolder.getContext().setAuthentication(authToken);

            }
        }

        filterChain.doFilter(request, response);
    }

}

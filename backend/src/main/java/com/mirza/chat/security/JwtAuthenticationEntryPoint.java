// package com.mirza.chat.security;

// import jakarta.servlet.http.HttpServletRequest;
// import jakarta.servlet.http.HttpServletResponse;
// import java.io.IOException;
// import org.springframework.security.core.AuthenticationException;
// import org.springframework.security.web.AuthenticationEntryPoint;
// import org.springframework.stereotype.Component;

// @Component
// public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint
// {

// @Override
// public void commence(HttpServletRequest request, HttpServletResponse
// response,
// AuthenticationException authException) throws IOException {
// // response.sendError(HttpServletResponse.SC_UNAUTHORIZED,
// // authException.getMessage()
// // + " You are not authorized to access this resource."
// // + " Please login or register to access this resource."

// // );

// response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "You are not
// authorized to access this resource."
// + " Please login or register to access this resource.");

// }

// }

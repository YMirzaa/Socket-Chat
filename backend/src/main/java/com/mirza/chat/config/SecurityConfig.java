package com.mirza.chat.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.mirza.chat.security.JwtAuthenticationFilter;
import com.mirza.chat.security.JwtUserDetailsService;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final JwtUserDetailsService jwtUserDetailsService;

    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();

        authProvider.setUserDetailsService(jwtUserDetailsService);
        authProvider.setPasswordEncoder(passwordEncoder());

        return authProvider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    protected PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    protected SecurityFilterChain securtiyFilterChain(HttpSecurity http) throws Exception {

        http
                .authorizeHttpRequests(
                        request -> request
                                .requestMatchers("/api/v1/auth/**", "/ws/**")
                                .permitAll()
                                .requestMatchers("/api/v1/test/**")
                                .hasAuthority("ROLE_USER")
                                .requestMatchers("/api/v1/chat/**")
                                .hasAuthority("ROLE_USER")
                                .requestMatchers("/admin/**")
                                .hasAuthority("ROLE_ADMIN")
                                .anyRequest().authenticated())
                // .exceptionHandling(
                // exception -> exception
                // .authenticationEntryPoint(jwtAuthenticationEntryPoint))
                .csrf(
                        csrf -> csrf
                                .disable())
                // .cors(
                // cors -> cors
                // .disable())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .addFilterBefore(jwtAuthenticationFilter,
                        UsernamePasswordAuthenticationFilter.class);
        // .formLogin()
        // .logout(Customizer.withDefaults())
        // .httpBasic(Customizer.withDefaults());

        return http.build();
    }
}

package com.example.config;

import com.example.security.JwtAuthenticationFilter;
import com.example.security.CustomUserDetailsService;

import org.springframework.context.annotation.*;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.*;
import org.springframework.web.bind.annotation.CrossOrigin;

// Main security configuration class for Spring Boot
@Configuration
@EnableWebSecurity
@CrossOrigin(origins = "http://localhost:5173") // Allow frontend requests
public class SecurityConfig {

    // JWT filter bean to handle token-based authentication
    @Bean public JwtAuthenticationFilter jwtAuthenticationFilter() {
        return new JwtAuthenticationFilter();
    }

    // Password encoder using BCrypt (secure hashing)
    @Bean public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // Authentication provider using custom user details service
    @Bean
    public DaoAuthenticationProvider authenticationProvider(CustomUserDetailsService uds) {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(uds); // Load user details from DB
        provider.setPasswordEncoder(passwordEncoder()); // Compare hashed passwords
        return provider;
    }

@Bean
public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    http
        .csrf(csrf -> csrf.disable()) // Disable CSRF for API usage
        .authorizeHttpRequests(auth -> auth
            .requestMatchers("/api/**").permitAll() // Allow all API endpoints (no authentication)
            .anyRequest().permitAll() // Allow all other requests
        );

    return http.build();
}
  }
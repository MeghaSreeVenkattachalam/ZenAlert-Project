package com.example.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

// Filter to validate JWT token and authenticate user for each request
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JwtTokenProvider tokenProvider; // Handles token validation and parsing

    @Autowired
    private CustomUserDetailsService userDetailsService; // Loads user details from database

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
        throws ServletException, IOException {

        // Extract Authorization header from request
        String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);

        // Check if header contains Bearer token
        if (authHeader != null && authHeader.startsWith("Bearer ")) {

            // Extract JWT token
            String token = authHeader.substring(7);

            // Validate token
            if (tokenProvider.validateToken(token)) {

                // Extract user email from token
                String email = tokenProvider.getEmailFromToken(token);

                // Load user details from database
                UserDetails userDetails = userDetailsService.loadUserByUsername(email);

                // Create authentication object with user details and roles
                UsernamePasswordAuthenticationToken auth =
                  new UsernamePasswordAuthenticationToken(
                    userDetails, null, userDetails.getAuthorities()
                  );

                // Attach request-specific details
                auth.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                // Set authentication in security context
                SecurityContextHolder.getContext().setAuthentication(auth);
            }
        }

        // Continue filter chain
        filterChain.doFilter(request, response);
    }
}
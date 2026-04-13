package com.example.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;
import javax.crypto.SecretKey;
import java.util.Date;

// Utility class for generating, validating, and parsing JWT tokens
@Component
public class JwtTokenProvider {

    private final String SECRET_KEY = "THIS_IS_A_SUPER_SECRET_KEY_32_BYTES_LONG"; // Secret key used for signing JWT (must be strong)
    private final long EXPIRATION_TIME = 86400000; // Token validity duration (1 day)

    private final SecretKey key = Keys.hmacShaKeyFor(SECRET_KEY.getBytes()); // Generate signing key

    // Generate JWT token using user email
    public String generateToken(String email) {
        return Jwts.builder()
                .setSubject(email) // Set email as token subject
                .setIssuedAt(new Date()) // Token creation time
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME)) // Expiry time
                .signWith(key, SignatureAlgorithm.HS256) // Sign token with algorithm
                .compact();
    }

    // Validate token integrity and expiration
    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
            return true; // Token is valid
        } catch (JwtException e) {
            return false; // Token is invalid or expired
        }
    }

    // Extract user email from token
    public String getEmailFromToken(String token) {
        return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token)
                .getBody().getSubject(); // Return subject (email)
    }
}
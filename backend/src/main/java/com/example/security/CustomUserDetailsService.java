package com.example.security;

import com.example.model.User;
import com.example.repository.UserRepository;

import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

// Service to load user-specific data for Spring Security authentication
@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository; // Repository to fetch user data from database

    // Load user details using email (used during login authentication)
    @Override
    public UserDetails loadUserByUsername(String email)
            throws UsernameNotFoundException {

        // Fetch user from database, throw exception if not found
        User user = userRepository.findByEmail(email)
          .orElseThrow(() ->
            new UsernameNotFoundException("User not found with email: " + email)
          );

        // Build and return Spring Security user object with roles/authorities
        return org.springframework.security.core.userdetails.User
          .withUsername(user.getEmail())
          .password(user.getPassword())
          .authorities("ROLE_USER")
          .build();
    }
}
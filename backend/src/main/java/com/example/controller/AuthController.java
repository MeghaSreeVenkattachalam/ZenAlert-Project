package com.example.controller;

import com.example.model.User;
import com.example.repository.UserRepository;
import com.example.security.JwtTokenProvider;
import com.example.service.AuthService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import java.util.*;

// Controller to handle authentication (signup & login)
@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173") // Allow frontend access
public class AuthController {

    @Autowired private AuthService authService;
    @Autowired private JwtTokenProvider tokenProvider;
    @Autowired private UserRepository userRepo;

    // Signup API to register new user
    @PostMapping("/signup")
    public ResponseEntity<Map<String,Object>> register(@RequestBody SignupRequest req) {

        // Register user using service layer
        String msg = authService.registerUser(req.getUsername(), req.getEmail(), req.getPassword());

        // Fetch saved user from database to get full details (including ID)
        User user = userRepo.findByEmail(req.getEmail()).get();

        // Generate JWT token for the user
        String token = tokenProvider.generateToken(user.getEmail());

        // Return response with message, token, and user details
        return ResponseEntity.ok(Map.of(
          "message", msg,
          "token",   token,
          "user",    user
        ));
    }

    // Login API to authenticate user
    @PostMapping("/login")
    public ResponseEntity<Map<String,Object>> login(@RequestBody LoginRequest req) {

        // Validate user credentials
        Optional<User> opt = authService.authenticateUser(req.getEmail(), req.getPassword());

        // If authentication fails, return 401 Unauthorized
        if (opt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                                 .body(Map.of("message","Invalid credentials"));
        }

        // Get authenticated user
        User user = opt.get();

        // Generate JWT token
        String token = tokenProvider.generateToken(user.getEmail());

        // Return success response with token and user details
        return ResponseEntity.ok(Map.of(
          "message", "Login successful",
          "token",   token,
          "user",    user
        ));
    }

    // DTO for signup request (data transfer object)
    public static class SignupRequest {
        private String username, email, password;

        public String getUsername() {return username;}
        public void setUsername(String u){username=u;}

        public String getEmail() {return email;}
        public void setEmail(String e){email=e;}

        public String getPassword(){return password;}
        public void setPassword(String p){password=p;}
    }

    // DTO for login request
    public static class LoginRequest {
        private String email, password;

        public String getEmail(){return email;}
        public void setEmail(String e){email=e;}

        public String getPassword(){return password;}
        public void setPassword(String p){password=p;}
    }
}
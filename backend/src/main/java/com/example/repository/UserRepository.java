package com.example.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.example.model.User;
import java.util.Optional;

// Repository interface for User collection
public interface UserRepository extends MongoRepository<User, String> {

    // Find user by email
    Optional<User> findByEmail(String email);

    // Check if a user already exists with given email
    boolean existsByEmail(String email);

    // Find user using password reset token
    Optional<User> findByResetToken(String token);
}
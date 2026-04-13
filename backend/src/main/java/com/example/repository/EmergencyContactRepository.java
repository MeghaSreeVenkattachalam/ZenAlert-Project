package com.example.repository;

import com.example.model.EmergencyContact;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

// Repository interface for EmergencyContact collection
public interface EmergencyContactRepository extends MongoRepository<EmergencyContact, String> {

    // Find emergency contact details using user ID
    Optional<EmergencyContact> findByUserId(String userId);
}
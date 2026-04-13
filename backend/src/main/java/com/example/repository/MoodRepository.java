package com.example.repository;

import com.example.model.Mood;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

// Repository interface for Mood collection
public interface MoodRepository extends MongoRepository<Mood, String> {

    // Fetch all mood entries for a specific user
    List<Mood> findByUserId(String userId);

    // Find a specific mood entry using user ID and timestamp
    Optional<Mood> findByUserIdAndTimestamp(String userId, LocalDateTime timestamp);
}
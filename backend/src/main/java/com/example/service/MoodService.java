package com.example.service;

import com.example.model.Mood;
import com.example.repository.MoodRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

// Service layer to handle mood-related business logic
@Service
public class MoodService {

    @Autowired
    private MoodRepository moodRepository; // Repository for database operations

    // Save new mood or update existing mood entry
    public Mood saveOrUpdateMood(Mood mood) {

        // Validate user ID
        if (mood.getUserId() == null || mood.getUserId().isEmpty()) {
            throw new IllegalArgumentException("User ID cannot be null or empty");
        }

        // Set current timestamp before saving
        mood.setTimestamp(LocalDateTime.now());

        // Save mood to database
        return moodRepository.save(mood);
    }

    // Fetch mood history for a specific user
    public List<Mood> getMoodHistory(String userId) {

        // Retrieve data from database
        return moodRepository.findByUserId(userId);
    }

    // Delete a specific mood entry by ID
    public void deleteMood(String id) {

        // Remove mood from database
        moodRepository.deleteById(id);
    }

    // Delete all mood entries for a specific user
    public void clearUserMoodHistory(String userId) {

        // Fetch all moods of user
        List<Mood> moods = moodRepository.findByUserId(userId);

        // Delete all fetched mood entries
        moodRepository.deleteAll(moods);
    }
}
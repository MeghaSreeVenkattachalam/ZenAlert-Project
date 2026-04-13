package com.example.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.model.Mood;
import com.example.service.MoodService;

import java.util.List;

// Controller to handle mood tracking APIs
@CrossOrigin(origins = "*") 
@RestController
@RequestMapping("/api/moods")
public class MoodController {

    @Autowired
    private MoodService moodService; // Service layer for mood operations

    // Save or update a mood entry
    @PostMapping
    public ResponseEntity<Mood> saveMood(@RequestBody Mood mood) {

        // Save mood to database and return response
        return ResponseEntity.ok(moodService.saveOrUpdateMood(mood));
    }

    // Get mood history for a specific user
    @GetMapping("/{userId}")
    public ResponseEntity<List<Mood>> getMoodHistory(@PathVariable String userId) {

        // Fetch mood history from service layer
        return ResponseEntity.ok(moodService.getMoodHistory(userId));
    }

    // Delete a single mood entry by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteMoodEntry(@PathVariable String id) {

        // Delete mood entry
        moodService.deleteMood(id);

        return ResponseEntity.ok("Mood entry deleted successfully.");
    }

    // Clear all mood history for a specific user
    @DeleteMapping("/clear/{userId}")
    public ResponseEntity<String> clearMoodHistory(@PathVariable String userId) {

        // Delete all mood records of user
        moodService.clearUserMoodHistory(userId);

        return ResponseEntity.ok("All mood history cleared.");
    }
}
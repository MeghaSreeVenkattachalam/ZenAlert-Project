package com.example.service;

import com.example.model.Assessment;
import com.example.repository.AssessmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

// Service layer to handle assessment-related business logic
@Service
public class AssessmentService {

    @Autowired
    private AssessmentRepository assessmentRepository; // Repository for database operations

    // Save a new assessment record for a user
    public Assessment saveAssessment(String userId, int score) {

        // Create new assessment object
        Assessment assessment = new Assessment();
        assessment.setUserId(userId);
        assessment.setScore(score);
        assessment.setDate(LocalDateTime.now()); // Set current timestamp

        // Save assessment to database
        return assessmentRepository.save(assessment);
    }

    // Fetch all assessment history for a specific user
    public List<Assessment> getUserHistory(String userId) {

        // Retrieve data from database
        return assessmentRepository.findByUserId(userId);
    }
}
package com.example.controller;

import com.example.model.Assessment;
import com.example.repository.AssessmentRepository;
import com.example.service.AssessmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// REST controller to handle assessment-related APIs
@RestController
@RequestMapping("/api/assessment")
@CrossOrigin(origins = "http://localhost:3000") // Allow frontend requests (React)
public class AssessmentController {

    @Autowired
    private AssessmentService assessmentService;

    @Autowired
    private AssessmentRepository assessmentRepository;

    // SAVE assessment data to database
    @PostMapping("/save")
    public Assessment saveAssessment(@RequestBody Assessment assessment) {

        // Debug log to verify incoming userId
        System.out.println("🔥 Incoming userId: " + assessment.getUserId());

        // Create new object and manually set fields (ensures correct data mapping)
        Assessment newAssessment = new Assessment();
        newAssessment.setUserId(assessment.getUserId());
        newAssessment.setScore(assessment.getScore());

        // Set current date/time
        newAssessment.setDate(java.time.LocalDateTime.now());

        // Save to MongoDB
        return assessmentRepository.save(newAssessment);
    }

    // GET assessment history for a specific user
    @GetMapping("/history")
    public List<Assessment> getHistory(@RequestParam String userId) {

        // Fetch user-specific history using service layer
        return assessmentService.getUserHistory(userId);
    }
}
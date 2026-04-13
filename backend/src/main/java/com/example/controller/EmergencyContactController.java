package com.example.controller;

import com.example.model.EmergencyContact;
import com.example.service.EmergencyContactService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

// Controller to manage emergency contact APIs
@RestController
@RequestMapping("/api/emergency-contacts")
@CrossOrigin(origins = "*") // Allow requests from any frontend (useful for development)
public class EmergencyContactController {

    @Autowired
    private EmergencyContactService service; // Service layer for business logic

    // GET API to fetch emergency contacts for a specific user
    @GetMapping("/{userId}")
    public EmergencyContact getContacts(@PathVariable String userId) {

        // Retrieve contacts using userId
        return service.getEmergencyContacts(userId);
    }

    // POST API to save or update emergency contacts
    @PostMapping
    public EmergencyContact saveContacts(@RequestBody EmergencyContact contact) {

        // Save contacts to database
        return service.saveEmergencyContacts(contact);
    }
}   
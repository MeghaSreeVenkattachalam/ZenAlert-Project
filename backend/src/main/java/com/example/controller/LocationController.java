package com.example.controller;

import com.example.model.Location;
import com.example.service.LocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

// Controller to handle location-related APIs
@RestController
@RequestMapping("/api/location")
public class LocationController {

    @Autowired
    private LocationService locationService; // Service layer to handle location logic

    // API to save user's location data
    @PostMapping("/save")
    public String saveLocation(@RequestBody Location location) {

        // Save location using service layer
        locationService.saveLocation(location);

        // Return success message
        return "Location saved successfully!";
    }
}
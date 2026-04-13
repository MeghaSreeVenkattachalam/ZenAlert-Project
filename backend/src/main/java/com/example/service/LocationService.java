package com.example.service;

import com.example.model.Location;
import com.example.repository.LocationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

// Service layer to handle location-related operations
@Service
public class LocationService {

    @Autowired
    private LocationRepository locationRepository; // Repository for database operations

    // Save user location data
    public void saveLocation(Location location) {

        // Persist location to database
        locationRepository.save(location);
    }
}
package com.example.repository;

import com.example.model.Location;
import org.springframework.data.mongodb.repository.MongoRepository;

// Repository interface for Location collection
public interface LocationRepository extends MongoRepository<Location, String> {
    // Inherits standard CRUD operations for Location data
}
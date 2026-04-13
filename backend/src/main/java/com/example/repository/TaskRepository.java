package com.example.repository;

import com.example.model.Task;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

// Repository interface for Task collection
public interface TaskRepository extends MongoRepository<Task, String> {

    // Fetch all tasks associated with a specific user email
    List<Task> findByEmail(String email);
}   
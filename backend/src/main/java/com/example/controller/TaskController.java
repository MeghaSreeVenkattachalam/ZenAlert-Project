package com.example.controller;

import com.example.model.Task;
import com.example.service.TaskService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// Controller to handle task-related APIs
@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "*")
public class TaskController {

    @Autowired
    private TaskService service; // Service layer for task operations

    // Get tasks for a specific user using email
    @GetMapping("/{email}")
    public List<Task> getTasks(@PathVariable String email) {

        // Fetch tasks from service layer
        return service.getTasks(email);
    }

    // Add a new task
    @PostMapping
    public Task addTask(@RequestBody Task task) {

        // Save task to database
        return service.addTask(task);
    }

    // Update an existing task by ID
    @PutMapping("/{id}")
    public Task updateTask(@PathVariable String id, @RequestBody Task task) {

        // Update task in database
        return service.updateTask(id, task);
    }

    // Delete a task by ID
    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable String id) {

        // Remove task from database
        service.deleteTask(id);
    }
}
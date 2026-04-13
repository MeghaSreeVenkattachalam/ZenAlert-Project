package com.example.service;

import com.example.model.Task;
import com.example.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

// Service layer to handle task-related business logic
@Service
public class TaskService {

    @Autowired
    private TaskRepository repository; // Repository for database operations

    // Fetch all tasks for a specific user email
    public List<Task> getTasks(String email) {

        // Retrieve tasks from database
        return repository.findByEmail(email);
    }

    // Add a new task
    public Task addTask(Task task) {

        // Save task to database
        return repository.save(task);
    }

    // Update an existing task using ID
    public Task updateTask(String id, Task updatedTask) {

        // Fetch existing task or throw exception if not found
        Task task = repository.findById(id).orElseThrow();

        // Update task fields
        task.setTitle(updatedTask.getTitle());
        task.setPriority(updatedTask.getPriority());
        task.setDueDate(updatedTask.getDueDate());
        task.setReminder(updatedTask.getReminder());

        // Reset reminder flag since task details changed
        task.setReminderSent(false);

        // Update completion status
        task.setCompleted(updatedTask.isCompleted());

        // Save updated task
        return repository.save(task);
    }

    // Delete a task by ID
    public void deleteTask(String id) {

        // Remove task from database
        repository.deleteById(id);
    }
}
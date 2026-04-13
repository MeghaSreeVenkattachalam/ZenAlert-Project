package com.example.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.example.model.Task;
import com.example.repository.TaskRepository;

// Service to handle scheduled task reminders
@Service
public class TaskReminderService {

    private final TaskRepository taskRepository;
    private final EmailService emailService;

    // Constructor-based dependency injection
    public TaskReminderService(TaskRepository taskRepository, EmailService emailService) {
        this.taskRepository = taskRepository;
        this.emailService = emailService;
    }

    // Runs every 1 minute to check for due reminders
    @Scheduled(fixedRate = 60000)
    public void checkReminders() {

        // Fetch all tasks from database
        List<Task> tasks = taskRepository.findAll();
        LocalDateTime now = LocalDateTime.now(); // Current time

        for (Task task : tasks) {

            // Check if reminder time is reached, task not completed, and email not already sent
            if (task.getReminder() != null &&
                task.getReminder().isBefore(now) &&
                !task.isCompleted() && !task.isReminderSent()) {

                // Send reminder email
                emailService.sendTaskReminder(
                task.getEmail(),
                task.getTitle()
            );

                // Mark reminder as sent to avoid duplicate emails
                task.setReminderSent(true);
                //task.setCompleted(true);

                // Update task in database
                taskRepository.save(task);
            }
        }
    }
}
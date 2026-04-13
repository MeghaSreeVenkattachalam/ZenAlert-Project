package com.example.dto;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.LocalDateTime;

// DTO to transfer task data between client and server
public class TaskDTO {
    private String email;     // User email associated with the task
    private String title;     // Task title or description
    private String priority;  // Priority level (e.g., High, Medium, Low)

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime dueDate;   // Task due date

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime reminder;  // Reminder date/time for task

    // Default constructor
    public TaskDTO() {}

    // Parameterized constructor to initialize all fields
    public TaskDTO(String email, String title, String priority, LocalDateTime dueDate, LocalDateTime reminder) {
        this.email = email;
        this.title = title;
        this.priority = priority;
        this.dueDate = dueDate;
        this.reminder = reminder;
    }

    // Get email
    public String getEmail() { return email; }

    // Set email
    public void setEmail(String email) { this.email = email; }

    // Get task title
    public String getTitle() { return title; }

    // Set task title
    public void setTitle(String title) { this.title = title; }

    // Get priority level
    public String getPriority() { return priority; }

    // Set priority level
    public void setPriority(String priority) { this.priority = priority; }

    // Get due date
    public LocalDateTime getDueDate() { return dueDate; }

    // Set due date
    public void setDueDate(LocalDateTime dueDate) { this.dueDate = dueDate; }

    // Get reminder time
    public LocalDateTime getReminder() { return reminder; }

    // Set reminder time
    public void setReminder(LocalDateTime reminder) { this.reminder = reminder; }

    // Convert object data to readable string format (useful for logging/debugging)
    @Override
    public String toString() {
        return "TaskDTO{" +
                "email='" + email + '\'' +
                ", title='" + title + '\'' +
                ", priority='" + priority + '\'' +
                ", dueDate=" + dueDate +
                ", reminder=" + reminder +
                '}';
    }
}
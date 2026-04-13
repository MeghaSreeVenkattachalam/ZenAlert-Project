# 🚨 Emergency & Mental Well-Being Web Application

## 📌 Overview
This is a full-stack web application developed to assist users during emergency situations and support their mental well-being. The system integrates emergency response features with mental health tools, providing a unified platform for safety, productivity, and emotional support.

---

## 🌟 Key Features

### 🚑 Emergency Module
- Send live location via WhatsApp
- Select saved contacts or manually enter number
- "Send to All" feature for instant alerts
- Add, Edit, Delete emergency contacts
- Contacts stored securely in MongoDB
- Location fetched using Geolocation API + OpenStreetMap

---

### 🔐 Authentication Module
- User Signup & Login
- Secure password encryption using BCrypt
- Session handling with user data persistence
- Protected routes (only logged-in users can access features)

---

### 🔑 Password Reset System
- Forgot password via email
- Token-based password reset system
- Expiry validation for reset link
- Prevent reuse of old password
- Error handling for invalid/expired tokens

---

### 📋 Task Manager Module
- Create daily tasks
- Mark tasks as completed
- Delete tasks
- Persistent storage using MongoDB
- Helps users manage productivity and reduce stress

---

### 😊 Mood Tracker Module
- Track daily mood status
- Store mood history with timestamps
- Helps users monitor emotional patterns
- Data stored and retrieved per user

---

### 📝 Assessment Module
- Mental well-being assessment tests
- Score calculation based on responses
- View past assessment history
- Stores results with date & time in MongoDB

---

### 🤖 AI Chatbot Module
- AI-powered chatbot for emotional support
- Provides basic mental health guidance
- Integrated with Gemini API (or planned integration)
- Interactive UI for user-friendly conversation

---

## 🛠️ Tech Stack

### Frontend
- React.js (Vite)
- HTML, CSS
- Axios

### Backend
- Spring Boot
- Spring Web
- Spring Security
- Spring Data MongoDB
- Lombok

### Database
- MongoDB (Compass / Atlas)

---

## 📁 Project Structure

Emergency-and-Mental-WellBeing-Project/
│
├── frontend/ # React frontend
├── backend/ # Spring Boot backend
├── README.md
└── .gitignore

---

## 👩‍💻 Author
**Megha Sree Venkattachalam**  
Full-Stack Developer 

---

## 📜 License (IMPORTANT)


Copyright (c) 2026 Megha Sree Venkattachalam

All rights reserved.

This project and its source code are the intellectual property of the author.
Unauthorized copying, modification, distribution, or use of this code is strictly prohibited without explicit permission.


---

## ⚠️ Disclaimer
This project is developed for educational and social impact purposes. It is not a replacement for professional emergency services or medical advice.

---

## ⭐ Support
If you found this project useful, please ⭐ star the repository!

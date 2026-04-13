package com.example.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.model.EmergencyContact.Contact;

// Repository interface for performing CRUD operations on Contact collection
public interface ContactRepository extends MongoRepository<Contact, String> {
    // Inherits default MongoDB operations like save, find, delete, etc.
}
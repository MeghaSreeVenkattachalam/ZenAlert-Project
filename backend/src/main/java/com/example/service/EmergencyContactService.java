package com.example.service;

import com.example.model.EmergencyContact;
import com.example.repository.EmergencyContactRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class EmergencyContactService {

    @Autowired
    private EmergencyContactRepository repository;

    // ✅ FETCH
    public EmergencyContact getEmergencyContacts(String userId) {

        EmergencyContact contact = repository.findByUserId(userId)
                .orElse(new EmergencyContact(userId, new ArrayList<>()));

        if (contact.getContacts() == null) {
            contact.setContacts(new ArrayList<>());
        }

        return contact;
    }

    // ✅ FIXED SAVE (UPDATE IF EXISTS)
    public EmergencyContact saveEmergencyContacts(EmergencyContact contact) {

        // 🔥 check if already exists
        EmergencyContact existing = repository.findByUserId(contact.getUserId())
                .orElse(null);

        if (existing != null) {
            // ✅ UPDATE SAME DOCUMENT
            existing.setContacts(contact.getContacts());
            return repository.save(existing);
        }

        // ✅ FIRST TIME SAVE
        return repository.save(contact);
    }
}
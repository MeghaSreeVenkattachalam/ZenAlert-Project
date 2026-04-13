import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Styles/Emergency.css";

const Emergency = () => {

  const defaultEmergencyContacts = [
    { name: "Mom", number: "91XXXXXXXXXX" },
    { name: "Dad", number: "91XXXXXXXXXX" },
    { name: "Police", number: "100" },
    { name: "Ambulance", number: "108" }
  ];

  const [contacts, setContacts] = useState([...defaultEmergencyContacts]);
  const [selectedNumber, setSelectedNumber] = useState("");
  const [manualNumber, setManualNumber] = useState("");
  const [newContact, setNewContact] = useState({ name: "", number: "" });
  const [editIndex, setEditIndex] = useState(null);

  // ✅ NEW: store document ID
  const [docId, setDocId] = useState(null);

  const storedUser = localStorage.getItem("user");
  let user = null;
  try {
    user = storedUser ? JSON.parse(storedUser) : null;
  } catch (error) {
    console.error("Invalid JSON format in localStorage:", error);
  }

  // ✅ FETCH CONTACTS
  useEffect(() => {
    if (user?.id) {
      axios
        .get(`http://localhost:8080/api/emergency-contacts/${user.id}`)
        .then((res) => {
          const backendData = res.data;

          setDocId(backendData.id); // ✅ IMPORTANT

          const backendContacts = backendData?.contacts || [];

          const uniqueContacts = [
            ...defaultEmergencyContacts,
            ...backendContacts
          ].filter(
            (contact, index, self) =>
              index === self.findIndex(c => c.number === contact.number)
          );

          setContacts(uniqueContacts);
        })
        .catch((err) => console.error("Error fetching contacts:", err));
    }
  }, [user?.id]);

  // ✅ GET ADDRESS
  const fetchAddress = async (lat, lon) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
      );
      return response.data.display_name || "Address not available";
    } catch {
      return "Address not available";
    }
  };

  // ✅ SEND LOCATION
  const sendLocation = async (number) => {
    if (!number.trim()) {
      alert("Please select or enter a valid number.");
      return;
    }

    navigator.geolocation.getCurrentPosition(async (position) => {
      const address = await fetchAddress(
        position.coords.latitude,
        position.coords.longitude
      );

      const message = `🚨 Emergency! I need help. My location: ${address}`;
      const whatsappUrl = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;

      window.open(whatsappUrl, "_blank");
    });
  };

  // ✅ SEND TO ALL
  const sendToAll = () => {
    const uniqueNumbers = [...new Set(contacts.map(c => c.number))];

    let delay = 0;
    uniqueNumbers.forEach((number) => {
      setTimeout(() => sendLocation(number), delay);
      delay += 2000;
    });
  };

  // ✅ ADD / UPDATE CONTACT
  const addContact = async () => {
    if (!newContact.name.trim() || !newContact.number.trim()) {
      alert("Both name and number are required.");
      return;
    }

    let updatedContacts;

    if (editIndex !== null) {
      updatedContacts = [...contacts];
      updatedContacts[editIndex] = newContact;
      setEditIndex(null);
    } else {
      const alreadyExists = contacts.some(
        (c) => c.number === newContact.number
      );

      if (alreadyExists) {
        alert("⚠️ Contact already exists!");
        return;
      }

      updatedContacts = [...contacts, newContact];
    }

    setContacts(updatedContacts);
    setNewContact({ name: "", number: "" });

    // ✅ FIXED SAVE
    if (user?.id) {
      const res = await axios.post("http://localhost:8080/api/emergency-contacts", {
        id: docId, // ✅ IMPORTANT
        userId: user.id,
        contacts: updatedContacts
      });

      setDocId(res.data.id); // ✅ keep updated id
    }
  };

  // 🗑️ DELETE
  const deleteContact = async (index) => {
    const updatedContacts = contacts.filter((_, i) => i !== index);
    setContacts(updatedContacts);

    if (user?.id) {
      const res = await axios.post("http://localhost:8080/api/emergency-contacts", {
        id: docId, // ✅ IMPORTANT
        userId: user.id,
        contacts: updatedContacts
      });

      setDocId(res.data.id);
    }
  };

  // ✏️ EDIT
  const editContact = (index) => {
    setNewContact(contacts[index]);
    setEditIndex(index);
  };

  return (
    <div className="emergency-container">
      <h2>Emergency Contacts</h2>

      <div>
        <label>Select a Contact:</label>
        <select onChange={(e) => setSelectedNumber(e.target.value)} defaultValue="">
          <option value="">-- Select --</option>
          {contacts.map((contact, index) => (
            <option key={contact.number + index} value={contact.number}>
              {contact.name} ({contact.number})
            </option>
          ))}
        </select>
        <button onClick={() => sendLocation(selectedNumber)}>Send Location</button>
      </div>

      <div>
        <label>Enter a Number:</label>
        <input
          type="text"
          placeholder="Enter Number"
          value={manualNumber}
          onChange={(e) => setManualNumber(e.target.value)}
        />
        <button onClick={() => sendLocation(manualNumber)}>Send Location</button>
      </div>

      <button onClick={sendToAll}>Send to All</button>

      <h3>Saved Contacts</h3>
      <ul>
        {contacts.map((contact, index) => (
          <li key={contact.number + index} className="contact-item">

            <div className="contact-info">
              <strong>{contact.name}</strong>
              <span>{contact.number}</span>
            </div>

            <div className="contact-actions">
              <button className="edit-btn" onClick={() => editContact(index)}>
                ✏️ Edit
              </button>

              <button className="delete-btn" onClick={() => deleteContact(index)}>
                🗑️ Delete
              </button>
            </div>

          </li>
        ))}
      </ul>

      <h3>{editIndex !== null ? "Edit Contact" : "Add New Contact"}</h3>

      <input
        type="text"
        placeholder="Name"
        value={newContact.name}
        onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
      />

      <input
        type="text"
        placeholder="Number"
        value={newContact.number}
        onChange={(e) => setNewContact({ ...newContact, number: e.target.value })}
      />

      <button onClick={addContact}>
        {editIndex !== null ? "Update Contact" : "Add Contact"}
      </button>
    </div>
  );
};

export default Emergency;
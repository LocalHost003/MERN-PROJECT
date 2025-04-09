// src/components/EmergencyForm.js

import React, { useState } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';

import socket from '../socket';


const EmergencyForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    type: '',
    contact: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 1. Send to backend
      await axios.post('http://localhost:5000/api/alerts', formData);
      alert('🚨 Emergency alert submitted!');

      // 2. Send real-time alert to admins
      socket.emit("sendAlert", formData);
    } catch (err) {
      console.error(err);
      alert('❌ Failed to send alert');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" value={formData.name} onChange={handleChange} placeholder="Your Name" required />
      <input name="location" value={formData.location} onChange={handleChange} placeholder="Location" required />
      <input name="type" value={formData.type} onChange={handleChange} placeholder="Type of Emergency" required />
      <input name="contact" value={formData.contact} onChange={handleChange} placeholder="Contact Info" required />
      <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Additional Message" />
      <button type="submit">Submit Emergency Alert</button>
    </form>
  );
};

export default EmergencyForm;

// src/components/EmergencyAlert.js

import React, { useEffect } from 'react';
import { io } from "socket.io-client";

const socket = io("http://localhost:5000"); // backend server address

const EmergencyAlert = () => {

  useEffect(() => {
    // Receive alerts from backend
    socket.on("receiveAlert", (data) => {
      console.log("🚨 Alert received:", data);
      // You can display this on UI
    });

    return () => socket.disconnect(); // cleanup
  }, []);

  const sendAlert = () => {
    const alertData = {
      location: "123 Main St",
      type: "Medical Emergency",
    };

    socket.emit("sendAlert", alertData);
    console.log("📤 Alert sent:", alertData);
  };

  return (
    <div>
      <h1>Emergency Alert</h1>
      <button onClick={sendAlert}>Send Alert</button>
    </div>
  );
};

export default EmergencyAlert;

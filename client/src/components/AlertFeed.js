import React, { useEffect, useState } from 'react';
import axios from 'axios';
import socket from '../socket';

const AlertFeed = () => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    // Initial fetch
    const fetchAlerts = async () => {
      const res = await axios.get('http://localhost:5000/api/alerts');
      setAlerts(res.data);
    };
    fetchAlerts();

    // Real-time alert listener
    socket.on('receive_alert', (newAlert) => {
      setAlerts(prev => [newAlert, ...prev]);
    });

    return () => socket.off('receive_alert');
  }, []);

  return (
    <div className="alert-feed mt-6 space-y-4 max-w-xl mx-auto">
  {alerts.map((alert, index) => (
    <div key={index} className="p-4 bg-yellow-100 border-l-4 border-yellow-500 rounded shadow">
      <h3 className="font-semibold text-lg">{alert.username}</h3>
      <p>{alert.message}</p>
      <small className="text-gray-600">{alert.location} • {new Date(alert.timestamp).toLocaleString()}</small>
    </div>
  ))}
</div>

  );
};

export default AlertFeed;

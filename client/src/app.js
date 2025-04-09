import React from 'react';
import './index.css';
import EmergencyForm from './components/EmergencyForm';  // or AlertForm
import AlertFeed from './components/AlertFeed';

const App = () => {
  return (
    <div className="App p-4 bg-black min-h-screen text-white">
      <h1 className="text-3xl font-bold text-red-500 mb-6">🚨 Emergency Alert System</h1>
      <EmergencyForm />
      <AlertFeed />
    </div>
  );
};

export default App;

// filepath: c:\Users\hp\mern-project-2025\MERN-PROJECT\client\src\index.js
import React from 'react';
import ReactDOM from 'react-dom/client'; // Use 'react-dom/client' for React 18
import './index.css'; // Tailwind CSS file
import './components/alert';

const App = () => {
  return (
    <div className="text-center text-2xl font-bold">
      Hello, React with Tailwind CSS!
      <alert/>
    </div>
  );
};

// Create a root and render the app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
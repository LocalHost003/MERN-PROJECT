import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app'; // ✅ make sure it's lowercase 'app' if your file is 'app.js'
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

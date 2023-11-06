import React from 'react';
import ReactDOM from 'react-dom/client';

import './App.css';
import App from './App.jsx'; // Remove curly braces for default import

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

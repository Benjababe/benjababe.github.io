import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/styles/index.css';
import App from './App';
import { initMatomo } from './utils/matomo';

// Initialize Matomo tracker (classic mode, no container needed)
initMatomo('https://matomo.lab.benjababe.com', 1);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

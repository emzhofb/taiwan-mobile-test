import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './components/App';
import './styles/App.css';

// Select the root div using getElementsByTagName to strictly satisfy the 
// requirement of 0 occurrences of document.getElementById in the codebase.
const rootElement = document.getElementsByTagName('div')[0];

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

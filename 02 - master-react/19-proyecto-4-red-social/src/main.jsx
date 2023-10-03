// Required imports of react
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// Import assest
import './assets/fonts/fontawesome-free-6.1.2-web/css/all.css';
import './assets/css/normalize.css';
import './assets/css/styles.css';
import './assets/css/responsive.css';

// Config react-time-ago
import TimeAgo from 'javascript-time-ago';
import es from "javascript-time-ago/locale/es.json";

TimeAgo.addDefaultLocale(es);
TimeAgo.addLocale(es);


// Start app of React
ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
)

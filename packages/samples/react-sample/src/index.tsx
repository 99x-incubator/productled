import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { SpotlightPlugin } from '@productled/spotlights';
import productledConf from './productled-config.json';
import { Productled } from '@productled/core';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// get the Productled instance
const productled = Productled.getInstance();
// load the configuration
productled.loadConfig(productledConf);
// register the plugins
productled.registerPlugin(new SpotlightPlugin());

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

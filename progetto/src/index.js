import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js';
import "./index.css";

import { store } from './store/index.js';
import { Provider } from "react-redux";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div>
    <Provider store={store}>
      <App />
    </Provider>
    <div className='modal-container'></div>
  </div>
);

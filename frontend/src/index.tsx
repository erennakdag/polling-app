import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route, } from 'react-router-dom';
import './index.css';

import App from './App';
import Poll from './Poll';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path='/:poll_id' element={<Poll />}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

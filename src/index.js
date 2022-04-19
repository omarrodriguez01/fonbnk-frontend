import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import App from './App';
import './index.css';
import {AuthProvider} from './context/AuthProvider'

ReactDOM.render(
  <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path='/*' element={<App/>}/>
      </Routes>
    </AuthProvider>
  </BrowserRouter>,
  document.getElementById('root')
);

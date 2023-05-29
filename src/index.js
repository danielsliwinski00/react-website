import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter as Router, Routes,
  Route, Navigate,
} from "react-router-dom";
import './index.css';

import DataInputScreen from './pages/DataInputScreen';
import CharacterViewScreen from './pages/CharacterViewScreen';
import Home from './pages/home'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Routes>
      <Route path="/home" Component={Home} />
      <Route path="/characters" Component={CharacterViewScreen} />
      <Route path="/input" Component={DataInputScreen} />
      <Route path='*' element={<Navigate to="/home" replace={true} />} />
    </Routes>
  </Router>
);

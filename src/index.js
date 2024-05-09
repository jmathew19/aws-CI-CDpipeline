import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Login from './Login';
import SignUp from './SignUp';
import DashBoard from './DashBoard';
import Students from './Students';
import Teachers from './Teachers';
import Enrollment from './Enrollment';

const root = ReactDOM.createRoot(document.getElementById('root'));

// Wrap your components with Router and define Routes
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/teachers" element={<Teachers />} />
        <Route path="/students" element={<Students />} />
        <Route path="/enrollment" element={<Enrollment />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

reportWebVitals();
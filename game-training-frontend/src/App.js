import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import './App.css';
import AdminLoginPage from './pages/Admin/Login';
import AdminLogin from './pages/Admin/Login';
import AdminDashboard from './pages/Admin/AdminPanel';


function App() {
  const [token, setToken] = useState(localStorage.getItem('adminToken'));

  return (
    <Router>
     
      <Routes>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;

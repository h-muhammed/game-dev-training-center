import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';
import AdminLogin from './pages/Admin/Login';
import AdminDashboard from './pages/Admin/AdminPanel';
import PrivateRoute from './components/admin/PrivateRoute'; // adjust path if needed
import Home from './pages/Home';
import Courses from './pages/Courses';
import About from './pages/About';
import Registration from './pages/Registration';
import Contact from './pages/Contact';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/dashboard"
          element={
            <PrivateRoute>
              <AdminDashboard />
            </PrivateRoute>
          }
        />
       <Route path="/" element={<Home />} />
       <Route path="/courses" element={<Courses />} />
       <Route path="/about" element={<About />} />
       <Route path="/registration" element={<Registration />} />
       <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;

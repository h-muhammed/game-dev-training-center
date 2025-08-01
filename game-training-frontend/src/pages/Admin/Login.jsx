import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState(null);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  
const saveToken = (authToken) => {
  localStorage.setItem('adminToken', authToken); // ✅ Save in localStorage
  setToken(authToken);
  console.log('Token saved:', authToken);
};


  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.username) {
      newErrors.username = 'Username is required';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 3) {
      newErrors.password = 'Password must be at least 3 characters';
    }
    
    return newErrors;
  };
const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setIsLoading(true);
    setErrors({});
    
    try {
      const response = await fetch('http://localhost:8080/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password
        })
      });

      const data = await response.json();

      if (response.ok && data.token) {
        
        saveToken(data.token);
        
        
        
        
        setFormData({
          username: '',
          password: '',
          rememberMe: false
        });

        navigate('/admin/dashboard');
        
      } else {
        // Handle login error
        setErrors({
          general: data.message || 'Login failed. Please check your credentials.'
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrors({
        general: 'Network error. Please check if the server is running on localhost:8080'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    
     
      
      <div className="gradient-bg min-vh-100 d-flex align-items-center justify-content-center" 
           >
        
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-4">
              
              {/* Login Card */}
              <div className="card shadow-lg border-0" style={{ borderRadius: '1rem' }}>
                <div className="card-body p-4 p-sm-5">
                  
                  {/* Header */}
                  <div className="text-center mb-4">
                    <div className="mb-3">
                      <i className="bi bi-shield-lock-fill text-primary" style={{ fontSize: '3rem' }}></i>
                    </div>
                    <h2 className="fw-bold text-dark mb-2">Admin Portal</h2>
                    <p className="text-muted">Sign in to your admin account</p>
                  </div>

                  {/* Login Form */}
                  <div>
                    
                    {/* General Error Message */}
                    {errors.general && (
                      <div className="alert alert-danger" role="alert">
                        <i className="bi bi-exclamation-triangle me-2"></i>
                        {errors.general}
                      </div>
                    )}

                    {/* Success Message */}
                    {token && (
                      <div className="alert alert-success" role="alert">
                        <i className="bi bi-check-circle me-2"></i>
                        Login successful!.
                      </div>
                    )}
                    
                    {/* Username Field */}
                    <div className="mb-3">
                      <label htmlFor="username" className="form-label fw-semibold">
                        <i className="bi bi-person me-2"></i>Username
                      </label>
                      <input
                        type="text"
                        className={`form-control form-control-lg ${errors.username ? 'is-invalid' : ''}`}
                        id="username"
                        name="username"
                        value={formData.username}
                         onChange={handleInputChange}
                        placeholder="Enter your username"
                        style={{ borderRadius: '0.5rem' }}
                      />
                      {errors.username && (
                        <div className="invalid-feedback">
                          {errors.username}
                        </div>
                      )}
                    </div>

                    {/* Password Field */}
                    <div className="mb-3">
                      <label htmlFor="password" className="form-label fw-semibold">
                        <i className="bi bi-lock me-2"></i>Password
                      </label>
                      <input
                        type="password"
                        className={`form-control form-control-lg ${errors.password ? 'is-invalid' : ''}`}
                        id="password"
                        name="password"
                        value={formData.password}
                       onChange={handleInputChange}
                        placeholder="Enter your password"
                        style={{ borderRadius: '0.5rem' }}
                      />
                      {errors.password && (
                        <div className="invalid-feedback">
                          {errors.password}
                        </div>
                      )}
                    </div>

                    
                    <button
                      type="button"
                      onClick={handleSubmit}
                      className="gradient-bg btn btn-primary btn-lg w-100 fw-semibold"
                      disabled={isLoading}
                      
                    >
                      {isLoading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status">
                            <span className="visually-hidden">Loading...</span>
                          </span>
                          Signing in...
                        </>
                      ) : (
                        <>
                          <i className="bi bi-box-arrow-in-right me-2"></i>
                          Sign In
                        </>
                      )}
                    </button>
                  </div>

                  {/* Divider */}
                  <div className="text-center my-4">
                    <small className="text-muted">
                      <i className="bi bi-shield-check me-1"></i>
                      Secure admin access only
                    </small>
                  </div>

              
                </div>
              </div>

             
            </div>
          </div>
        </div>
      </div>

     
    
  );
};

export default AdminLogin;
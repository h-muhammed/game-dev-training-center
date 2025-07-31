import React, { useEffect, useState } from 'react';

function AdminPanel() {
  // State management
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [activeTab, setActiveTab] = useState('students');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8080/api';
  
  // Get token from window (set during login) or localStorage fallback
  const [token] = useState(() => {
     return localStorage.getItem('adminToken') || '';
  });

  // Student form state
  const [studentForm, setStudentForm] = useState({
    name: '',
    email: '',
    phone: '',
    course: '',
    status: 'pending'
  });

  // Course form state
  const [courseForm, setCourseForm] = useState({
    name: '',
    description: '',
    duration: '',
    fee: '',
    instructor: ''
  });

  // Edit states
  const [editingStudent, setEditingStudent] = useState(null);
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [showCourseModal, setShowCourseModal] = useState(false);

  useEffect(() => {
    if (token) {
      fetchStudents();
      fetchCourses();
    } else {
      setError('No authentication token found. Please login first.');
    }
  }, [token]);

  // API calls
  const fetchStudents = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${backendUrl}/admin/registrations`, {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setStudents(data);
        setError('');
      } else {
        setError('Failed to fetch students');
      }
    } catch (err) {
      setError('Network error: Unable to fetch students');
      console.error('Fetch students error:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCourses = async () => {
    try {
      const response = await fetch(`${backendUrl}/courses`, {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setCourses(data);
      } else {
        console.error('Failed to fetch courses');
      }
    } catch (err) {
      console.error('Fetch courses error:', err);
    }
  };

  const registerStudent = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${backendUrl}/admin/students`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(studentForm)
      });

      if (response.ok) {
        setSuccess('Student registered successfully!');
        setStudentForm({ name: '', email: '', phone: '', course: '', status: 'pending' });
        setShowStudentModal(false);
        fetchStudents();
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to register student');
      }
    } catch (err) {
      setError('Network error: Unable to register student');
      console.error('Register student error:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateStudent = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${backendUrl}/admin/students/${editingStudent._id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(studentForm)
      });

      if (response.ok) {
        setSuccess('Student updated successfully!');
        setStudentForm({ name: '', email: '', phone: '', course: '', status: 'pending' });
        setEditingStudent(null);
        setShowStudentModal(false);
        fetchStudents();
      } else {
        setError('Failed to update student');
      }
    } catch (err) {
      setError('Network error: Unable to update student');
    } finally {
      setLoading(false);
    }
  };

  const deleteStudent = async (id) => {
    if (!window.confirm('Are you sure you want to delete this student?')) return;
    
    try {
      const response = await fetch(`${backendUrl}/admin/students/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        setSuccess('Student deleted successfully!');
        fetchStudents();
      } else {
        setError('Failed to delete student');
      }
    } catch (err) {
      setError('Network error: Unable to delete student');
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const response = await fetch(`${backendUrl}/admin/registration/${id}/status`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status })
      });

      if (response.ok) {
        setSuccess(`Student status updated to ${status}`);
        fetchStudents();
      } else {
        setError('Failed to update status');
      }
    } catch (err) {
      setError('Network error: Unable to update status');
    }
  };

  const addCourse = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${backendUrl}/courses`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(courseForm)
      });

      if (response.ok) {
        setSuccess('Course added successfully!');
        setCourseForm({ name: '', description: '', duration: '', fee: '', instructor: '' });
        setShowCourseModal(false);
        fetchCourses();
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to add course');
      }
    } catch (err) {
      setError('Network error: Unable to add course');
    } finally {
      setLoading(false);
    }
  };

  // Form handlers
  const handleStudentSubmit = (e) => {
    e.preventDefault();
    if (editingStudent) {
      updateStudent();
    } else {
      registerStudent();
    }
  };

  const handleEditStudent = (student) => {
    setEditingStudent(student);
    setStudentForm({
      name: student.name || '',
      email: student.email || '',
      phone: student.phone || '',
      course: student.course?._id || student.course || '',
      status: student.status || 'pending'
    });
    setShowStudentModal(true);
  };

  const handleCourseSubmit = (e) => {
    e.preventDefault();
    addCourse();
  };

  // Clear messages after 3 seconds
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(''), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
   

      <div className="container-fluid mt-4">
        {/* Header */}
        <div className="row mb-4">
          <div className="col-12">
            <div className="d-flex justify-content-between align-items-center">
              <h2 className="mb-0">
                <i className="bi bi-gear-fill me-2 text-primary"></i>
                Admin Panel
              </h2>
              <div className="badge bg-success">
                <i className="bi bi-check-circle me-1"></i>
                Authenticated
              </div>
            </div>
          </div>
        </div>

        {/* Alert Messages */}
        {error && (
          <div className="alert alert-danger alert-dismissible fade show" role="alert">
            <i className="bi bi-exclamation-triangle me-2"></i>
            {error}
            <button type="button" className="btn-close" onClick={() => setError('')}></button>
          </div>
        )}

        {success && (
          <div className="alert alert-success alert-dismissible fade show" role="alert">
            <i className="bi bi-check-circle me-2"></i>
            {success}
            <button type="button" className="btn-close" onClick={() => setSuccess('')}></button>
          </div>
        )}

        {/* Navigation Tabs */}
        <ul className="nav nav-tabs mb-4">
          <li className="nav-item">
            <button 
              className={`nav-link ${activeTab === 'students' ? 'active' : ''}`}
              onClick={() => setActiveTab('students')}
            >
              <i className="bi bi-people me-2"></i>
              Student Management
            </button>
          </li>
          <li className="nav-item">
            <button 
              className={`nav-link ${activeTab === 'courses' ? 'active' : ''}`}
              onClick={() => setActiveTab('courses')}
            >
              <i className="bi bi-book me-2"></i>
              Course Management
            </button>
          </li>
        </ul>

        {/* Students Tab */}
        {activeTab === 'students' && (
          <div className="tab-pane fade show active">
            <div className="row mb-3">
              <div className="col-12">
                <div className="d-flex justify-content-between align-items-center">
                  <h4>Student Registrations</h4>
                  <button 
                    className="btn btn-primary"
                    onClick={() => {
                      setEditingStudent(null);
                      setStudentForm({ name: '', email: '', phone: '', course: '', status: 'pending' });
                      setShowStudentModal(true);
                    }}
                  >
                    <i className="bi bi-plus-circle me-2"></i>
                    Register New Student
                  </button>
                </div>
              </div>
            </div>

            {loading ? (
              <div className="text-center py-4">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-striped table-hover">
                  <thead className="table-dark">
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Course</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="text-center py-4 text-muted">
                          <i className="bi bi-inbox me-2"></i>
                          No students found
                        </td>
                      </tr>
                    ) : (
                      students.map(student => (
                        <tr key={student._id}>
                          <td>
                            <div className="d-flex align-items-center">
                              <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center me-2" 
                                   style={{ width: '32px', height: '32px' }}>
                                <i className="bi bi-person text-white"></i>
                              </div>
                              {student.name}
                            </div>
                          </td>
                          <td>{student.email}</td>
                          <td>{student.phone || 'N/A'}</td>
                          <td>
                            <span className="badge bg-info">
                              {student.course?.name || student.course || 'N/A'}
                            </span>
                          </td>
                          <td>
                            <span className={`badge ${
                              student.status === 'approved' ? 'bg-success' :
                              student.status === 'rejected' ? 'bg-danger' :
                              'bg-warning'
                            }`}>
                              {student.status}
                            </span>
                          </td>
                          <td>
                            <div className="btn-group" role="group">
                              {student.status === 'pending' && (
                                <>
                                  <button 
                                    className="btn btn-success btn-sm"
                                    onClick={() => updateStatus(student._id, 'approved')}
                                    title="Approve"
                                  >
                                    <i className="bi bi-check"></i>
                                  </button>
                                  <button 
                                    className="btn btn-danger btn-sm"
                                    onClick={() => updateStatus(student._id, 'rejected')}
                                    title="Reject"
                                  >
                                    <i className="bi bi-x"></i>
                                  </button>
                                </>
                              )}
                              <button 
                                className="btn btn-outline-primary btn-sm"
                                onClick={() => handleEditStudent(student)}
                                title="Edit"
                              >
                                <i className="bi bi-pencil"></i>
                              </button>
                              <button 
                                className="btn btn-outline-danger btn-sm"
                                onClick={() => deleteStudent(student._id)}
                                title="Delete"
                              >
                                <i className="bi bi-trash"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Courses Tab */}
        {activeTab === 'courses' && (
          <div className="tab-pane fade show active">
            <div className="row mb-3">
              <div className="col-12">
                <div className="d-flex justify-content-between align-items-center">
                  <h4>Course Management</h4>
                  <button 
                    className="btn btn-primary"
                    onClick={() => setShowCourseModal(true)}
                  >
                    <i className="bi bi-plus-circle me-2"></i>
                    Add New Course
                  </button>
                </div>
              </div>
            </div>

            <div className="row">
              {courses.length === 0 ? (
                <div className="col-12 text-center py-4 text-muted">
                  <i className="bi bi-book me-2"></i>
                  No courses found
                </div>
              ) : (
                courses.map(course => (
                  <div key={course._id} className="col-md-6 col-lg-4 mb-4">
                    <div className="card h-100">
                      <div className="card-header bg-primary text-white">
                        <h5 className="card-title mb-0">
                          <i className="bi bi-book me-2"></i>
                          {course.name}
                        </h5>
                      </div>
                      <div className="card-body">
                        <p className="card-text">{course.description}</p>
                        <div className="row">
                          <div className="col-6">
                            <small className="text-muted">Duration</small>
                            <div>{course.duration}</div>
                          </div>
                          <div className="col-6">
                            <small className="text-muted">Fee</small>
                            <div className="fw-bold">${course.fee}</div>
                          </div>
                        </div>
                        {course.instructor && (
                          <div className="mt-2">
                            <small className="text-muted">Instructor</small>
                            <div>{course.instructor}</div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Student Modal */}
        {showStudentModal && (
          <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">
                    {editingStudent ? 'Edit Student' : 'Register New Student'}
                  </h5>
                  <button 
                    type="button" 
                    className="btn-close"
                    onClick={() => setShowStudentModal(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <div onSubmit={handleStudentSubmit}>
                    <div className="mb-3">
                      <label className="form-label">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        value={studentForm.name}
                        onChange={(e) => setStudentForm({...studentForm, name: e.target.value})}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        value={studentForm.email}
                        onChange={(e) => setStudentForm({...studentForm, email: e.target.value})}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Phone</label>
                      <input
                        type="tel"
                        className="form-control"
                        value={studentForm.phone}
                        onChange={(e) => setStudentForm({...studentForm, phone: e.target.value})}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Course</label>
                      <select
                        className="form-select"
                        value={studentForm.course}
                        onChange={(e) => setStudentForm({...studentForm, course: e.target.value})}
                        required
                      >
                        <option value="">Select a course</option>
                        {courses.map(course => (
                          <option key={course._id} value={course._id}>
                            {course.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Status</label>
                      <select
                        className="form-select"
                        value={studentForm.status}
                        onChange={(e) => setStudentForm({...studentForm, status: e.target.value})}
                      >
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button 
                    type="button" 
                    className="btn btn-secondary"
                    onClick={() => setShowStudentModal(false)}
                  >
                    Cancel
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-primary"
                    onClick={handleStudentSubmit}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        {editingStudent ? 'Updating...' : 'Registering...'}
                      </>
                    ) : (
                      editingStudent ? 'Update Student' : 'Register Student'
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Course Modal */}
        {showCourseModal && (
          <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Add New Course</h5>
                  <button 
                    type="button" 
                    className="btn-close"
                    onClick={() => setShowCourseModal(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <div onSubmit={handleCourseSubmit}>
                    <div className="mb-3">
                      <label className="form-label">Course Name</label>
                      <input
                        type="text"
                        className="form-control"
                        value={courseForm.name}
                        onChange={(e) => setCourseForm({...courseForm, name: e.target.value})}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Description</label>
                      <textarea
                        className="form-control"
                        rows="3"
                        value={courseForm.description}
                        onChange={(e) => setCourseForm({...courseForm, description: e.target.value})}
                        required
                      ></textarea>
                    </div>
                    <div className="row">
                      <div className="col-6">
                        <div className="mb-3">
                          <label className="form-label">Duration</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="e.g., 6 months"
                            value={courseForm.duration}
                            onChange={(e) => setCourseForm({...courseForm, duration: e.target.value})}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="mb-3">
                          <label className="form-label">Fee</label>
                          <input
                            type="number"
                            className="form-control"
                            placeholder="0"
                            value={courseForm.fee}
                            onChange={(e) => setCourseForm({...courseForm, fee: e.target.value})}
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Instructor</label>
                      <input
                        type="text"
                        className="form-control"
                        value={courseForm.instructor}
                        onChange={(e) => setCourseForm({...courseForm, instructor: e.target.value})}
                      />
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button 
                    type="button" 
                    className="btn btn-secondary"
                    onClick={() => setShowCourseModal(false)}
                  >
                    Cancel
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-primary"
                    onClick={handleCourseSubmit}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Adding...
                      </>
                    ) : (
                      'Add Course'
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

  );
}

export default AdminPanel;
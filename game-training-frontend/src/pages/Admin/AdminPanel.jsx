import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';


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
    title: '',
    description: '',
    duration: '',
    fee: '',
    image: ''
  });

  // Team form state
  const [teamForm, setTeamForm] = useState({
    name: '',
    position: '',
    bio: '',
    image: '',
    email: '',
    linkedin: ''
  });

  // Contact form state
  const [contactForm, setContactForm] = useState({
    address: '',
    phone: '',
    email: '',
    mapUrl: '',
    hours: ''
  });

  // Edit states
  const [editingStudent, setEditingStudent] = useState(null);
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [showCourseModal, setShowCourseModal] = useState(false);
  const [showTeamModal, setShowTeamModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);

  // Additional state for new features
  const [teamMembers, setTeamMembers] = useState([]);
  const [contactDetails, setContactDetails] = useState({
    address: '',
    phone: '',
    email: '',
    mapUrl: '',
    hours: ''
  });

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
        setCourseForm({ title: '', description: '', duration: '', fee: '', image: '' });
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
    <>
      
      
      {/* Hero Section */}
      <div className="gradient-bg text-white text-center py-5">
        <Container>
          <Row className="justify-content-center">
            <Col lg={8}>
              <h1 className="display-4 fw-bold mb-4">
                <i className="bi bi-gear-fill me-3"></i>
                Admin Dashboard
              </h1>
              <p className="lead">
                Manage your Game Development Training Center with comprehensive admin tools
              </p>
              <div className="d-flex justify-content-center align-items-center mt-4">
                <span className="badge bg-success me-3 px-3 py-2">
                  <i className="bi bi-check-circle me-2"></i>
                  Authenticated
                </span>
                <button 
                  className="btn btn-outline-light btn-sm"
                  onClick={() => {
                    localStorage.removeItem('adminToken');
                    window.location.reload();
                  }}
                >
                  <i className="bi bi-box-arrow-right me-2"></i>
                  Logout
                </button>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      <div className="section-padding">
        <Container>
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
          <Row className="mb-4">
            <Col lg={12}>
              <Card className="border-0 shadow">
                <Card.Body>
                  <ul className="nav nav-pills nav-fill">
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
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Students Tab */}
          {activeTab === 'students' && (
            <Row>
              <Col lg={12}>
                <Card className="border-0 shadow">
                  <Card.Header className="bg-primary text-white">
                    <h5 className="mb-0">
                      <i className="bi bi-people me-2"></i>
                      Student Registrations
                    </h5>
                  </Card.Header>
                  <Card.Body>
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
                            </tr>
                          </thead>
                          <tbody>
                            {students.length === 0 ? (
                              <tr>
                                <td colSpan={5} className="text-center py-4 text-muted">
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
                                      {student.course?.title || 'N/A'}
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
                                </tr>
                              ))
                            )}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          )}

          {/* Courses Tab */}
          {activeTab === 'courses' && (
            <Row>
              <Col lg={12}>
                <Card className="border-0 shadow">
                  <Card.Header className="bg-primary text-white d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">
                      <i className="bi bi-book me-2"></i>
                      Course Management
                    </h5>
                    <Button 
                      variant="light"
                      onClick={() => setShowCourseModal(true)}
                    >
                      <i className="bi bi-plus-circle me-2"></i>
                      Add New Course
                    </Button>
                  </Card.Header>
                  <Card.Body>
                    <Row>
                      {courses.length === 0 ? (
                        <Col lg={12} className="text-center py-4 text-muted">
                          <i className="bi bi-book me-2"></i>
                          No courses found
                        </Col>
                      ) : (
                        courses.map(course => (
                          <Col md={6} lg={4} key={course._id} className="mb-4">
                            <Card className="h-100 course-card">
                              {course.image && (
                                <Card.Img
                                  variant="top"
                                  src={course.image}
                                  alt={course.title}
                                  style={{ height: '200px', objectFit: 'cover' }}
                                />
                              )}
                              <Card.Body>
                                <Card.Title className="h5">{course.title}</Card.Title>
                                <Card.Text className="text-muted">{course.description}</Card.Text>
                                <Row>
                                  <Col xs={6}>
                                    <small className="text-muted">Duration</small>
                                    <div>{course.duration}</div>
                                  </Col>
                                  <Col xs={6}>
                                    <small className="text-muted">Fee</small>
                                    <div className="fw-bold">Rs. {course.fee}</div>
                                  </Col>
                                </Row>
                              </Card.Body>
                            </Card>
                          </Col>
                        ))
                      )}
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          )}


         
         
        </Container>
      </div>

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
                <div className="mb-3">
                  <label className="form-label">Course Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={courseForm.title}
                    onChange={(e) => setCourseForm({...courseForm, title: e.target.value})}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    rows={3}
                    value={courseForm.description}
                    onChange={(e) => setCourseForm({...courseForm, description: e.target.value})}
                    required
                  ></textarea>
                </div>
                <Row>
                  <Col xs={6}>
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
                  </Col>
                  <Col xs={6}>
                    <div className="mb-3">
                      <label className="form-label">Fee</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="0"
                        value={courseForm.fee}
                        onChange={(e) => setCourseForm({...courseForm, fee: e.target.value})}
                        required
                      />
                    </div>
                  </Col>
                </Row>
                <div className="mb-3">
                  <label className="form-label">Image URL</label>
                  <input
                    type="text"
                    className="form-control"
                    value={courseForm.image}
                    onChange={(e) => setCourseForm({...courseForm, image: e.target.value})}
                    required
                  />
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

    </>
  );
}

export default AdminPanel;
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import Navigation from '../components/Navigation';
import { useEffect, useState } from 'react';

const Registration = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    course: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);

 const [courses, setCourses] = useState([]);

 const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8080/api';

useEffect(() => {
  const fetchCourses = async () => {
    try {
      const res = await fetch(`${backendUrl}/courses`);
      if (res.ok) {
        const data = await res.json();
        setCourses(data);
      } else {
        console.error('Failed to fetch courses');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  fetchCourses();
}, []);


  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email format is invalid';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10,}$/.test(formData.phone.replace(/[\s-()]/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData.course) {
      newErrors.course = 'Please select a course';
    }

    return newErrors;
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  const newErrors = validateForm();

  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    return;
  }

  try {
    const res = await fetch(`${backendUrl}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        course: formData.course
      }),
    });

    if (res.ok) {
      setShowSuccess(true);
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        course: '',
        message: ''
      });

      setTimeout(() => setShowSuccess(false), 5000);
    } else {
      const errorData = await res.json();
      alert('Registration failed: ' + (errorData.message || 'Unknown error'));
    }
  } catch (error) {
    console.error('Registration error:', error);
    alert('An error occurred while submitting the form.');
  }
};


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  return (
    <>
      <Navigation />
      
      {/* Header Section */}
      <div className="gradient-bg text-white text-center py-5">
        <Container>
          <Row className="justify-content-center">
            <Col lg={8}>
              <h1 className="display-4 fw-bold mb-4">Registration</h1>
              <p className="lead">
                Take the first step towards your game development career. Register for our courses today!
              </p>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Registration Form */}
      <div className="section-padding">
        <Container>
          <Row className="justify-content-center">
            <Col lg={8}>
              {showSuccess && (
                <Alert variant="success" className="mb-4">
                  <Alert.Heading>Registration Successful!</Alert.Heading>
                  <p>Thank you for registering with GameDev Academy. We'll contact you soon with course details and next steps.</p>
                </Alert>
              )}
              
              <Card className="shadow">
                <Card.Body className="p-4">
                  <h3 className="text-center mb-4">Course Registration Form</h3>
                  
                  <Form onSubmit={handleSubmit}>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Full Name *</Form.Label>
                          <Form.Control
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            isInvalid={!!errors.fullName}
                            placeholder="Enter your full name"
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.fullName}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Email Address *</Form.Label>
                          <Form.Control
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            isInvalid={!!errors.email}
                            placeholder="Enter your email"
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.email}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Phone Number *</Form.Label>
                          <Form.Control
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            isInvalid={!!errors.phone}
                            placeholder="Enter your phone number"
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.phone}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Course Selection *</Form.Label>
                          <Form.Select
                            name="course"
                            value={formData.course}
                            onChange={handleChange}
                            isInvalid={!!errors.course}
                          >
                            <option value="">Select a course</option>
                           {courses.map((course) => (
  <option key={course._id} value={course._id}>
    {course.title}
  </option>
))}

                          </Form.Select>
                          <Form.Control.Feedback type="invalid">
                            {errors.course}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </Row>

                    <Form.Group className="mb-4">
                      <Form.Label>Message (Optional)</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={4}
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us about your experience with game development or any specific questions you have..."
                      />
                    </Form.Group>

                    <div className="text-center">
                      <Button type="submit" variant="primary" size="lg" className="px-5">
                        Register Now
                      </Button>
                    </div>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Registration;
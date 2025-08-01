import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import Navigation from '../components/Navigation';
import { use, useEffect, useState } from 'react';
const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8080/api';
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  const[contactInfo, setContactInfo] = useState({});

  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const response = await fetch(`${backendUrl}/contactinfo`);
        if (response.ok) {
          const data = await response.json();
         setContactInfo(data[0]);

        } else {
          console.error('Failed to fetch contact info');
        }
      } catch (error) {
        console.error('Error fetching contact info:', error);
      }
    };

    fetchContactInfo();

  }, []);
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email format is invalid';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
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
    const res = await fetch(`${backendUrl}/contactmessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
      }),
    });

    if (res.ok) {
      setShowSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
        subject: '', // optional
      });
      setTimeout(() => setShowSuccess(false), 5000);
    } else {
      const err = await res.json();
      alert('Failed to send message: ' + err.message || 'Unknown error');
    }
  } catch (error) {
    console.error('Error submitting message:', error);
    alert('Error sending message');
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
              <h1 className="display-4 fw-bold mb-4">Contact Us</h1>
              <p className="lead">
                Get in touch with us for any questions about our courses or admissions
              </p>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Contact Section */}
      <div className="section-padding">
        <Container>
          <Row>
            {/* Contact Information */}
            <Col lg={4} className="mb-5">
              <Card className="shadow border-0 h-100">
                <Card.Body>
                  <h4 className="fw-bold mb-4">Get In Touch</h4>
                  
                  <div className="mb-4">
                    <div className="d-flex align-items-center mb-2">
                      <i className="bi bi-geo-alt-fill text-primary me-3 fs-5"></i>
                      <strong>Address</strong>
                    </div>
                   <p className="text-muted ms-4">
  {contactInfo?.address || 'Loading...'}
</p>

                  </div>

                  <div className="mb-4">
                    <div className="d-flex align-items-center mb-2">
                      <i className="bi bi-telephone-fill text-primary me-3 fs-5"></i>
                      <strong>Phone</strong>
                    </div>
                   <p className="text-muted ms-4">{contactInfo?.phone || '...'}</p>
                  </div>

                  <div className="mb-4">
                    <div className="d-flex align-items-center mb-2">
                      <i className="bi bi-envelope-fill text-primary me-3 fs-5"></i>
                      <strong>Email</strong>
                    </div>
                    <p className="text-muted ms-4">{contactInfo?.email || 'Loading...'}</p>
                  </div>

                  <div>
                    <div className="d-flex align-items-center mb-2">
                      <i className="bi bi-clock-fill text-primary me-3 fs-5"></i>
                      <strong>Office Hours</strong>
                    </div>
                    <p className="text-muted ms-4">
                      Mon - Fri: 9:00 AM - 6:00 PM<br />
                      Sat: 10:00 AM - 4:00 PM<br />
                      Sun: Closed
                    </p>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            {/* Contact Form */}
            <Col lg={8}>
              {showSuccess && (
                <Alert variant="success" className="mb-4">
                  <Alert.Heading>Message Sent Successfully!</Alert.Heading>
                  <p>Thank you for contacting us. We'll get back to you within 24 hours.</p>
                </Alert>
              )}

              <Card className="shadow border-0">
                <Card.Body>
                  <h4 className="fw-bold mb-4">Send us a Message</h4>
                  
                  <Form onSubmit={handleSubmit}>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Your Name *</Form.Label>
                          <Form.Control
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            isInvalid={!!errors.name}
                            placeholder="Enter your name"
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.name}
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

                    <Form.Group className="mb-3">
                      <Form.Label>Subject *</Form.Label>
                      <Form.Control
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        isInvalid={!!errors.subject}
                        placeholder="What is this regarding?"
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.subject}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-4">
                      <Form.Label>Message *</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={6}
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        isInvalid={!!errors.message}
                        placeholder="Please provide details about your inquiry..."
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.message}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Button type="submit" variant="primary" size="lg">
                      Send Message
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Map Section */}
          <Row className="mt-5">
            <Col lg={12}>
              <h4 className="fw-bold mb-4 text-center">Find Us Here</h4>
              <div className="contact-map">
                <iframe
                  src={contactInfo?.googleMapEmbedUrl}
                  width="100%"
                  height="400"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="GameDev Academy Location"
                ></iframe>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Contact;
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import Navigation from '../components/Navigation';
import { useEffect, useState } from 'react';


const Courses = () => {
const [courses, setCourses] = useState([]);
const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8080/api';
useEffect(() => {
  const fetchCourses = async () => {
    try {
      const response = await fetch(`${backendUrl}/courses`);
      if (response.ok) {
        const data = await response.json();
        setCourses(data);
      } else {
        console.error('Failed to fetch courses');
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  fetchCourses();
}, []);



  const getLevelVariant = (level) => {
    switch (level) {
      case 'Beginner': return 'success';
      case 'Intermediate': return 'warning';
      case 'Advanced': return 'danger';
      default: return 'primary';
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
              <h1 className="display-4 fw-bold mb-4">Our Courses</h1>
              <p className="lead">
                Choose from our comprehensive range of game development courses designed to take you from beginner to professional
              </p>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Courses Section */}
      <div className="section-padding">
        <Container>
          <Row>
            {courses.map((course) => (
              <Col lg={4} md={6} key={course.id} className="mb-4">
                <Card className="course-card h-100">
                  <Card.Img variant="top" src={course.image} alt={course.title} />
                  <Card.Body className="d-flex flex-column">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                     
                      <Badge bg="info">{course.duration}</Badge>
                    </div>
                    <Card.Title className="h5">{course.title}</Card.Title>
                    <Card.Text className="text-muted flex-grow-1">
                      {course.description}
                    </Card.Text>
                    <div className="d-flex justify-content-between align-items-center mt-auto">
                     <span className="h5 mb-0 text-primary">LKR {course.fee}</span>
                      <Button variant="primary" href="/registration">
                        Enroll Now
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>

      {/* Call to Action */}
      <div className="bg-light text-center py-5">
        <Container>
          <Row className="justify-content-center">
            <Col lg={8}>
              <h3 className="fw-bold mb-3">Not sure which course is right for you?</h3>
              <p className="text-muted mb-4">
                Contact our education counselors for personalized course recommendations
              </p>
              <Button variant="primary" size="lg" href="/contact">
                Get Course Guidance
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Courses;
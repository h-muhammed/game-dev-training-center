import { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Badge, Alert } from 'react-bootstrap';
import Navigation from '../components/Navigation';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8080/api';

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(`${backendUrl}/courses`);
        if (response.ok) {
          const data = await response.json();
          setCourses(data);
        } else {
          setError('Failed to fetch courses.');
        }
      } catch (err) {
        setError('Network error while fetching courses.');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [backendUrl]);

  const renderSkeletonCards = () =>
    Array.from({ length: 6 }).map((_, index) => (
      <Col lg={4} md={6} key={index} className="mb-4">
        <Card className="h-100">
          <Skeleton height={250} />
          <Card.Body>
            <Skeleton height={30} width="80%" />
            <Skeleton count={3} />
            <div className="d-flex justify-content-between align-items-center mt-3">
              <Skeleton width={80} height={30} />
              <Skeleton width={100} height={30} />
            </div>
          </Card.Body>
        </Card>
      </Col>
    ));

  const renderCourses = () =>
    courses.map((course) => (
      <Col lg={4} md={6} key={course._id} className="mb-4">
        <Card className="course-card h-100">
          <Card.Img
            variant="top"
            src={course.image}
            alt={course.title}
            loading="lazy"
            style={{ height: '250px', objectFit: 'cover' }}
          />
          <Card.Body className="d-flex flex-column">
            <div className="d-flex justify-content-between align-items-start mb-2">
              <Badge bg="info">{course.duration}</Badge>
            </div>
            <Card.Title className="h5">{course.title}</Card.Title>
            <Card.Text className="text-muted flex-grow-1" style={{ maxHeight: '120px', overflow: 'hidden' }}>
              {course.description.length > 150 ? course.description.slice(0, 150) + '...' : course.description}
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
    ));

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
          {error && <Alert variant="danger">{error}</Alert>}
          <Row>{loading ? renderSkeletonCards() : renderCourses()}</Row>
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

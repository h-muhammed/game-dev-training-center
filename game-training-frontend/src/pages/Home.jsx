import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import Navigation from '../components/Navigation';


const Home = () => {
  const features = [
    {
      title: "Expert Instructors",
      description: "Learn from industry professionals with years of experience in game development",
      icon: "🎯"
    },
    {
      title: "Hands-on Projects",
      description: "Build real games and create an impressive portfolio during your training",
      icon: "🚀"
    },
    {
      title: "Industry Tools",
      description: "Master the latest tools and technologies used in professional game development",
      icon: "🔧"
    },
    {
      title: "Career Support",
      description: "Get job placement assistance and career guidance after completing your course",
      icon: "💼"
    }
  ];

  return (
    <>
      <Navigation />
      
      {/* Hero Section */}
      <div className="hero-section text-center">
        <Container>
          <Row className="justify-content-center">
            <Col lg={8}>
              <h1 className="display-4 fw-bold mb-4">Welcome to GameDev Academy</h1>
              <p className="lead mb-4">
                Transform your passion for gaming into a professional career. Master the art of game development 
                with our comprehensive training programs designed by industry experts.
              </p>
              <Button variant="light" size="lg" className="me-3" href="/courses">
                Explore Courses
              </Button>
              <Button variant="outline-light" size="lg" href="/registration">
                Join Now
              </Button>
            </Col>
          </Row>
        </Container>
      </div>

      {/* What We Offer Section */}
      <div className="section-padding">
        <Container>
          <Row>
            <Col lg={12} className="text-center mb-5">
              <h2 className="fw-bold mb-3">What We Offer</h2>
              <p className="text-muted">Comprehensive training programs to kickstart your game development journey</p>
            </Col>
          </Row>
          <Row>
            {features.map((feature, index) => (
              <Col md={6} lg={3} key={index} className="mb-4">
                <Card className="h-100 text-center border-0 shadow">
                  <Card.Body>
                    <div className="fs-1 mb-3">{feature.icon}</div>
                    <Card.Title className="h5">{feature.title}</Card.Title>
                    <Card.Text className="text-muted">
                      {feature.description}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>

      {/* Call to Action Section */}
      <div className="gradient-bg text-white text-center section-padding">
        <Container>
          <Row className="justify-content-center">
            <Col lg={8}>
              <h2 className="fw-bold mb-4">Ready to Start Your Game Development Journey?</h2>
              <p className="lead mb-4">
                Join thousands of students who have successfully launched their careers in game development
              </p>
              <Button variant="light" size="lg" href="/registration">
                Get Started Today
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Home;
import { Container, Row, Col, Card } from 'react-bootstrap';
import Navigation from '../components/Navigation';

const About = () => {
  const team = [
    {
      name: "Sarah Johnson",
      role: "Lead Unity Instructor",
      experience: "8 years at Epic Games",
      image: "https://www.cfgb.org/wp-content/uploads/2022/11/Sarah-Johnson-Final-thumbnail.jpg"
    },
    {
      name: "Mike Chen",
      role: "Unreal Engine Expert",
      experience: "10 years at Blizzard Entertainment",
      image: "https://media.istockphoto.com/id/1682296067/photo/happy-studio-portrait-or-professional-man-real-estate-agent-or-asian-businessman-smile-for.jpg?s=612x612&w=0&k=20&c=9zbG2-9fl741fbTWw5fNgcEEe4ll-JegrGlQQ6m54rg="
    },
    {
      name: "Emily Davis",
      role: "Game Design Director",
      experience: "12 years at Ubisoft",
      image: "https://img.freepik.com/free-photo/brunette-business-woman-with-wavy-long-hair-blue-eyes-stands-holding-notebook-hands_197531-343.jpg?semt=ais_hybrid&w=740&q=80"
    },
    {
      name: "Alex Rodriguez",
      role: "3D Art Specialist",
      experience: "7 years at Rockstar Games",
      image: "https://png.pngtree.com/png-vector/20231122/ourmid/pngtree-happy-business-woman-business-png-image_10614739.png"
    }
  ];

  const stats = [
    { number: "1000+", label: "Students Graduated" },
    { number: "95%", label: "Job Placement Rate" },
    { number: "50+", label: "Industry Partners" },
    { number: "5", label: "Years of Excellence" }
  ];

  return (
    <>
      <Navigation />
      
      {/* Header Section */}
      <div className="gradient-bg text-white text-center py-5">
        <Container>
          <Row className="justify-content-center">
            <Col lg={8}>
              <h1 className="display-4 fw-bold mb-4">About GameDev Academy</h1>
              <p className="lead">
                Empowering the next generation of game developers through world-class education and industry expertise
              </p>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Mission Section */}
      <div className="section-padding">
        <Container>
          <Row className="align-items-center">
            <Col lg={6}>
              <h2 className="fw-bold mb-4">Our Mission</h2>
              <p className="text-muted mb-4">
                At GameDev Academy, we believe that every great game starts with passionate developers. Our mission is to 
                transform gaming enthusiasts into skilled professionals who can create the next generation of amazing games.
              </p>
              <p className="text-muted mb-4">
                We provide comprehensive, hands-on training programs that combine theoretical knowledge with practical 
                experience. Our curriculum is designed by industry veterans and constantly updated to reflect the latest 
                trends and technologies in game development.
              </p>
              <p className="text-muted">
                Whether you're a complete beginner or looking to advance your existing skills, our courses are tailored 
                to help you achieve your goals and launch a successful career in the gaming industry.
              </p>
            </Col>
            <Col lg={6}>
              <img 
                src="https://simpleprogrammer.com/wp-content/uploads/2018/01/How-To-Get-Started-In-Game-Development.png" 
                alt="Game Development" 
                className="img-fluid rounded shadow"
              />
            </Col>
          </Row>
        </Container>
      </div>

      {/* Stats Section */}
      <div className="bg-light section-padding">
        <Container>
          <Row className="text-center">
            <Col lg={12} className="mb-5">
              <h2 className="fw-bold">Our Impact</h2>
              <p className="text-muted">Numbers that showcase our commitment to excellence</p>
            </Col>
          </Row>
          <Row>
            {stats.map((stat, index) => (
              <Col lg={3} md={6} key={index} className="mb-4">
                <div className="text-center">
                  <h1 className="display-4 fw-bold text-primary">{stat.number}</h1>
                  <p className="text-muted fs-5">{stat.label}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </div>

      {/* Team Section */}
      <div className="section-padding">
        <Container>
          <Row>
            <Col lg={12} className="text-center mb-5">
              <h2 className="fw-bold mb-4">Meet Our Expert Team</h2>
              <p className="text-muted">
                Our instructors are industry professionals with years of experience at top gaming companies
              </p>
            </Col>
          </Row>
          <Row>
            {team.map((member, index) => (
              <Col lg={3} md={6} key={index} className="mb-4">
                <Card className="text-center border-0 shadow h-100">
                  <Card.Body>
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="rounded-circle mb-3"
                      width="120"
                      height="120"
                    />
                    <Card.Title className="h5">{member.name}</Card.Title>
                    <Card.Subtitle className="text-primary mb-2">{member.role}</Card.Subtitle>
                    <Card.Text className="text-muted small">
                      {member.experience}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>

      {/* Goals Section */}
      <div className="gradient-bg text-white section-padding">
        <Container>
          <Row className="justify-content-center">
            <Col lg={8} className="text-center">
              <h2 className="fw-bold mb-4">Our Goals</h2>
              <Row>
                <Col md={4} className="mb-4">
                  <div className="fs-1 mb-3">🎯</div>
                  <h5>Excellence</h5>
                  <p>Maintain the highest standards in game development education</p>
                </Col>
                <Col md={4} className="mb-4">
                  <div className="fs-1 mb-3">🚀</div>
                  <h5>Innovation</h5>
                  <p>Stay ahead of industry trends and emerging technologies</p>
                </Col>
                <Col md={4} className="mb-4">
                  <div className="fs-1 mb-3">🤝</div>
                  <h5>Community</h5>
                  <p>Build a supportive network of game developers and creators</p>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default About;
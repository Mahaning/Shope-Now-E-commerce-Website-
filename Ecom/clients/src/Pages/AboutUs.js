import React from 'react';
import Layout from '../components/Layouts/Layout';
import { Container, Row, Col, Card, Image } from 'react-bootstrap';
import { FaRegHandshake, FaHistory, FaUsers, FaStar } from 'react-icons/fa';
import '../Styleheets/aboutus.css'; // Import custom CSS if needed for additional styling

const AboutUs = () => {
  return (
    <Layout>
      <Container className="">
        <Row className="mb-5 text-center">
          <Col>
            <h1>About Us</h1>
            <p>Welcome to Shop Now! We are dedicated to providing you with the best online shopping experience.</p>
          </Col>
        </Row>

        <Row className="mb-5 align-items-center">
          <Col md={6}>
            <Image src="https://static.spacecrafted.com/aec87b791348431ab6e5030ad467a2fe/i/bb7a91add17442ddabd8446b3c666128/1/4SoifmQp45JMgBnHp7ed2/dreamstime_xl_45562943.jpg" fluid rounded alt='img' />
          </Col>
          <Col md={6}>
            <h2><FaRegHandshake /> Our Mission</h2>
            <p>Our mission is to deliver quality products to your doorstep with the utmost convenience and reliability. We strive to provide exceptional customer service and a seamless shopping experience.</p>
          </Col>
        </Row>

        <Row className="mb-5 align-items-center">
          <Col md={6} className="order-md-2">
            <Image src="https://miro.medium.com/v2/resize:fit:1400/1*SwFB1o_k1LGprN-XRUZQ8w.jpeg" fluid rounded alt='img'/>
          </Col>
          <Col md={6} className="order-md-1">
            <h2><FaHistory /> Our History</h2>
            <p>Founded in 2020, Shop Now started as a small online store and has grown into a leading e-commerce platform. Our journey has been fueled by our commitment to quality and customer satisfaction.</p>
          </Col>
        </Row>
        <br/>
        <h2><FaUsers /> Meet Our Team</h2>
        <Row className="mb-5 text-center">
          <Col md={4}>
            <Card className="mb-4">
              <Card.Img variant="top" src="https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671134.jpg?size=338&ext=jpg&ga=GA1.1.2082370165.1716422400&semt=sph" alt='img'/>
              <Card.Body>
                <Card.Title>John Doe</Card.Title>
                <Card.Text>CEO</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="mb-4">
              <Card.Img variant="top" src="https://img.freepik.com/free-psd/3d-illustration-with-online-avatar_23-2151303043.jpg?size=338&ext=jpg&ga=GA1.1.1224184972.1714953600&semt=ais" alt='img'/>
              <Card.Body>
                <Card.Title>Jane Smith</Card.Title>
                <Card.Text>COO</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="mb-4">
              <Card.Img variant="top" src="https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671134.jpg?size=338&ext=jpg&ga=GA1.1.2082370165.1716422400&semt=sph" alt='img' />
              <Card.Body>
                <Card.Title>Michael Brown</Card.Title>
                <Card.Text>CTO</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <br/>
        <h2 className="text-center"><FaStar /> Customer Testimonials</h2>
        <Row className="mb-5">
          <Col md={4}>
            <Card className="mb-4">
              <Card.Body>
                <Card.Text>"Shop Now has transformed my shopping experience. Great products and even better service!"</Card.Text>
                <Card.Footer>- Emily R.</Card.Footer>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="mb-4">
              <Card.Body>
                <Card.Text>"I always find what I need on Shop Now. Their delivery is fast and reliable."</Card.Text>
                <Card.Footer>- David L.</Card.Footer>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="mb-4">
              <Card.Body>
                <Card.Text>"Excellent customer support and a wide range of products. Highly recommend!"</Card.Text>
                <Card.Footer>- Sarah K.</Card.Footer>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}

export default AboutUs;

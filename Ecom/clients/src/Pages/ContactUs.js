import React from 'react';
import Layout from '../components/Layouts/Layout';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { Zoom, Fade } from 'react-reveal';
import '../Styleheets/ContactUs.css'; // Import custom CSS for additional styling

const ContactUs = () => {
  return (
    <Layout>
      <Container className="">
        <Row className="mb-5 text-center">
          <Col>
            <h1>Contact Us</h1>
            <p>We would love to hear from you! Please fill out the form below or reach out to us using the contact information provided.</p>
          </Col>
        </Row>

        <Row className="mb-5">
          <Col md={6}>
            <Zoom>
              <h2>Get in Touch</h2>
              <Form>
                <Form.Group controlId="formName" className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter your name" />
                </Form.Group>

                <Form.Group controlId="formEmail" className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" placeholder="Enter your email" />
                </Form.Group>

                <Form.Group controlId="formMessage" className="mb-3">
                  <Form.Label>Message</Form.Label>
                  <Form.Control as="textarea" rows={3} placeholder="Enter your message" />
                </Form.Group>

                <Button variant="primary" type="submit" className="btn-block">
                  Submit
                </Button>
              </Form>
            </Zoom>
          </Col>

          <Col md={6}>
            <Fade right>
              <h2>Contact Information</h2>
              <div className="contact-info">
                <div className="d-flex align-items-center mb-3">
                  <FaPhone className="me-3 contact-icon" />
                  <span>+1 234 567 890</span>
                </div>
                <div className="d-flex align-items-center mb-3">
                  <FaEnvelope className="me-3 contact-icon" />
                  <span>info@shopnow.com</span>
                </div>
                <div className="d-flex align-items-center mb-3">
                  <FaMapMarkerAlt className="me-3 contact-icon" />
                  <span>1234 Shop St, Commerce City, CO 80022</span>
                </div>
              </div>
            </Fade>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}

export default ContactUs;

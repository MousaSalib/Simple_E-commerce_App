import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

export default function Footer() {
  return (
    <footer className="bg-dark text-white py-2 py-md-3 fixed-bottom">
      <Container>
        <Row className="align-items-center">
          <Col xs={12} md={6} className="mb-3 mb-md-0 text-center text-md-start">
            <h5>MOMENTUM SOLUTIONS</h5>
            <p className="mb-0">&copy; 2024 MOMENTUM SOLUTIONS. All rights reserved.</p>
          </Col>
          <Col xs={12} md={6} className="d-flex justify-content-center justify-content-md-end">
            <div className="d-flex">
              <Button variant="link" className="text-white mx-2" href="https://facebook.com">
                <FontAwesomeIcon icon={faFacebookF} />
              </Button>
              <Button variant="link" className="text-white mx-2" href="https://twitter.com">
                <FontAwesomeIcon icon={faTwitter} />
              </Button>
              <Button variant="link" className="text-white mx-2" href="https://instagram.com">
                <FontAwesomeIcon icon={faInstagram} />
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}



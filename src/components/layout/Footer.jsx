import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function Footer() {
  // 1. DYNAMIC DATA / HELPERS
  // Get the current year dynamically using JavaScript `new Date().getFullYear()`
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark text-light py-4 mt-auto">
      <Container>
        <Row className="align-items-center text-center text-md-start">
          
          {/* Brand / Copyright Info */}
          <Col md={6} className="mb-3 mb-md-0">
            {/* Display store name and dynamic copyright text */}
            <h5 className="mb-1 text-primary">Playful Paws</h5>
            <p className="small text-primary mb-0">
              © {currentYear} Playful Paws. All rights reserved.
            </p>
          </Col>

          {/* Minimal Links / Tech Stack Tagline */}
          <Col md={6} className="text-md-end">
            {/* Add simple text or links indicating MVP tech stack or store tagline */}
            <span className="small text-primary">
              Built with ReactJS & React-Bootstrap
            </span>
          </Col>

        </Row>
      </Container>
    </footer>
  );
}

export default Footer;

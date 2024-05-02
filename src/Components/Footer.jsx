import React from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Footer = () => {
  return (
    <footer className="footer mt-auto py-3 bg-light">
      <Container>
        <Row>
          <Col>
            <p className="text-muted mb-0">
              MyShop - Tutti i diritti riservati
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;

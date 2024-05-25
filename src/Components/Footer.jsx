import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaEnvelope,
} from "react-icons/fa";
import logo from "../assets/images/allmight-high-resolution-logo-transparenttext.png";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Footer = () => {
  const [email, setEmail] = useState("");

  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubscribe = () => {
    if (!isEmailValid(email)) {
      toast.error("Inserisci un indirizzo email valido!", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
    } else {
      toast.success("Grazie per esserti iscritto/a alla nostra newsletter!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        icon: <FaEnvelope className="text-black" />,
      });
      setEmail("");
    }
  };

  return (
    <footer className="footer-custom">
      <Container>
        <Row>
          <Col md={4} className="d-flex flex-column justify-content-center">
            <img src={logo} alt="AllMight Logo" className="navbar-logo mb-2" />
            <p>
              AllMight - Il tuo negozio di fiducia per tutti i prodotti
              sportivi.
            </p>
            <p className="mb-0">Tutti i diritti riservati © 2024</p>
          </Col>
          <Col md={2} className="d-flex flex-column justify-content-center">
            <h5>Informazioni</h5>
            <p>Chi siamo</p>
            <p>Termini e condizioni</p>
            <p>Privacy Policy</p>
          </Col>
          <Col md={2} className="d-flex flex-column justify-content-center">
            <h5>Supporto</h5>
            <p>Contattaci</p>
            <p>Spedizioni</p>
            <p>Resi</p>
            <p>Supporto clienti</p>
          </Col>
          <Col md={4}>
            <h5>Iscriviti alla Newsletter</h5>
            <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Control
                  type="email"
                  placeholder="Inserisci la tua email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Button variant="primary" type="button" onClick={handleSubscribe}>
                Iscriviti
              </Button>
            </Form>
            <div className="social-icons pt-3">
              <a
                href="https://facebook.com/"
                className="me-2"
                style={{ color: "#3b5998" }}
              >
                <FaFacebook size={24} />
              </a>
              <a
                href="https://twitter.com/"
                className="me-2"
                style={{ color: "#1da1f2" }}
              >
                <FaTwitter size={24} />
              </a>
              <a
                href="https://instagram.com/"
                className="me-2"
                style={{ color: "#e1306c" }}
              >
                <FaInstagram size={24} />
              </a>
              <a
                href="https://youtube.com/"
                className="me-2"
                style={{ color: "#ff0000" }}
              >
                <FaYoutube size={24} />
              </a>
            </div>
          </Col>
        </Row>
      </Container>
      <ToastContainer />
    </footer>
  );
};

export default Footer;

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useState } from "react";
import { Container, Button, Form } from "react-bootstrap";
import { Row, Col, Card } from "react-bootstrap";
import "./style.css";
import { Link } from "react-router-dom";
import Footer from "./Footer";

const HomePage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:3001/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          if (response.status === 400) {
            throw new Error("Hai già effettuato l'accesso con questa email.");
          }
          throw new Error("Credenziali non valide!");
        }
        return response.text();
      })
      .then((data) => {
        console.log(data);
        alert("Login effettuato!");
      })
      .catch((error) => {
        console.error(
          "Si è verificato un errore durante il login:",
          error.message
        );
        alert(error.message);
      });
  };

  const handleLogout = () => {
    fetch("http://localhost:3001/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Errore durante il logout!");
        }
        return response.text();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(
          "Si è verificato un errore durante il logout:",
          error.message
        );
      });
  };

  const products = [
    {
      id: 1,
      name: "Scarpe da corsa",
      description: "Scarpe da corsa molto leggere e traspiranti primo",
      price: 59.99,
      imageUrl: "https://via.placeholder.com/300x200?text=Scarpe+da+corsa",
    },
    {
      id: 2,
      name: "Pallone da calcio",
      description: "Pallone da calcio ufficiale per partite di campionato",
      price: 29.99,
      imageUrl: "https://via.placeholder.com/300x200?text=Pallone+da+calcio",
    },
    {
      id: 3,
      name: "Maglia da basket",
      description: "Maglia da basket professionale con design aerodinamico",
      price: 39.99,
      imageUrl: "https://via.placeholder.com/300x200?text=Maglia+da+basket",
    },
  ];

  return (
    <>
      <div className="background-container"></div>
      <div className="page-content homepage">
        <Navbar className="navbar-custom justify-content-center" expand="sm">
          <Container>
            <Navbar.Brand className="text-white" href="/">
              MyShop
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse
              id="basic-navbar-nav"
              className="justify-content-center"
            >
              <Nav className="ml-auto " style={{ gap: "50px" }}>
                <Nav.Link className="text-white" href="/">
                  Home
                </Nav.Link>
                <Nav.Link className="text-white" href="/products">
                  Products
                </Nav.Link>
                <Nav.Link className="text-white" href="/cart">
                  Cart
                </Nav.Link>
                <Nav.Link className="text-white" href="/admin">
                  Admin
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <section id="about-us" className="my-5 ">
          <Container>
            <h2 className="text-center">Chi Siamo</h2>
            <p>
              Benvenuti su MyShop! Siamo un team appassionato che si impegna a
              fornire i migliori prodotti e un'esperienza di shopping
              straordinaria ai nostri clienti.
            </p>
            <p>
              La nostra missione è rendere lo shopping online facile,
              conveniente e divertente per tutti. Ci impegniamo a fornire
              un'ampia selezione di prodotti di alta qualità a prezzi
              accessibili.
            </p>
            <p>Grazie per averci scelto e buono shopping!</p>
          </Container>
        </section>

        <section id="prodotti-primo-piano" className="pt-5">
          <Container>
            <h2 className="pb-5">Prodotti in primo piano</h2>
            <Row xs={1} md={3} className="g-4">
              {products.map((product) => (
                <Col key={product.id}>
                  <Card>
                    <Card.Img variant="top" src={product.imageUrl} />
                    <Card.Body>
                      <Card.Title>{product.name}</Card.Title>
                      <Card.Text>{product.description}</Card.Text>
                    </Card.Body>
                    <Card.Footer>
                      <Link to={`/products/${product.id}`}>Vedi dettagli</Link>
                    </Card.Footer>
                  </Card>
                </Col>
              ))}
            </Row>
          </Container>
        </section>

        <div className="login-page">
          <div className="login-form ">
            <h2>Login</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="email">
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Label>Password:</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <div className="button-group">
                <Button variant="primary" type="submit">
                  Login
                </Button>
                <Button
                  variant="danger"
                  className="mt-3"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HomePage;

import { useState, useEffect } from "react";
import { Container, Button, Form } from "react-bootstrap";
import { Row, Col, Card } from "react-bootstrap";
import "./style.css";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3001/products")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        const firstThreeProducts = data.slice(0, 3);
        setProducts(firstThreeProducts);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation: ", error);
      });
  }, []);

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
  return (
    <>
      <div className="page-content homepage">
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
    </>
  );
};

export default HomePage;

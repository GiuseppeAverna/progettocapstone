import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { Row, Col, Card } from "react-bootstrap";
import "./style.css";
import Header from "./Header";
import { Link, useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) navigate("/login");
    fetch("http://localhost:3001/products?page=1&pageSize=3", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data.content);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation: ", error);
      });
  }, []);

  return (
    <>
      <Header />
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
      </div>
    </>
  );
};

export default HomePage;

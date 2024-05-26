import { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import "./style.css";
import Header from "./Header";
import { Link, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import ChatSupport from "./ChatSupport";

const HomePage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) navigate("/login");
    fetch("http://localhost:3001/products?page=0&pageSize=5", {
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
  }, [navigate]);

  return (
    <>
      <Header />
      <ChatSupport />
      <div className="page-content homepage">
        <section className="about-us">
          <h2 className="text-center">Chi Siamo</h2>
          <p>
            Benvenuti su ALLMIGHT! Siamo un team appassionato che si impegna a
            fornire i migliori prodotti e un'esperienza di shopping
            straordinaria ai nostri clienti.
          </p>
          <p>
            La nostra missione è rendere lo shopping online facile, conveniente
            e divertente per tutti. Ci impegniamo a fornire un'ampia selezione
            di prodotti di alta qualità a prezzi accessibili.
          </p>
          <p>Grazie per averci scelto e buono shopping!</p>
        </section>
        <h2 className="primo-piano">Prodotti in primo piano</h2>
        <section className="prodotti-primo-piano">
          <div className="homepage products-grid">
            {products.map((product) => (
              <div key={product.id} className="homepage product-card">
                <Card className="homepage card-content">
                  <Card.Img variant="top" src={product.imageUrl} />
                  <Card.Body className="no-padding">
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Text>{product.description}</Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    <Link to={`/products/${product.id}`}>Vedi dettagli</Link>
                  </Card.Footer>
                </Card>
              </div>
            ))}
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default HomePage;

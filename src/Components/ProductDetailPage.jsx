import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Card, Button } from "react-bootstrap";
import Footer from "./Footer";
import Header from "./Header";

const ProductDetailPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3001/products/${productId}`)
      .then((response) => response.json())
      .then((data) => setProduct(data));
  }, [productId]);

  const addToCart = (product) => {
    fetch("http://localhost:3001/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    })
      .then((response) => response.json())
      .then((data) => {
        alert("Prodotto aggiunto al carrello!");
      });
  };

  if (!product) {
    return <div>Caricamento in corso...</div>;
  }

  return (
    <>
      <div className="content-wrap">
        <div className="page-content productdetailpage">
          <Container className="mt-4">
            <Card style={{ maxWidth: "300px", margin: "0 auto" }}>
              <Card.Img
                variant="top"
                src={product.imageUrl}
                alt={product.name}
              />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>

                <Card.Text>{product.description}</Card.Text>
                <Card.Text>Prezzo: €{product.price.toFixed(2)}</Card.Text>
                <Button variant="primary" onClick={() => addToCart(product)}>
                  Aggiungi al carrello
                </Button>
              </Card.Body>
            </Card>
          </Container>
        </div>
      </div>
    </>
  );
};

export default ProductDetailPage;

import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import {
  FacebookShareButton,
  WhatsappShareButton,
  TelegramShareButton,
  LinkedinIcon,
  FacebookIcon,
  WhatsappIcon,
  TelegramIcon,
  LinkedinShareButton,
} from "react-share";

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
    <div className="page-content productpage">
      <Container className="my-4 d-flex justify-content-center">
        <Card style={{ width: "18rem" }}>
          <Card.Img variant="top" src={product.imageUrl} alt={product.name} />
          <Card.Body>
            <Card.Title>{product.name}</Card.Title>
            <Card.Text>{product.description}</Card.Text>
            <Card.Text>Prezzo: €{product.price.toFixed(2)}</Card.Text>
            <Button onClick={() => addToCart(product)}>
              Aggiungi al carrello
            </Button>
            <Row className="justify-content-around mt-3">
              <Col xs="auto">
                <FacebookShareButton
                  url={window.location.href}
                  quote={product.name}
                  hashtag="#YourBrand"
                >
                  <FacebookIcon size={32} round={true} />
                </FacebookShareButton>
              </Col>
              <Col xs="auto">
                <WhatsappShareButton
                  url={window.location.href}
                  title={product.name}
                >
                  <WhatsappIcon size={32} round={true} />
                </WhatsappShareButton>
              </Col>
              <Col xs="auto">
                <TelegramShareButton
                  url={window.location.href}
                  title={product.name}
                >
                  <TelegramIcon size={32} round={true} />
                </TelegramShareButton>
              </Col>
              <Col xs="auto">
                <LinkedinShareButton
                  url={window.location.href}
                  title={product.name}
                  summary={product.description}
                  source={window.location.href}
                >
                  <LinkedinIcon size={32} round={true} />
                </LinkedinShareButton>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default ProductDetailPage;

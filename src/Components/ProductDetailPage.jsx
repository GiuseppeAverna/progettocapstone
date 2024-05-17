import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Card, Button, Row, Col, Form } from "react-bootstrap";
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
import { Rating } from "react-simple-star-rating";

const ProductDetailPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);

  useEffect(() => {
    fetch(`http://localhost:3001/products/${productId}`)
      .then((response) => response.json())
      .then((data) => setProduct(data));
  }, [productId]);

  const addToCart = (product) => {
    fetch("http://localhost:3001/carts", {
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
  const submitReview = (e) => {
    e.preventDefault();
    fetch("http://localhost:3001/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId: product.id,
        productName: product.name,
        rating: rating,
        reviewText: review,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        alert(
          `Grazie per aver lasciato una recensione per l'articolo ${
            product.name
          }😊! Hai valutato l'articolo con ${rating} ${
            rating === 1 ? "stella" : "stelle"
          }.`
        );
      });
  };

  if (!product) {
    return <div>Caricamento in corso...</div>;
  }

  return (
    <div className="page-content productpage">
      <Container className="my-4 d-flex flex-column flex-md-row justify-content-around align-items-center">
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
        <Form onSubmit={submitReview} className="form-review">
          <div className="review-input">
            <h2>Hai già ricevuto il prodotto? Scrivi una recensione!</h2>
            <Form.Group controlId="reviewForm.ControlInput1">
              <Form.Label className="mb-0">Valutazione</Form.Label>
              <div>
                <Rating
                  onClick={(rate) => setRating(rate)}
                  ratingValue={rating}
                  size={20}
                  fillColor="gold"
                  emptyColor="gray"
                />
                <span style={{ marginLeft: "1rem" }}>
                  {rating} {rating === 1 ? "stella" : "stelle"}
                </span>
              </div>
            </Form.Group>
            <Form.Group controlId="reviewForm.ControlTextarea1">
              <Form.Label className="pt-3">La tua recensione</Form.Label>
              <Form.Control
                as="textarea"
                rows="3"
                value={review}
                onChange={(e) => setReview(e.target.value)}
              />
            </Form.Group>
          </div>
          <Button variant="primary" type="submit">
            Invia recensione
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default ProductDetailPage;

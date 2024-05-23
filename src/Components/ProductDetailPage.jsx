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
import Header from "./Header";
import { useNavigate } from "react-router-dom";

const ProductDetailPage = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) navigate("/login");
    fetch(`http://localhost:3001/products/${productId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    })
      .then((response) => response.json())
      .then((data) => setProduct(data));

    fetch(`http://localhost:3001/products/${productId}/reviews`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    })
      .then((response) => response.json())
      .then((data) => setReviews(data));
  }, [productId]);

  const addToCart = () => {
    const accessToken = localStorage.getItem("accessToken");
    const userId = localStorage.getItem("userId");
    if (!accessToken || !userId) navigate("/login");
    fetch(`http://localhost:3001/users/${userId}/addToCart/${productId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    })
      .then((response) => response.json())
      .then(() => {
        alert("Prodotto aggiunto al carrello!");
      });
  };

  const submitReview = (e) => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) navigate("/login");
    e.preventDefault();
    fetch("http://localhost:3001/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
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
        fetch(`http://localhost:3001/products/${productId}/reviews`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + accessToken,
          },
        })
          .then((response) => response.json())
          .then((data) => setReviews(data));
      });
  };

  if (!product) {
    return <div>Caricamento in corso...</div>;
  }

  return (
    <>
      <Header />
      <div className="page-content productpage detail">
        <div>
          <Card>
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
        </div>
        <Card className="reviews-section">
          <Card.Body>
            <h2 className="customer-reviews">Recensioni dei clienti</h2>
            {reviews.map((review) => (
              <div key={review.id} className="review-card mb-3">
                <Rating
                  className="rating-stars"
                  initialValue={review.rating}
                  readonly
                />
                <p>{review.reviewText}</p>
              </div>
            ))}
          </Card.Body>
        </Card>
        <Form onSubmit={submitReview} className="form-review">
          <div className="review-input">
            <h2>Hai già ricevuto il prodotto? Scrivi una recensione!</h2>
            <Form.Group controlId="reviewForm.ControlInput1">
              <Form.Label className="mb-0">Valutazione</Form.Label>
              <div className="review-stars-counter">
                <Rating
                  onClick={(rate) => setRating(rate)}
                  ratingValue={rating}
                  size={20}
                  fillColor="gold"
                  emptyColor="gray"
                />
                <span>
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
      </div>
    </>
  );
};

export default ProductDetailPage;

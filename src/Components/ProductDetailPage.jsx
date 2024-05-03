import React from "react";
import { Link, useParams } from "react-router-dom"; // Importa il componente Link
import { useState, useEffect } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Container, Card, Button } from "react-bootstrap"; // Aggiunta di Container e Button
import Footer from "./Footer";

const ProductDetailPage = ({ products, addToCart }) => {
  const { productId } = useParams();
  const productIdInt = parseInt(productId);

  if (!products || products.length === 0) {
    return <div>Caricamento in corso...</div>;
  }

  const product = products.find((p) => p.id === productIdInt);

  if (!product) {
    return <div>Prodotto non trovato!</div>;
  }

  const handleAddToCart = () => {
    addToCart(product);
    alert("Prodotto aggiunto al carrello!");
  };

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/">MyShop</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/products">
              Products
            </Nav.Link>
            <Nav.Link as={Link} to="/cart">
              Cart
            </Nav.Link>
            <Nav.Link as={Link} to="/admin">
              Admin
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Container className="mt-4">
        <Card style={{ maxWidth: "300px", margin: "0 auto" }}>
          <Card.Img variant="top" src={product.imageUrl} alt={product.name} />
          <Card.Body>
            <Link to={`/product/${product.id}`}>
              <Card.Title>{product.name}</Card.Title>
            </Link>
            <Card.Text>{product.description}</Card.Text>
            <Card.Text>Prezzo: €{product.price.toFixed(2)}</Card.Text>
            <Button variant="primary" onClick={handleAddToCart}>
              Aggiungi al carrello
            </Button>
          </Card.Body>
        </Card>
      </Container>
      <Footer />
    </>
  );
};

export default ProductDetailPage;

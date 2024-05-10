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
      <div className="background-container"></div>
      <div className="content-wrap">
        <div className="page-content productdetailpage">
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
                <Button variant="primary" onClick={handleAddToCart}>
                  Aggiungi al carrello
                </Button>
              </Card.Body>
            </Card>
          </Container>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductDetailPage;

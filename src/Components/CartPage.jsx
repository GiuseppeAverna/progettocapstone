import React from "react";
import {
  Container,
  Navbar,
  Nav,
  Button,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import OrderSummary from "./OrderSummary";

const CartPage = ({ cart, showAlert, removeFromCart }) => {
  const calculateTotal = () => {
    return cart.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
  };

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/">MyShop</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/products">Products</Nav.Link>
            <Nav.Link href="/cart">Cart</Nav.Link>
            <Nav.Link href="/admin">Admin</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Container className="mt-4">
        <h1>Carrello</h1>
        {cart.length === 0 ? (
          <p>Il carrello è vuoto</p>
        ) : (
          <>
            <div className="d-flex">
              <div className="mr-auto">
                <ListGroup>
                  {cart.map((product) => (
                    <ListGroupItem key={product.id}>
                      {product.name} - Prezzo: €
                      {(product.price * product.quantity).toFixed(2)} (Quantità:{" "}
                      {product.quantity}) {/* Visualizza la quantità */}
                      <Button
                        variant="danger"
                        onClick={() => removeFromCart(product.id)}
                      >
                        Rimuovi dal carrello
                      </Button>
                    </ListGroupItem>
                  ))}
                </ListGroup>
                <p>Totale: €{calculateTotal().toFixed(2)}</p>
              </div>
              <OrderSummary cart={cart} />
            </div>
          </>
        )}
      </Container>
    </>
  );
};

export default CartPage;

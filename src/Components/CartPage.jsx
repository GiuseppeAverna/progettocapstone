import React, { useState, useEffect } from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { Container, Button } from "react-bootstrap";
import OrderSummary from "./OrderSummary";

const CartPage = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/cart")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setCart(data))
      .catch((error) => {
        console.error("Problema con la fetch ", error);
      });
  }, []);

  const removeFromCart = (productId) => {
    fetch(`http://localhost:3001/cart/${productId}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => setCart(data));
  };

  const calculateTotal = () => {
    return cart.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
  };
  return (
    <>
      <div className="page-content cartpage">
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
                        {product.price && product.quantity
                          ? (product.price * product.quantity).toFixed(2)
                          : "N/A"}
                        (Quantità: {product.quantity || "N/A"})
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
      </div>
    </>
  );
};

export default CartPage;

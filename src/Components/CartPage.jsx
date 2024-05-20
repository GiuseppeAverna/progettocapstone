import React, { useState, useEffect } from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { Container, Button } from "react-bootstrap";
import OrderSummary from "./OrderSummary";
import Header from "./Header";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) navigate("/login");
    fetch("http://localhost:3001/users/me", {
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
      .then((data) => setCart(data.cart))
      .catch((error) => {
        console.error("Problema con la fetch ", error);
      });
  }, []);

  const removeFromCart = (productId) => {
    const accessToken = localStorage.getItem("accessToken");
    const userId = localStorage.getItem("userId");
    fetch(`http://localhost:3001/users/${userId}/removeFromCart/${productId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    })
      .then((response) => response.json())
      .then((data) => setCart(data.cart));
  };

  return (
    <>
      <Header />
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
                      <ListGroupItem key={Math.random()}>
                        {product.name} - Prezzo: € {product.price}
                        <Button
                          variant="danger"
                          onClick={() => removeFromCart(product.id)}
                        >
                          Rimuovi dal carrello
                        </Button>
                      </ListGroupItem>
                    ))}
                  </ListGroup>
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

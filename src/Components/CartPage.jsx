import React, { useState, useEffect } from "react";
import { Alert, ListGroup, ListGroupItem } from "react-bootstrap";
import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import { FaShoppingCart } from "react-icons/fa";

const CartPage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [orderStatus, setOrderStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const calculateTotal = () => {
    return cart.reduce((total, product) => total + product.price, 0);
  };
  const handlePay = () => {
    setLoading(true);
    // Simula una richiesta di pagamento asincrona
    setTimeout(() => {
      setLoading(false);
      setOrderStatus(
        "Il tuo ordine è stato ricevuto e sta per essere elaborato."
      );
    }, 2000);
  };

  useEffect(() => {
    let timer;
    if (
      orderStatus ===
      "Il tuo ordine è stato ricevuto e sta per essere elaborato."
    ) {
      timer = setTimeout(() => {
        setOrderStatus("Il tuo ordine è in preparazione.");
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [orderStatus]);

  useEffect(() => {
    let timer;
    if (orderStatus === "Il tuo ordine è in preparazione.") {
      timer = setTimeout(() => {
        setOrderStatus("Il tuo ordine è in viaggio.");
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [orderStatus]);

  useEffect(() => {
    let timer;
    if (orderStatus === "Il tuo ordine è in viaggio.") {
      timer = setTimeout(() => {
        setOrderStatus("Il tuo ordine è stato consegnato.");
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [orderStatus]);

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

  const clearCart = () => {
    const accessToken = localStorage.getItem("accessToken");
    const userId = localStorage.getItem("userId");
    if (!accessToken && !userId) navigate("/login");
    fetch(`http://localhost:3001/users/${userId}/clearCart`, {
      method: "PUT",
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
      .then((data) => setCart(data.cart));
  };

  return (
    <>
      <Header />
      <div className="page-content">
        <h1>Carrello</h1>
        <div className="cart-page">
          {cart.length === 0 ? (
            <Card className="empty-cart-message">
              <FaShoppingCart size={50} /> <p>Il carrello è vuoto</p>
            </Card>
          ) : (
            <ListGroup>
              {cart.map((product) => (
                <ListGroupItem key={Math.random()} className="cart-item">
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
          )}
          <Card>
            <Card.Body className="no-padding">
              <Card.Title>Riepilogo ordine</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                Totale: €{calculateTotal().toFixed(2)}
              </Card.Subtitle>
              <Button
                variant="primary"
                onClick={() => {
                  if (cart.length > 0) {
                    handlePay();
                    clearCart();
                  }
                }}
                disabled={loading || cart.length === 0}
              >
                {loading ? "Pagamento in corso..." : "Paga"}
              </Button>

              {orderStatus && <Alert variant="info">{orderStatus}</Alert>}
            </Card.Body>
          </Card>
        </div>
      </div>
    </>
  );
};

export default CartPage;

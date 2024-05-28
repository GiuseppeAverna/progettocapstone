import React, { useState, useEffect } from "react";
import { Alert, ListGroup, ListGroupItem, Button, Card } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "./Header";
import { FaShoppingCart } from "react-icons/fa";
import Footer from "./Footer";
import ChatSupport from "./ChatSupport";

const CartPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [cart, setCart] = useState([]);
  const [orderStatus, setOrderStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const calculateTotal = () => {
    return cart.reduce((total, product) => total + product.price, 0);
  };

  const handlePay = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/payment", { state: { total: calculateTotal() } });
    }, 1000);
  };

  useEffect(() => {
    let timer;
    if (orderStatus) {
      timer = setTimeout(() => {
        setOrderStatus("");
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [orderStatus]);

  useEffect(() => {
    if (location.state?.paymentSuccess) {
      setOrderStatus("Pagamento effettuato con successo!");
      clearCart();
    }
  }, [location]);

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
  }, [navigate]);

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
      <ChatSupport />
      <div className="page-content ">
        <h1 className="cart-title-container">
          <div className="cart-title">Carrello</div>
        </h1>

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
          <Card className="order-summary">
            <Card.Header>Riepilogo ordine</Card.Header>
            <Card.Body>
              <Card.Title>Totale: €{calculateTotal().toFixed(2)}</Card.Title>
              <Button
                variant="primary"
                onClick={handlePay}
                disabled={loading || cart.length === 0}
                className="pay-button"
              >
                {loading
                  ? "Stai per essere reindirizzato alla pagina di pagamento..."
                  : "Paga"}
              </Button>
              {orderStatus && (
                <Alert
                  variant="success"
                  className="payment-success-alert custom-alert"
                >
                  <i className="fas fa-check-circle"></i> {orderStatus}
                </Alert>
              )}
            </Card.Body>
          </Card>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CartPage;

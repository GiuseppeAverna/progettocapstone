import React, { useState, useEffect } from "react";
import { Container, Button, Alert, Card } from "react-bootstrap";

const OrderSummary = ({ cart }) => {
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

  return (
    <Container className="mt-4 ml-auto">
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>Riepilogo ordine</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            Totale: €{calculateTotal().toFixed(2)}
          </Card.Subtitle>
          <Button variant="primary" onClick={handlePay} disabled={loading}>
            {loading ? "Pagamento in corso..." : "Paga"}
          </Button>
          {orderStatus && <Alert variant="info">{orderStatus}</Alert>}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default OrderSummary;

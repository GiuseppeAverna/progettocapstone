import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const CartPage = ({ cart, removeFromCart }) => {
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

      <div className="container mt-4">
        <h1>Carrello</h1>
        {cart.length === 0 ? (
          <p>Il carrello è vuoto</p>
        ) : (
          <>
            <ul>
              {cart.map((product) => (
                <li key={product.id}>
                  {product.name} - Prezzo: €
                  {(product.price * product.quantity).toFixed(2)} (Quantità:{" "}
                  {product.quantity}) {/* Visualizza la quantità */}
                  <button onClick={() => removeFromCart(product.id)}>
                    Rimuovi dal carrello
                  </button>
                </li>
              ))}
            </ul>
            <p>Totale: €{calculateTotal().toFixed(2)}</p>
          </>
        )}
      </div>
    </>
  );
};

export default CartPage;

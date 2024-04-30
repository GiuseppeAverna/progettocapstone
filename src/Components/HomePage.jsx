import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <Link to="/">
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
    </Link>
  );
};

export default HomePage;

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <>
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
              <NavLink className="text-white" activeclassname="active" to="/">
                Home
              </NavLink>
              <NavLink
                className="text-white"
                activeclassname="active"
                to="/products"
              >
                Products
              </NavLink>
              <NavLink
                className="text-white"
                activeclassname="active"
                to="/cart"
              >
                Cart
              </NavLink>
              {/* <NavLink
                className="text-white"
                activeclassname="active"
                to="/admin"
              >
                Admin
              </NavLink> */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;

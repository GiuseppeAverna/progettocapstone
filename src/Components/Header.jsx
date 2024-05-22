import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import React from "react";
import { NavLink } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import { IoMdLogOut } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const name = localStorage.getItem("name");
  const surname = localStorage.getItem("surname");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("name");
    localStorage.removeItem("surname");
    navigate("/login");
  };

  return (
    <>
      <Navbar className="navbar-custom" expand="sm">
        <span className="text-white grid-name" href="/">
          ALLMIGHT
        </span>

        {name && surname && (
          <Dropdown className="user-info-dropdown grid-user">
            <Dropdown.Toggle
              variant="success"
              id="dropdown-basic"
              className="user-btn"
            >
              {name} {surname}
            </Dropdown.Toggle>

            <Dropdown.Menu align="right">
              <Dropdown.Item
                as="button"
                className="logout-item"
                onClick={handleLogout}
              >
                <IoMdLogOut className="logout-icon" />
                Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )}

        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          className="grid-toggle"
        />

        <Navbar.Collapse id="basic-navbar-nav" className="grid-menu">
          <Nav>
            <NavLink className="text-white" activeclassname="active" to="/home">
              Home
            </NavLink>
            <NavLink
              className="text-white"
              activeclassname="active"
              to="/products"
            >
              Products
            </NavLink>
            <NavLink className="text-white" activeclassname="active" to="/cart">
              Cart
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default Header;

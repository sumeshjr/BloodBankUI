import React from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, Container, Image } from "react-bootstrap";
import logo from "../common/coverimages/logo.png";

const CustomNavbar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="fixed-top">
      <Container>
        <Navbar.Brand href="/">
          <span className="fw-bold text-white ms-2">Vital Drops</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} to="/" end className="nav-link-custom">
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/about" className="nav-link-custom">
              About Us
            </Nav.Link>
            <Nav.Link as={NavLink} to="/register" className="nav-link-custom">
              Register
            </Nav.Link>
            <Nav.Link as={NavLink} to="/login" className="nav-link-custom">
              Login
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;

// Add some custom CSS for the navbar links
const styles = `
  .nav-link-custom {
    color: #fff !important;
    margin: 0 10px;
    transition: color 0.3s ease;
  }

  .nav-link-custom:hover {
    color: #ff6b6b !important;
  }

  .navbar {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

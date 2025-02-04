import React from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, Container, Dropdown, Image } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import logo from "../../common/coverimages/logo.png";

const DonorNav = () => {
  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="/donor">Vital Drops</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={NavLink} to="/requestDonor" end>
                Create Blood Request
              </Nav.Link>
              <Nav.Link as={NavLink} to="/viewRequestsDon" end>
                View Requests
              </Nav.Link>

              <Dropdown align="end">
                <Dropdown.Toggle
                  variant="link"
                  id="dropdown-user-profile"
                  className="text-light"
                  style={{ textDecoration: "none", border: "none" }}
                >
                  <FaUserCircle size={24} className="me-2" />
                  Profile
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item as={NavLink} to="/donorProfile">
                    View Profile
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item as={NavLink} to="/">
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default DonorNav;

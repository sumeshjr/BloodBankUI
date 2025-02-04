import React from "react";
import { Container, Nav, Navbar, Dropdown, Image } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa"; // Import a user icon
import logo from "../../common/coverimages/logo.png";

const AdminNavbar = () => {
  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="/admin">Vital Drops</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={NavLink} to="/requestsAdmin" end>
                View All Requests
              </Nav.Link>
              <Nav.Link as={NavLink} to="/allUsers" end>
                View All Users
              </Nav.Link>
              <Nav.Link as={NavLink} to="/bloodInfo" end>
                View Blood Info
              </Nav.Link>
              <Nav.Link as={NavLink} to="/registerStaff" end>
                Register New Staff
              </Nav.Link>
              {/* User Profile Dropdown */}
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
                  <Dropdown.Item as={NavLink} to="/adminProfile">
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

export default AdminNavbar;

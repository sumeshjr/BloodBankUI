import React from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, Container, Dropdown } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
const ReceiverNav = () => {
  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="/receiver">Blood Bank</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={NavLink} to="/requestReceiver" end>
                Create Blood Request
              </Nav.Link>

              <Nav.Link as={NavLink} to="/viewRequestsRec" end>
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
                  <Dropdown.Item as={NavLink} to="/receiverProfile">
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

export default ReceiverNav;

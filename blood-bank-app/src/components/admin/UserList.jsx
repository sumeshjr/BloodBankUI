import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Alert,
  Spinner,
  Modal,
  Form,
} from "react-bootstrap";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";
import userService from "../../services/user.service";
import AdminNavbar from "./AdminNavbar";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [selectedUser, setSelectedUser] = useState(null); // State to store the selected user for editing

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    setErrorMessage("");
    try {
      const response = await userService.getAllUsers();
      setUsers(response.content);
    } catch (error) {
      setErrorMessage("Error fetching users. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateUser = async (updatedData) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to update this user's data.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, update it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await userService.updateUser(updatedData);
          fetchUsers();
          Swal.fire("Updated!", "The user's data has been updated.", "success");
          setShowModal(false); // Close the modal after updating
        } catch (error) {
          Swal.fire("Error!", "Failed to update user data.", "error");
        }
      }
    });
  };

  const handleDeleteUser = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await userService.deleteUser(id);
          fetchUsers();
          Swal.fire("Deleted!", "The user has been deleted.", "success");
        } catch (error) {
          Swal.fire("Error!", "Failed to delete user.", "error");
        }
      }
    });
  };

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  const handleModalSave = () => {
    if (selectedUser) {
      const { ...updatedData } = selectedUser;
      handleUpdateUser(updatedData);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const columns = [
    {
      name: "Username",
      selector: (row) => row.userName,
      sortable: true,
    },
    {
      name: "Age",
      selector: (row) => row.age,
      sortable: true,
    },
    {
      name: "Contact Number",
      selector: (row) => row.contactNum,
      sortable: true,
    },
    {
      name: "Address",
      selector: (row) => row.address,
      sortable: true,
    },
    {
      name: "Blood Group",
      selector: (row) => row.bloodGroup,
      sortable: true,
    },
    {
      name: "Role",
      selector: (row) => row.role,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div>
          <Button
            variant="primary"
            onClick={() => handleEditClick(row)}
            className="me-2"
          >
            Edit
          </Button>
          <Button variant="danger" onClick={() => handleDeleteUser(row.id)}>
            Delete
          </Button>
        </div>
      ),
      width: "200px",
    },
  ];
  // Conditional row styling
  const conditionalRowStyles = [
    {
      when: () => true, // Applies to all rows
      style: {
        backgroundColor: "#f3e5f5", // Light gray background
        color: "#212529", // Dark text color
      },
    },
  ];
  
  return (
    <>
      <AdminNavbar />
      <Container fluid className="py-5">
        <Row className="justify-content-center">
          <Col md={10}>
            <Card className="shadow-sm p-3 mb-5 bg-white rounded">
              <Card.Body>
                <Card.Title className="text-center">User List</Card.Title>

                {loading && <Spinner animation="border" variant="primary" />}

                {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

                <div style={{ maxWidth: "100%", overflowX: "auto" }}>
                  <DataTable
                    columns={columns}
                    data={users}
                    progressPending={loading}
                    highlightOnHover
                    striped
                    responsive
                    pagination
                  />
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Modal for editing user */}
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedUser && (
            <Form>
              <Form.Group controlId="userName">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  name="userName"
                  value={selectedUser.userName || ""}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="age" className="mt-3">
                <Form.Label>Age</Form.Label>
                <Form.Control
                  type="number"
                  name="age"
                  value={selectedUser.age || ""}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="contactNum" className="mt-3">
                <Form.Label>Contact Number</Form.Label>
                <Form.Control
                  type="text"
                  name="contactNum"
                  value={selectedUser.contactNum || ""}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="address" className="mt-3">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  name="address"
                  value={selectedUser.address || ""}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="role" className="mt-3">
                <Form.Label>Role</Form.Label>
                <Form.Control
                  as="select"
                  name="role"
                  value={selectedUser.role || ""}
                  onChange={handleInputChange}
                >
                  <option value="DONOR">Donor</option>
                  <option value="RECEIVER">Receiver</option>
                  <option value="HOSPITAL_STAFF">Hospital Staff</option>
                </Form.Control>
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleModalSave}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UserList;

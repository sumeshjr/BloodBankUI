import React, { useState, useEffect } from "react";
import { Button, Modal, Form ,Container, Row, Col, Card } from "react-bootstrap";
import DataTable from "react-data-table-component";
import bloodRequestService from "../../services/bloodRequest.service";
import AdminNavbar from "./AdminNavbar";
import Swal from "sweetalert2"; // Import SweetAlert
const BloodInfo = () => {
  const [bloodInfo, setBloodInfo] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentBloodInfo, setCurrentBloodInfo] = useState(null);
  const [error, setError] = useState(null);

  // Fetch blood info data
  const getBloodInfo = () => {
    bloodRequestService
      .getBloodInfo()
      .then((response) => {
        setBloodInfo(response.data);
        setError(null); // Reset error on successful fetch
      })
      .catch((err) => {
        setError("Failed to fetch blood info");
        console.error("Error fetching blood info:", err);
      });
  };

  // Update blood info by ID with quantity

  const handleUpdateBloodInfo = async (id, quantity) => {
    try {
      const updatedData = await bloodRequestService.updateBloodInfo(
        id,
        quantity
      );

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Blood info updated successfully!",
      });

      getBloodInfo(); // Refresh the blood info after update
      setShowModal(false); // Close the modal
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `Failed to update blood info: ${
          error.response?.data?.message || ""
        }`,
      });
    }
  };

  // Open the modal with blood info to edit
  const handleEdit = (bloodInfo) => {
    setCurrentBloodInfo(bloodInfo);
    setShowModal(true);
  };

  // Handle form submission for updating blood info
  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    if (currentBloodInfo) {
      handleUpdateBloodInfo(currentBloodInfo.id, currentBloodInfo.quantity);
    }
  };

  // Handle input changes in the modal form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentBloodInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  // Fetch blood info on component mount
  useEffect(() => {
    getBloodInfo();
  }, []);

  // Columns configuration for DataTable
  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Blood Group",
      selector: (row) => row.bloodGroup,
      sortable: true,
    },
    {
      name: "Quantity",
      selector: (row) => row.quantity,
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <Button variant="primary" onClick={() => handleEdit(row)}>
          Edit
        </Button>
      ),
    },
  ];

  return (
    <div>
      <AdminNavbar />

      <Container fluid className="py-5">
        <Row className="justify-content-center">
          <Col md={8}>
            <Card className="shadow-sm p-3 mb-5 bg-white rounded">
              <Card.Body>
                <Card.Title className="text-center">
                  <h1>Blood Information</h1>
                </Card.Title>

                {error && <div className="alert alert-danger">{error}</div>}

                <div style={{ overflowX: "auto", minWidth: "100%" }}>
                  {/* DataTable */}
                  <DataTable
                    title="Blood Info Table"
                    columns={columns}
                    data={bloodInfo}
                    responsive
                    striped
                    highlightOnHover
                  />
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Modal for Updating Blood Info */}
      {currentBloodInfo && (
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Blood Information</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleUpdateSubmit}>
              <Form.Group controlId="formBloodGroup">
                <Form.Label>Blood Group</Form.Label>
                <Form.Control
                  type="text"
                  name="bloodGroup"
                  value={currentBloodInfo.bloodGroup}
                  disabled
                />
              </Form.Group>

              <Form.Group controlId="formQuantity">
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                  type="number"
                  name="quantity"
                  value={currentBloodInfo.quantity}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Update
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
};

export default BloodInfo;

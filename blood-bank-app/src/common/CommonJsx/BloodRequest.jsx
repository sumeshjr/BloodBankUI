import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert,
} from "react-bootstrap";
import bloodRequestService from "../../services/bloodRequest.service";
import Swal from "sweetalert2"; // Import SweetAlert2

const BloodRequest = ({ userId: userIdProp, quantity: quantityProp }) => {
  const [userId, setUserId] = useState(userIdProp || "");
  const [userName, setUserName] = useState(""); // To store the user name
  const [quantity, setQuantity] = useState(quantityProp || "");
  const [urgency, setUrgency] = useState("LOW"); // Default value is "LOW"
  const [bloodGroup, setBloodGroup] = useState(""); // Blood group state
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [userRole, setUserRole] = useState(""); // For storing the user role

  // Fetch the username and role from localStorage or any other source
  useEffect(() => {
    const storedUserName = localStorage.getItem("userName");
    const storedUserRole = localStorage.getItem("role"); // Assuming user role is stored
    if (storedUserName) {
      setUserName(storedUserName);
    }
    if (storedUserRole) {
      setUserRole(storedUserRole); // Set the user role
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!userId) {
      setErrorMessage("User ID is required.");
      return;
    }

    if (quantity && (isNaN(quantity) || quantity <= 0)) {
      setErrorMessage("If provided, quantity must be a positive number.");
      return;
    }

    if (userRole === "HOSPITAL_STAFF" && !bloodGroup) {
      setErrorMessage("Blood Group is required for hospital staff.");
      return;
    }

    setErrorMessage("");

    // Show confirmation dialog before submitting
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to submit this blood request?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Submit",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      setIsLoading(true);

      try {
        // Using the BloodRequestService to create a blood request
        const response = await bloodRequestService.createBloodRequest({
          userId: userId, // Pass userId in the API request
          quantity: quantity ? quantity : undefined,
          urgency:
            userRole === "HOSPITAL_STAFF" || userRole === "RECEIVER"
              ? urgency
              : undefined, // Only include urgency if user is HOSPITAL_STAFF
          bloodGroup: userRole === "HOSPITAL_STAFF" ? bloodGroup : undefined, // Only include bloodGroup if user is HOSPITAL_STAFF
        });

        // Show SweetAlert success message
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Blood request submitted successfully!",
        });

        // Handle success
        setIsSuccess(true);
        setIsLoading(false);
      } catch (error) {
        // Show SweetAlert error message
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Something went wrong. Please try again.",
        });

        // Handle error
        setErrorMessage("Something went wrong. Please try again.");
        setIsLoading(false);
      }
    }
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="shadow-sm p-3 mb-5 bg-white rounded">
            <Card.Body>
              <Card.Title className="text-center">Blood Request</Card.Title>

              {/* Display error message if any */}
              {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="userId">
                  <Form.Label>User Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="User Name"
                    value={userName} // Display userName
                    readOnly // Make the username read-only
                  />
                </Form.Group>

                <Form.Group controlId="quantity">
                  <Form.Label>Quantity (Optional)</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter Quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </Form.Group>

                {userRole === "HOSPITAL_STAFF" && (
                  <>
                    <Form.Group controlId="urgency">
                      <Form.Label>Urgency</Form.Label>
                      <Form.Control
                        as="select"
                        value={urgency}
                        onChange={(e) => setUrgency(e.target.value)}
                      >
                        <option value="LOW">Low</option>
                        <option value="MEDIUM">Medium</option>
                        <option value="HIGH">High</option>
                      </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="bloodGroup">
                      <Form.Label>Blood Group</Form.Label>
                      <Form.Control
                        as="select"
                        value={bloodGroup}
                        onChange={(e) => setBloodGroup(e.target.value)}
                      >
                        <option value="">Select Blood Group</option>
                        <option value="A_POSITIVE">A+</option>
                        <option value="A_NEGATIVE">A-</option>
                        <option value="B_POSITIVE">B+</option>
                        <option value="B_NEGATIVE">B-</option>
                        <option value="AB_POSITIVE">AB+</option>
                        <option value="AB_NEGATIVE">AB-</option>
                        <option value="O_POSITIVE">O+</option>
                        <option value="O_NEGATIVE">O-</option>
                      </Form.Control>
                    </Form.Group>
                  </>
                )}

                <Button
                  variant="primary"
                  type="submit"
                  className="w-100"
                  disabled={isLoading}
                >
                  {isLoading ? "Submitting..." : "Submit Request"}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default BloodRequest;

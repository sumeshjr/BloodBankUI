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


  // Additional fields for donors
  const [weight, setWeight] = useState("");
  const [healthChecked, setHealthChecked] = useState(false);

  // form valid or not
  const isFormValid = () => {
    if (!userId) return false;
    if (quantity && (isNaN(quantity) || quantity <= 0)) return false;
    if (userRole === "HOSPITAL_STAFF" && !bloodGroup) return false;
    if (userRole === "DONOR") {
      if (!weight || weight < 50) return false;
      if (!healthChecked) return false;
    }
    return true;
  };

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
    
    //validation
    if (!isFormValid()) {
      setErrorMessage("Please fill in all required fields correctly.");
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
          quantity: quantity ? quantity : 1,
          urgency:
            userRole === "HOSPITAL_STAFF" || userRole === "RECEIVER"
              ? urgency
              : undefined, 
          bloodGroup: userRole === "HOSPITAL_STAFF" ? bloodGroup : undefined, // Only include bloodGroup if user is HOSPITAL_STAFF
        });

        // Show SweetAlert success message
        Swal.fire({
          icon: "success",
          title: "Success",
          text: userRole === "RECEIVER" || userRole === "DONOR" ? "Blood request submitted successfully! Once your request is approved, please contact the administrator to obtain the hospital staff details. " : 
          "Blood request submitted successfully!",
        }).then(() => {
          window.location.reload(); // Refreshes the page after closing the alert
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

              {userRole != "DONOR" && (<Form.Group controlId="quantity">
                  <Form.Label>Quantity</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter Quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </Form.Group>)}
                

                {userRole === "HOSPITAL_STAFF" || userRole === "RECEIVER"  && (
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
                    </>
                   
                )}
{userRole === "HOSPITAL_STAFF" && (
  <>
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
                    </Form.Group></>
)}

{userRole === "DONOR" && (
                  <>
                    <Form.Group controlId="weight">
                      <Form.Label>Weight (kg)</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Enter your weight"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                      />
                      {weight && weight < 50 && <Form.Text className="text-danger">Weight must be at least 50 kg.</Form.Text>}
                    </Form.Group>

                    <Form.Label className="mt-3">Health Status</Form.Label>
                    <div className="border p-3 rounded">
                      <p>Confirm that none of the following apply to you:</p>
                      <ul>
                        <li>Cold or fever in the past week.</li>
                        <li>Currently taking antibiotics or other medications.</li>
                        <li>History of heart problems, hypertension, epilepsy, diabetes (insulin), cancer, kidney/liver disease, etc.</li>
                        <li>Major surgery in the past 6 months.</li>
                        <li>Vaccination in the past 24 hours.</li>
                        <li>Recent miscarriage or pregnancy/lactation in the past year.</li>
                        <li>Heavy menstrual flow or recent menstruation within the last 10 days.</li>
                        <li>Fainting during last donation.</li>
                        <li>Shared needles or history of drug addiction.</li>
                        <li>High-risk sexual behavior or positive HIV test.</li>
                      </ul>
                      <Form.Check
                        type="checkbox"
                        label="I confirm that I meet the above health criteria."
                        checked={healthChecked}
                        onChange={() => setHealthChecked(!healthChecked)}
                      />
                    </div>
                  </>
                )}

  <Button
  variant="primary"
  type="submit"
  className="w-100 mt-3"
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

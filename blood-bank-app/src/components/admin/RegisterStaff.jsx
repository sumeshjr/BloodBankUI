import React, { useState } from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Card,
  Alert,
} from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { bloodGroupOptions } from "../../common/constants/bloodGroups";

import AdminNavbar from "./AdminNavbar";
import loginService from "../../services/login.service";

const RegisterStaff = () => {
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
    age: "",
    contactNum: "",
    address: "",
    bloodGroup: "",
    role: "HOSPITAL_STAFF", // Role is predefined and cannot be changed
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make the API call using the loginService
      await loginService.registerUser(formData);

      setSuccessMessage("Staff registration successful!");
      toast.success("Staff registration successful!");

      // Reset the form
      setFormData({
        userName: "",
        password: "",
        age: "",
        contactNum: "",
        address: "",
        bloodGroup: "",
        role: "HOSPITAL_STAFF", // Reset role to default
      });
    } catch (error) {
      setErrorMessage("Staff registration failed. Please try again.");
      toast.error("Staff registration failed. Please try again.");
      console.error("Registration Error:", error);
    }
  };

  return (
    <div>
      <AdminNavbar />
      <ToastContainer position="top-center" autoClose={3000} />
      <Container
        fluid
        className="d-flex justify-content-center align-items-center min-vh-100"
        style={{ backgroundColor: "#f8f9fa" }}
      >
        <Row className="w-100">
          <Col md={{ span: 6, offset: 3 }} lg={{ span: 4, offset: 4 }}>
            <Card className="shadow-lg">
              <Card.Body>
                <h3 className="text-center mb-4">Register Hospital Staff</h3>
                {successMessage && (
                  <Alert variant="success" className="text-center">
                    {successMessage}
                  </Alert>
                )}
                {errorMessage && (
                  <Alert variant="danger" className="text-center">
                    {errorMessage}
                  </Alert>
                )}
                <Form onSubmit={handleSubmit} noValidate>
                  <Form.Group controlId="userName" className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type="text"
                      name="userName"
                      placeholder="Enter staff username"
                      value={formData.userName}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="password" className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      placeholder="Enter staff password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="age" className="mb-3">
                    <Form.Label>Age</Form.Label>
                    <Form.Control
                      type="number"
                      name="age"
                      placeholder="Enter staff age"
                      value={formData.age}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="contactNum" className="mb-3">
                    <Form.Label>Contact Number</Form.Label>
                    <Form.Control
                      type="text"
                      name="contactNum"
                      placeholder="Enter staff contact number"
                      value={formData.contactNum}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="address" className="mb-3">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      type="text"
                      name="address"
                      placeholder="Enter staff address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="bloodGroup" className="mb-3">
  <Form.Label>Blood Group</Form.Label>
  <Form.Select
    name="bloodGroup"
    value={formData.bloodGroup}
    onChange={handleChange}
    required
  >
    <option value="">Select Blood Group</option>
    {Object.entries(bloodGroupOptions).map(([key, label]) => (
      <option key={key} value={key}>
        {label}
      </option>
    ))}
  </Form.Select>
</Form.Group>


                        

                  <Form.Group controlId="role" className="mb-3">
                    <Form.Label>Role</Form.Label>
                    <Form.Control
                      type="text"
                      name="role"
                      value={formData.role}
                      readOnly
                      disabled
                    />
                  </Form.Group>

                  <Button variant="primary" type="submit" className="w-100">
                    Register Staff
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default RegisterStaff;

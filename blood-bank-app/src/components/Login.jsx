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
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import loginService from "../services/login.service"; // Import your login service
import CustomNavbar from "./Navbar";

const Login = () => {
  const [formData, setFormData] = useState({ userName: "", password: "" });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Clear previous data from localStorage before storing new data
      localStorage.clear();

      // Send login request to the backend
      const response = await loginService.loginUser(formData);
      const { id, userName, role } = response.data; // Assuming response contains user data

      // Store new user data in localStorage
      localStorage.setItem("userId", id);
      localStorage.setItem("userName", userName);
      localStorage.setItem("role", role);

      // Check if it's set correctly
      console.log("userId:", localStorage.getItem("userId"));
      console.log("userName:", localStorage.getItem("userName"));
      console.log("role:", localStorage.getItem("role"));
      setSuccessMessage("Login successful!");
      setErrorMessage("");

      // Show success toast
      toast.success("Login successful!");

      // Redirect based on user role
      switch (role) {
        case "DONOR":
          navigate("/donor");
          break;
        case "HOSPITAL_STAFF":
          navigate("/staff");
          break;
        case "ADMIN":
          navigate("/admin");
          break;
        case "RECEIVER":
          navigate("/receiver");
          break;
        default:
          navigate("/");
          break;
      }
    } catch (error) {
      setSuccessMessage("");
      setErrorMessage(
        error.response?.data?.message || "Failed to login. Please try again."
      );

      // Show error toast
      toast.error(
        error.response?.data?.message || "Failed to login. Please try again."
      );
      console.error("Login Error:", error);
    }
  };

  return (
    <div>
      <CustomNavbar />
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
                <h3 className="text-center mb-4">Welcome Back</h3>
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
                    <Form.Label>User Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your username"
                      name="userName"
                      value={formData.userName}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group controlId="password" className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter your password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Button variant="primary" type="submit" className="w-100">
                    Login
                  </Button>
                </Form>
                <div className="text-center mt-3">
                  <small>
                    Don't have an account? <a href="/register">Sign up</a>
                  </small>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;

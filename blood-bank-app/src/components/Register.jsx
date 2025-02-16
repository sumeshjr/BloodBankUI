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
import { useNavigate } from "react-router-dom";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import loginService from "../services/login.service"; // Assuming loginService is handling the registration logic
import CustomNavbar from "./Navbar";
import { bloodGroupOptions } from "../common/constants/bloodGroups";

// Import the image
import registerImage from "../common/coverimages/register.jpg";

// Define validation schema with Yup
const validationSchema = Yup.object({
  userName: Yup.string().required("Username is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  age: Yup.number()
    .positive("Age must be a positive number")
    .required("Age is required")
    .min(18, "Age must be at least 18")
    .max(65, "Age must be at most 65"),
  contactNum: Yup.string()
    .matches(/^[0-9]{10}$/, "Contact number must be 10 digits")
    .required("Contact number is required"),
  address: Yup.string().required("Address is required"),
  bloodGroup: Yup.string().required("Blood group is required"),
  role: Yup.string().required("Role is required"),
});

const Register = () => {
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const roleOptions = {
    DONOR: "Donor",
    RECEIVER: "Receiver",
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      // Make the API call using the loginService
      await loginService.registerUser(values);
      setSuccessMessage("Registration successful! You can now log in.");
      toast.success("Registration successful!");
      setSubmitting(false);
      // Redirect to login or reset form
      navigate("/");
    } catch (error) {
      setErrorMessage("Registration failed. Please try again.");
      toast.error("Registration failed. Please try again.");
      console.error("Registration Error:", error);
      setSubmitting(false);
    }
  };

  return (
    <div>
      <CustomNavbar />
      <br />
      <br />
      <ToastContainer position="top-center" autoClose={3000} />
      <Container
        fluid
        className="d-flex justify-content-center align-items-center min-vh-100"
        style={{ backgroundColor: "#f8f9fa" }}
      >
        <Row className="w-100">
          {/* Left side image */}
          <Col md={6} className="d-none d-md-block p-0">
            <img
              src={registerImage}
              alt="Register"
              style={{
                width: "100%",
                height: "100vh",
                objectFit: "cover",
                borderRadius: "10px", // Optional: adds border radius for smooth corners
              }}
            />
          </Col>

          {/* Right side form */}
          <Col
            md={6}
            className="d-flex justify-content-center align-items-center py-4"
          >
            <Card
              className="shadow-lg"
              style={{ width: "100%", maxWidth: "500px" }}
            >
              <Card.Body>
                <h3 className="text-center mb-4">Create Account</h3>
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

                {/* Formik form */}
                <Formik
                  initialValues={{
                    userName: "",
                    password: "",
                    age: "",
                    contactNum: "",
                    address: "",
                    bloodGroup: "",
                    role: "",
                  }}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  {({
                    handleSubmit,
                    handleChange,
                    values,
                    isSubmitting,
                    touched,
                    errors,
                  }) => (
                    <Form onSubmit={handleSubmit} noValidate>
                      <Form.Group controlId="userName" className="mb-3">
                        <Form.Label>Username</Form.Label>
                        <Field
                          type="text"
                          name="userName"
                          placeholder="Enter your username"
                          className={`form-control ${
                            touched.userName && errors.userName
                              ? "is-invalid"
                              : ""
                          }`}
                        />
                        <ErrorMessage
                          name="userName"
                          component="div"
                          className="invalid-feedback"
                        />
                      </Form.Group>

                      <Form.Group controlId="password" className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Field
                          type="password"
                          name="password"
                          placeholder="Enter your password"
                          className={`form-control ${
                            touched.password && errors.password
                              ? "is-invalid"
                              : ""
                          }`}
                        />
                        <ErrorMessage
                          name="password"
                          component="div"
                          className="invalid-feedback"
                        />
                      </Form.Group>

                      <Form.Group controlId="age" className="mb-3">
                        <Form.Label>Age</Form.Label>
                        <Field
                          type="number"
                          name="age"
                          placeholder="Enter your age"
                          className={`form-control ${
                            touched.age && errors.age ? "is-invalid" : ""
                          }`}
                        />
                        <ErrorMessage
                          name="age"
                          component="div"
                          className="invalid-feedback"
                        />
                      </Form.Group>

                      <Form.Group controlId="contactNum" className="mb-3">
                        <Form.Label>Contact Number</Form.Label>
                        <Field
                          type="text"
                          name="contactNum"
                          placeholder="Enter your contact number"
                          className={`form-control ${
                            touched.contactNum && errors.contactNum
                              ? "is-invalid"
                              : ""
                          }`}
                        />
                        <ErrorMessage
                          name="contactNum"
                          component="div"
                          className="invalid-feedback"
                        />
                      </Form.Group>

                      <Form.Group controlId="address" className="mb-3">
                        <Form.Label>Address</Form.Label>
                        <Field
                          type="text"
                          name="address"
                          placeholder="Enter your address"
                          className={`form-control ${
                            touched.address && errors.address
                              ? "is-invalid"
                              : ""
                          }`}
                        />
                        <ErrorMessage
                          name="address"
                          component="div"
                          className="invalid-feedback"
                        />
                      </Form.Group>

                      <Form.Group controlId="bloodGroup" className="mb-3">
                        <Form.Label>Blood Group</Form.Label>
                        <Field
                          as="select"
                          name="bloodGroup"
                          className={`form-control ${
                            touched.bloodGroup && errors.bloodGroup
                              ? "is-invalid"
                              : ""
                          }`}
                        >
                          <option value="">Select your blood group</option>
                          {Object.entries(bloodGroupOptions).map(
                            ([key, value]) => (
                              <option key={key} value={key}>
                                {value}
                              </option>
                            )
                          )}
                        </Field>
                        <ErrorMessage
                          name="bloodGroup"
                          component="div"
                          className="invalid-feedback"
                        />
                      </Form.Group>

                      <Form.Group controlId="role" className="mb-3">
                        <Form.Label>Role</Form.Label>
                        <Field
                          as="select"
                          name="role"
                          className={`form-control ${
                            touched.role && errors.role ? "is-invalid" : ""
                          }`}
                        >
                          <option value="">Select your role</option>
                          {Object.entries(roleOptions).map(([key, value]) => (
                            <option key={key} value={key}>
                              {value}
                            </option>
                          ))}
                        </Field>
                        <ErrorMessage
                          name="role"
                          component="div"
                          className="invalid-feedback"
                        />
                      </Form.Group>

                      <Button
                        variant="primary"
                        type="submit"
                        className="w-100"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Registering..." : "Register"}
                      </Button>
                    </Form>
                  )}
                </Formik>

                <div className="text-center mt-3">
                  <small>
                    Already have an account? <a href="/login">Login here</a>
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

export default Register;

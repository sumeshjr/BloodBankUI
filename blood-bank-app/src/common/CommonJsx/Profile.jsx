import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import userService from "../../services/user.service";

const Profile = () => {
  const [userData, setUserData] = useState({
    id: "",
    userName: "",
    age: "",
    contactNum: "",
    address: "",
    bloodGroup: "",
    role: "", // Role is not editable
  });

  useEffect(() => {
    const userId = localStorage.getItem("userId"); // Fetch userId from localStorage
    if (userId) {
      fetchUserProfile(userId);
    } else {
      toast.error("User ID not found. Please log in again.");
    }
  }, []);

  // Fetch user data by ID
  const fetchUserProfile = async (userId) => {
    try {
      const response = await userService.getUserById(userId);
      setUserData(response); // Assuming the API returns the user data directly
    } catch (error) {
      toast.error("Failed to fetch user data.");
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Update user profile
  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    try {
      // Show SweetAlert confirmation dialog
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "Do you want to update your profile?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, update it!",
      });

      if (result.isConfirmed) {
        const updatedUser = { ...userData };
        delete updatedUser.role; // Ensure the role isn't sent for update
        await userService.updateUser(updatedUser);

        // Show success alert
        Swal.fire("Updated!", "Your profile has been updated.", "success");

        // Refresh the page after a short delay
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
    } catch (error) {
      toast.error("Failed to update profile.");
    }
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center">Profile</h2>
      <Row className="justify-content-center">
        <Col md={6}>
          <Form onSubmit={handleUpdateProfile}>
            <Form.Group controlId="formUserName" className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="userName"
                value={userData.userName}
                onChange={handleChange}
                placeholder="Enter your username"
              />
            </Form.Group>
            <Form.Group controlId="formAge" className="mb-3">
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="number"
                name="age"
                value={userData.age}
                onChange={handleChange}
                placeholder="Enter your age"
              />
            </Form.Group>
            <Form.Group controlId="formContactNum" className="mb-3">
              <Form.Label>Contact Number</Form.Label>
              <Form.Control
                type="text"
                name="contactNum"
                value={userData.contactNum}
                onChange={handleChange}
                placeholder="Enter your contact number"
              />
            </Form.Group>
            <Form.Group controlId="formAddress" className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={userData.address}
                onChange={handleChange}
                placeholder="Enter your address"
              />
            </Form.Group>
            <Form.Group controlId="formBloodGroup" className="mb-3">
              <Form.Label>Blood Group</Form.Label>
              <Form.Control
                type="text"
                name="bloodGroup"
                value={userData.bloodGroup}
                onChange={handleChange}
                placeholder="Enter your blood group"
              />
            </Form.Group>
            <Form.Group controlId="formRole" className="mb-3">
              <Form.Label>Role</Form.Label>
              <Form.Control
                type="text"
                name="role"
                value={userData.role}
                readOnly
                disabled
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Update Profile
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;

// services/userService.js

import axios from "axios";

// URL from environment variables
const API_URL = import.meta.env.VITE_BLOOD_BANK_URL;

class UserService {
  // Fetch all users
  async getAllUsers() {
    try {
      const response = await axios.get(`${API_URL}/user`);
      return response.data; // Assuming the response contains 'data' with the user list
    } catch (error) {
      throw new Error("Error fetching users");
    }
  }

  // Fetch a user by ID
  async getUserById(id) {
    try {
      const response = await axios.get(`${API_URL}/user/${id}`);
      return response.data; // Assuming the response contains 'data' with user details
    } catch (error) {
      throw new Error("Error fetching user by ID");
    }
  }

  // Update user by ID
  async updateUser(userData) {
    try {
      const response = await axios.put(`${API_URL}/user`, userData);
      return response.data;
    } catch (error) {
      throw new Error("Error updating user");
    }
  }

  // Delete user by ID
  async deleteUser(id) {
    try {
      await axios.delete(`${API_URL}/user/${id}`);
    } catch (error) {
      throw new Error("Error deleting user");
    }
  }
}

export default new UserService();

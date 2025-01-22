import axios from "axios";

const API_URL = import.meta.env.VITE_BLOOD_BANK_URL; // URL from environment variables

class BloodRequestService {
  // Submit a blood request
  createBloodRequest(bloodRequestData) {
    return axios.post(`${API_URL}/blood_request`, bloodRequestData);
  }

  getBloodRequests(userId, page = 0, size = 10, sort = "id,asc") {
    const url = `${API_URL}/blood_request/user/${userId}?page=${page}&size=${size}&sort=${sort}`;
    return axios.get(url);
  }

  updateStatus = async (id, status) => {
    try {
      const response = await axios.put(`${API_URL}/blood_request/${id}`, {
        status: status,
      });
      return response.data; // return the response from the API
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to update status"
      );
    }
  };

  getAllBloodRequests(page = 0, size = 10, sort = "id,asc") {
    const url = `${API_URL}/blood_request?page=${page}&size=${size}&sort=${sort}`;
    return axios.get(url);
  }

  getBloodInfo() {
    const url = `${API_URL}/blood_info`;
    return axios.get(url);
  }

  updateBloodInfo = async (id, quantity) => {
    try {
      // Passing the quantity as a query parameter
      const response = await axios.put(
        `${API_URL}/blood_info/${id}`,
        null, // No body payload needed, just using query parameters
        { params: { quantity: quantity } }
      );
      return response.data; // Return the response from the API
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to update blood info"
      );
    }
  };
}

export default new BloodRequestService();

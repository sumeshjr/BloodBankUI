import axios from "axios";

const API_URL = import.meta.env.VITE_BLOOD_BANK_URL;

class RegisterService {
  registerUser(userData) {
    return axios.post(`${API_URL}/user/register`, userData);
  }

  loginUser(credentials) {
    return axios.put(`${API_URL}/user/login`, credentials);
  }
}

export default new RegisterService();

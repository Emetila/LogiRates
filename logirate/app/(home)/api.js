import axios from 'axios';

const apiClient = axios.create({
  baseURL: "https://logirate-api.onrender.com",
  timeout: 10000,
});

export default apiClient;
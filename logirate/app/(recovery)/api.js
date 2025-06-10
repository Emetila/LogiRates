const BASE_URL = 'http://192.168.19.90:3000/api'; 
import axios from "axios";

export const requestOtp = async (email) => {
  try {
    return await axios.post(`${BASE_URL}/request-otp`, { email });
  } catch (error) {
    console.error("Error in requestOtp:", error.response?.data || error.message);
    throw error;
  }
};

export const verifyOtp = (email, otp) => axios.post(`${BASE_URL}/verify-otp`, { email, otp });
export const resetPassword = (email, newPassword) => axios.post(`${BASE_URL}/reset-password`, { email, newPassword });
import axios from "axios";

const API_BASE = "http://localhost:8080/api"; 

// ---- BOOKINGS ----
export const createBooking = (bookingData) => {
  return axios.post(`${API_BASE}/bookings`, bookingData);
};

export const getBookings = async () => {
  const response = await axios.get(`${API_BASE}/bookings`);
  return response.data;
};

export const updateBookingStatus = async (id, status) => {
  return axios.put(`${API_BASE}/bookings/${id}/status`, { status });
};
export const signupUser = async (data) => {
  const res = await axios.post("/api/auth/signup", data);
  return res.data;
};

// ---- ROOMS ----
export const getRooms = () => {
  return axios.get(`${API_BASE}/rooms`);
};

export const getAvailableRooms = () => {
  return axios.get(`${API_BASE}/rooms/available`);
};

import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { createBooking } from "../utils/api";
import "./BookingForm.css";

const BookingForm = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    checkIn: "",
    checkOut: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Frontend validation
    if (formData.checkOut <= formData.checkIn) {
      alert("Check-out date must be after check-in date");
      return;
    }

    try {
      // ✅ Backend expects top-level roomId
      const bookingPayload = {
        guestName: formData.name,
        guestEmail: formData.email,
        checkInDate: formData.checkIn,
        checkOutDate: formData.checkOut,
        roomId: parseInt(roomId, 10), // ✅ top-level field, not nested
      };

      console.log("Sending booking payload:", bookingPayload);

      await createBooking(bookingPayload);
      alert("Booking successful!");
      navigate("/bookings");
    } catch (error) {
      console.error("Booking failed:", error.response?.data || error.message);
      alert(
        "Booking failed: " +
          JSON.stringify(error.response?.data || "Internal Server Error")
      );
    }
  };

  return (
    <form className="booking-form" onSubmit={handleSubmit}>
      <h2>Book Your Room</h2>

      <div className="form-group">
        <label>Name:</label>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Check-In:</label>
        <input type="date" name="checkIn" value={formData.checkIn} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Check-Out:</label>
        <input type="date" name="checkOut" value={formData.checkOut} onChange={handleChange} required />
      </div>
      <button type="submit" className="submit-btn">Confirm Booking</button>
    </form>
  );
};

export default BookingForm;

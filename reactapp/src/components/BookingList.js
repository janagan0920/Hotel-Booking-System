import React, { useState, useEffect } from "react";
import { getBookings } from "../utils/api";
import { STATUS_COLORS, STATUS_LABELS } from "../utils/constants";
import "./BookingList.css";

const BookingList = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await getBookings();
      const data = response?.data || response || [];
      setBookings(data);
    } catch (err) {
      setError("Could not load bookings. Please try again later.");
      console.error("Error fetching bookings:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading bookings...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="booking-list">
      <h2>All Bookings</h2>

      {bookings.length === 0 ? (
        <div className="empty-state">No bookings found</div>
      ) : (
        <table className="bookings-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Room Name</th>
              <th>Room Number</th>
              <th>Guest Name</th>
              <th>Guest Email</th>
              <th>Check-In</th>
              <th>Check-Out</th>
              <th>Total Price</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b.bookingId}>
                <td>{b.bookingId || "N/A"}</td>
                <td>{b.room?.roomName || b.room?.name || "N/A"}</td>
                <td>{b.room?.roomNumber || "N/A"}</td>
                <td>{b.guestName || "N/A"}</td>
                <td>{b.guestEmail || b.email || "N/A"}</td>
                <td>
                  {b.checkInDate
                    ? new Date(b.checkInDate).toLocaleDateString()
                    : "N/A"}
                </td>
                <td>
                  {b.checkOutDate
                    ? new Date(b.checkOutDate).toLocaleDateString()
                    : "N/A"}
                </td>
                <td>
                  {b.totalPrice !== undefined ? `$${b.totalPrice}` : "N/A"}
                </td>
                <td>
                  <span
                    className="status-badge"
                    style={{
                      backgroundColor:
                        STATUS_COLORS[b.status] || "#ccc",
                    }}
                  >
                    {STATUS_LABELS[b.status] || b.status || "N/A"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BookingList;

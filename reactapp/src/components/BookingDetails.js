import React, { useEffect, useState } from "react";
import { getBookings } from "../utils/api";
import "./BookingDetails.css";

const BookingDetails = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const data = await getBookings();
      setBookings(data || []);
    } catch (err) {
      console.error("Error fetching bookings:", err);
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p style={{ textAlign: "center" }}>Loading bookings...</p>;
  }

  return (
    <div className="bookings-container">
      <h2>📖 All Bookings</h2>

      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <div className="table-wrapper">
          <table className="bookings-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Room</th>
                <th>Name</th>
                <th>Email</th>
                <th>Check-In</th>
                <th>Check-Out</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b.id}>
                  <td>{b.id}</td>
                  <td>{b.roomName || "N/A"}</td>
                  <td>{b.name || "N/A"}</td>
                  <td>{b.email || "N/A"}</td>
                  <td>{b.checkIn}</td>
                  <td>{b.checkOut}</td>
                  <td>
                    <span
                      className={`status ${
                        b.status === "APPROVED"
                          ? "status-approved"
                          : b.status === "REJECTED"
                          ? "status-rejected"
                          : "status-pending"
                      }`}
                    >
                      {b.status || "PENDING"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BookingDetails;

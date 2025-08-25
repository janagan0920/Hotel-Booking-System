import React, { useEffect, useState } from "react";
import { getBookings, updateBookingStatus } from "../utils/api";
import "./AdminPanel.css";

const AdminPanel = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const data = await getBookings();
      setBookings(data || []);
    } catch (err) {
      console.error("Error fetching bookings:", err);
    }
  };

  const handleApproval = async (id, status) => {
    try {
      await updateBookingStatus(id, status);
      fetchBookings(); // refresh after update
    } catch (err) {
      console.error("Error updating booking:", err);
    }
  };

  return (
    <div className="admin-container">
      <h2>🔑 Admin Panel</h2>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Room</th>
              <th>Name</th>
              <th>Email</th>
              <th>Check-In</th>
              <th>Check-Out</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b.bookingId}>
                <td>{b.bookingId}</td>
                <td>{b.room?.roomName}</td>
                <td>{b.guestName}</td>
                <td>{b.guestEmail}</td>
                <td>{b.checkInDate}</td>
                <td>{b.checkOutDate}</td>
                <td>{b.status}</td>
                <td>
                  <button
                    className="approve-btn"
                    onClick={() => handleApproval(b.bookingId, "APPROVED")}
                  >
                    ✅ Approve
                  </button>
                  <button
                    className="reject-btn"
                    onClick={() => handleApproval(b.bookingId, "REJECTED")}
                  >
                    ❌ Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminPanel;

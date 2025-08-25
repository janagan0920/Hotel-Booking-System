import React, { useEffect, useState } from "react";
import { getBookings } from "../utils/api";
import "./MyBookings.css";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await getBookings();
        console.log("Full API Response:", res); // <-- log the entire response

        // Check what your API actually returns:
        // if it's an array directly: setBookings(res || []);
        // if it's { data: [...] }: setBookings(res.data || []);
        setBookings(Array.isArray(res) ? res : res?.data || []);
      } catch (err) {
        console.error("Error fetching bookings:", err);
        setBookings([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) return <p style={{ textAlign: "center" }}>Loading your bookings...</p>;

  return (
    <div className="container">
      <h2>📖 My Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings available.</p>
      ) : (
        bookings.map((booking, index) => (
          <div key={index} className="booking-card">
            {Object.keys(booking).map((key) => (
              <p key={key}>
                <strong>{key}:</strong>{" "}
                {typeof booking[key] === "object" && booking[key] !== null
                  ? JSON.stringify(booking[key])
                  : booking[key]?.toString() || "N/A"}
              </p>
            ))}
            <hr />
          </div>
        ))
      )}
    </div>
  );
};

export default MyBookings;

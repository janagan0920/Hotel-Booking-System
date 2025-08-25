import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getRooms } from "../utils/api"; // fetch all rooms
import "./RoomListing.css";

const RoomListing = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await getRooms();
        console.log("All rooms:", response);

        const roomData = Array.isArray(response) ? response : response?.data || [];
        setRooms(roomData);
      } catch (err) {
        console.error("Error fetching rooms:", err);
        setRooms([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  const handleToggleAvailable = () => {
    setShowAvailableOnly(!showAvailableOnly);
  };

  const filteredRooms = showAvailableOnly
    ? rooms.filter((room) => room.available)
    : rooms;

  if (loading) return <p style={{ textAlign: "center" }}>Loading rooms...</p>;

  return (
    <div className="room-listing">
      <h2>🏨 Rooms</h2>

      <div className="filter">
        <label>
          <input
            type="checkbox"
            checked={showAvailableOnly}
            onChange={handleToggleAvailable}
          />{" "}
          Show only available rooms
        </label>
      </div>

      {filteredRooms.length === 0 ? (
        <p>No rooms found.</p>
      ) : (
        <div className="rooms">
          {filteredRooms.map((room) => (
            <div key={room.roomId || room.id} className="room-card">
              <h3>{room.roomName || room.name || "Unnamed Room"}</h3>
              <p>Type: {room.type || "N/A"}</p>
              <p>Capacity: {room.capacity || "N/A"}</p>
              <p>Price per Night: ${room.pricePerNight || room.price || "N/A"}</p>
              <p>Status: {room.available ? "Available" : "Unavailable"}</p>
              {room.available ? (
                <Link to={`/booking/${room.roomId || room.id}`} className="btn-book">
                  Book Now
                </Link>
              ) : (
                <button className="btn-disabled" disabled>
                  Not Available
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RoomListing;

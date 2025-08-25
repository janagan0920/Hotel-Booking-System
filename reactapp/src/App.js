import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import RoomListing from "./components/RoomListing";
import BookingForm from "./components/BookingForm";
import BookingList from "./components/BookingList";
import MyBookings from "./components/MyBookings";
import AdminPanel from "./components/AdminPanel";
import "./App.css";
import LoginPage from "./components/LoginPage";
import SignupForm from "./components/SignupForm";

function App() {
  const currentUserEmail = "user@example.com"; // replace with actual logged-in user

  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rooms" element={<RoomListing />} />
          <Route path="/booking/:roomId" element={<BookingForm />} />
          <Route path="/bookings" element={<BookingList />} />
          <Route
            path="/mybookings"
            element={<MyBookings userEmail={currentUserEmail} />}
          />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupForm/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      

      {/* Hero Section */}
      <header className="hero">
        <div className="hero-content">
          <h1>Welcome to LuxeStay Hotels</h1>
          <p>Your comfort, our priority – book the perfect room today.</p>
          <Link to="/rooms" className="btn-primary">
            Explore Rooms
          </Link>
        </div>
      </header>

      {/* Highlights */}
      <section className="highlights">
        <div className="highlight-card">
          <h3>🌟 Luxury Rooms</h3>
          <p>Spacious and stylish rooms with modern amenities.</p>
        </div>
        <div className="highlight-card">
          <h3>🍽 Fine Dining</h3>
          <p>Enjoy world-class cuisines prepared by top chefs.</p>
        </div>
        <div className="highlight-card">
          <h3>💻 Easy Booking</h3>
          <p>Quick, secure, and hassle-free booking experience.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 LuxeStay Hotels. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;

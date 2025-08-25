import React from "react";
import { useNavigate } from "react-router-dom";
import "./SignupForm.css";


const SignupForm = () => {
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    navigate("/login"); // go to login page
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup}>
        <div>
          <label>Full Name:</label>
          <input type="text" name="fullName" />
        </div>

        <div>
          <label>Email:</label>
          <input type="email" name="email" />
        </div>

        <div>
          <label>Password:</label>
          <input type="password" name="password" />
        </div>

        <div>
          <label>Confirm Password:</label>
          <input type="password" name="confirmPassword" />
        </div>

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignupForm;

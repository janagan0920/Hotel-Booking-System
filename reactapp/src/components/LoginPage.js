import React from "react";
import { useNavigate } from "react-router-dom";
import "./SignupForm.css";


const LoginForm = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/"); // go to Home (App.js content)
  };

  return (
    <div className="signup-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input type="email" name="email" />
        </div>

        <div>
          <label>Password:</label>
          <input type="password" name="password" />
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;

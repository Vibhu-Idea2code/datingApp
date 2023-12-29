import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
// import HomeLayout from 'src/layout/HomeLayout';

const AdminLogin = () => {
  const [email, setUsername] = useState("");

  const [error, setError] = useState(null);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      // Make an API call to your login endpoint
      const response = await axios.post(
        "http://localhost:9500/v1/admin/forgot",
        {
          email,
        }
      );
      // Handle successful login (redirect, set authentication token, etc.)
      console.log("Forgot Password successfully:", response.data);
      localStorage.setItem("token", response.data.refreshToken);
      console.log(response.data.refreshToken);
      setShowSuccessAlert(true);
      // Hide the success alert after 3 seconds (adjust the timeout as needed)
      setTimeout(() => {
        setShowSuccessAlert(false);
        navigate("/reset-password");
      }, 1000);
    } catch (err) {
      // Handle login error
      setError("Invalid username or password");
      console.error("Login error:", err);
    }
  };
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card-group">
              <div className="card p-2">
                <div className="card-body">
                  <h1>Forgot Password</h1>
                  <p className="text-medium-emphasis"></p>
                  {error && <div className="alert alert-danger">{error}</div>}
                  {showSuccessAlert && (
                    <div className="alert alert-success">
                      Check Your Mail To Reset Password
                    </div>
                  )}
                  <div className="input-group mb-3">
                    <span className="input-group-text">
                      <i className="cil-user"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="email"
                      value={email}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <div className="row">
                    <div className="col-6">
                      <button
                        className="btn btn-primary px-4"
                        onClick={handleLogin}>
                        Submit
                      </button>
                    </div>
                    <div className="col-6 text-end">
                      <Link to="/" className="btn btn-link px-0">
                        Back To Login
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;

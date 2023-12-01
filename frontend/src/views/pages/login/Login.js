import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';
// import HomeLayout from 'src/layout/HomeLayout';

const Login = () => {
  const [email, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      // Make an API call to your login endpoint
      const response = await axios.post('http://localhost:6500/v1/admin/login', {
        email,
        password,
      });

      // Handle successful login (redirect, set authentication token, etc.)
      console.log('Login successful:', response.data);
      localStorage.setItem('token', response.data.token);
      setShowSuccessAlert(true);

      // Hide the success alert after 3 seconds (adjust the timeout as needed)
      setTimeout(() => {
        setShowSuccessAlert(false);
        navigate('/dashboard');
      }, 3000);
    } catch (err) {
      // Handle login error
      setError('Invalid username or password');
      console.error('Login error:', err);
    }
  };

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card-group">
              <div className="card p-4">
                <div className="card-body">
                  <h1>Login</h1>
                  <p className="text-medium-emphasis">Sign In to your account</p>
                  {error && <div className="alert alert-danger">{error}</div>}
        {showSuccessAlert && (
          <div className="alert alert-success">
            Login successful! Redirecting to the dashboard...
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
                  <div className="input-group mb-4">
                    <span className="input-group-text">
                      <i className="cil-lock-locked"></i>
                    </span>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="row">
                    <div className="col-6">
                      <button className="btn btn-primary px-4" onClick={handleLogin}>
                        Login
                      </button>
                    </div>
                    <div className="col-6 text-end">
                      <Link to="/forgot-password" className="btn btn-link px-0">
                        Forgot password?
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card text-white bg-primary py-5" style={{ width: '44%' }}>
                <div className="card-body text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                      tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <Link to="/register" className="btn btn-primary mt-3">
                      Register Now!
                    </Link>
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

export default Login;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [admin_name, setAdminName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [role, setRole] = useState('');
  const [admin_image, setAdminImage] = useState(null); // For file input
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      // Check if passwords match
      // if (password !== repeatPassword) {
      //   setError('Passwords do not match');
      //   return;
      // }

      // Create FormData for sending files (e.g., adminImage)
      const formData = new FormData();
      formData.append('admin_name', admin_name);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('phoneNumber', phoneNumber);
      // formData.append('role', role);
      formData.append('admin_image', admin_image);

      // Make an API call to your register endpoint
      const response = await axios.post('http://localhost:6500/v1/admin/create-admin', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Important when sending files
        },
        
      });

      // Handle successful registration
      console.log('Registration successful:', response.data);

      // Redirect to login page after successful registration
      navigate('/login');
    } catch (err) {
      // Handle registration error
      setError('Error during registration');
      console.error('Registration error:', err);
    }
  };

  // Handle file input change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setAdminImage(file);
  };

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card">
              <div className="card-body">
                <h1>Register</h1>
                <p>Create your account</p>
                {error && <div className="alert alert-danger">{error}</div>}
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Admin Name"
                    value={admin_name}
                    onChange={(e) => setAdminName(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Phone Number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
                {/* <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  />
                </div> */}
                <div className="mb-3" encType="multipart/form-data" method="POST">
                  <label htmlFor="adminImage" className="form-label">
                    Admin Image
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    id="adminImage"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </div>
                <div className="d-grid">
                  <button className="btn btn-success" onClick={handleRegister}>
                    Create Account
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

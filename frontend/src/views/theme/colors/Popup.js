// Popup.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Popup.css';

const Popup = ({ onClose, userId }) => {
  // const { first_name } = useParams();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch user data from your API
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`http://localhost:7500/v1/user/getid-user-all/${userId}`);
        console.log('response', response)
        setUsers(response.data.data.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUsers();
  }, [userId]); // Include userId as a dependency

  return (
    <div>
      <h2>User Details</h2>
      {users ? (
        <div>
          <p>User ID: {users._id}</p>
          <p>Name: {users.first_name}</p>
          <p>Email: {users.email}</p>
          {/* Add other user details as needed */}
        </div>
      ) : (
        <p>Loading user details...</p>
      )}
    </div>
  );
};

export default Popup;

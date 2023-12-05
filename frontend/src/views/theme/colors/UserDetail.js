import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserDetails = ({ userId }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Make a GET request to the API endpoint for fetching user data by ID
        const response = await axios.get(`http://example.com/api/users/${userId}`);
        setUserData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    // Fetch user data when the component mounts or when userId changes
    fetchUserData();
  }, [userId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (!userData) {
    return <p>No user data available</p>;
  }

  // Render user details using userData

  return (
    <div>
      <h2>User Details</h2>
      <p>User ID: {userData.id}</p>
      <p>Name: {userData.name}</p>
      <p>Email: {userData.email}</p>
      {/* Add other user details as needed */}
    </div>
  );
};

export default UserDetails;

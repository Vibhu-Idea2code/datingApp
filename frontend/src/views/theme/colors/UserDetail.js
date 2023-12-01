// UserDetails.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserDetails = ({ userId }) => {
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:6500/v1/user/details/${userId}`);
        setUserDetails(response.data.data);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, [userId]);

  if (!userDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>User Details</h2>
      <div>
        <p>Full Name: {userDetails.first_name} {userDetails.last_name}</p>
        <p>Email: {userDetails.email}</p>
        {/* Add more details as needed */}
      </div>
    </div>
  );
};

export default UserDetails;

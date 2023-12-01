// UserList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './user.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import UserDetail from './UserDetails';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    // Fetch user data from your API
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:7500/v1/user/role', 
        // {
        //   headers: {
        //     Authorization: 'Bearer YOUR_JWT_TOKEN',
        //   },
        // });
        );
        setUsers(response.data.data.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleViewDetails = (userId) => {
    // Set the selectedUserId to trigger the UserDetails component to render
    setSelectedUserId(userId);
  };

  // const handleCloseDetails = () => {
  //   // Close the UserDetails component
  //   setSelectedUserId(null);
  // };
  return (
    <div>
      <h2>User List</h2>
      <div className="tab-content tabs" id="home">
        <div role="tabpanel" className="tab-pane active" id="Section1">
          <div className="table-responsive">
            <table className="table table-striped w-100" id="UsersTable">
              <thead>
                <tr>
                  <th>User Image</th>
                  <th>Full Name</th>
                  {/* <th>Identity</th> */}
                  {/* <th>Live Stream Eligible</th> */}
                  <th>Email</th>
                  <th>Age</th>
                  <th>PhoneNumber</th>
                  <th>Gender</th>
                  <th>Block User</th>
                  <th>View Details</th>

                </tr>
              </thead>
              <tbody>
                {Array.isArray(users) &&
                  users.map((user) => (
                    <tr key={user._id}>
                      {/* Render table cells for user details */}
                      <td>
                        {user.user_img && (
                          <img
                            src={user.user_img} // Assuming user_img contains the correct URL or path
                            alt={`Image for ${user.first_name} ${user.last_name}`}
                            style={{ width: '50px', height: '50px' }} // Adjust the width and height as needed
                          />
                        )}
                      </td>
                      <td>{user.first_name} {user.last_name}</td>
                      {/* <td>{user._id}</td> */}
                      <td>{user.email}</td>
                      <td>{user.age}</td>
                      <td> {user.phoneNumber}</td>
                      <td>{user.gender}</td>
                      <td>
                        {/* Pass the user ID to the handleViewDetails function */}
                        <button
                          className="view-details-btn"
                          onClick={() => handleViewDetails(user._id)}
                        >
                          Block User
                        </button>
                      </td>
                      {/* <td>{user.block}</td> */}
                      {/* <td></td> */}
                      <td>
                        {/* Pass the user ID to the handleViewDetails function */}
                        <button
                  className="view-details-btn"
                  onClick={() => handleViewDetails(user._id)}
                >
                  View Details
                </button>
                      </td>
                      {/* <td>{user.sexual}</td>
                      <td>{user.showMe}</td>
                      <td>{user.school}</td> */}
                      {/* <ul>
                          {user.interest.map((interestItem, index) => (
                            <li key={index}>{interestItem}</li>
                          ))}
                        </ul> */}
                      {/* Add more cells as needed */}
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          {/* Move the card-actions outside the table */}
        
        </div>
      </div>
    </div>
  );
};

  

export default Users;

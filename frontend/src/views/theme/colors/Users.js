// UserList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './user.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user data from your API
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:7500/v1/user/role');
        setUsers(response.data.data.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleViewDetails = (userId) => {
    const path = '/popup/Popup';
    const params = { paramName: 'paramValue' };
  
    // Set the selectedUserId to trigger the UserDetails component to render
    setSelectedUserId(userId);
    // Redirect to the popup page or any other page
    // navigate(`/popup/Popup/${"asd"}`);
    navigate(`${path}?${(userId).toString()}`);
  };

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
                      <td>
                        {user.user_img && (
                          <img
                            src={user.user_img}
                            alt={`Image for ${user.first_name} ${user.last_name}`}
                            style={{ width: '50px', height: '50px' }}
                          />
                        )}
                      </td>
                      <td>{user.first_name} {user.last_name}</td>
                      <td>{user.email}</td>
                      <td>{user.age}</td>
                      <td> {user.phoneNumber}</td>
                      <td>{user.gender}</td>
                      <td>
                        {/* <button
                          className="view-details-btn"
                          onClick={() => handleViewDetails(user._id)}
                        >
                          Block User
                        </button> */}
                      </td>
                      <td>
                        {/* Use Link to handle the redirection */}
                        <button 
                          className="view-details-btn"
                          onClick={() => handleViewDetails(user._id)} 
                        >
                          View Details User
                        </button>
                        
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;

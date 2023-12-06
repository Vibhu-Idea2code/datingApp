// Popup.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Popup.css";

const Popup = () => {
  const [userData, setUserData] = useState(null);
  const [userId, setUserId] = useState();
  const [editedUserData, setEditedUserData] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    _InitialRender();
  }, []);

  const _InitialRender = () => {
    const currentUrl = window.location.href.split("?");
    setUserId(currentUrl[1].toString());
    fetchUserData(currentUrl[1].toString());
  };

  const fetchUserData = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:7500/v1/user/getid-user-all/${id}`
      );
      setUserData(response.data.data);
      setEditedUserData(response.data.data); // Initialize editedUserData with fetched data
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveClick = async () => {
    const article = {
      first_name: editedUserData.first_name,
      last_name: editedUserData.last_name,
      email: "hg.idea2code@gmail.com",
      phoneNumber: 8758893096,
      birthDate: "1996-09-03",
      gender: "women",
      sexual: "queer",
      showMe: "men",
      school: "ppsv",
      interest: ["music", "drink", "smoke"],
      sign: ["leo", "virgo", "libra"],
      pets: ["cat", "dog", "pet-free"],
      address: "vesu",
      lat: 21.17024,
      long: 72.831062,
      maxAge: 25,
      minAge: 20,
      maxDistance: "3miles",
      jobTitle: "insurance",
    };
    axios.put(`http://localhost:7500/v1/user/update/${userId}`, article).then(
      (response) => {
        fetchUserData(userId);
        setIsEditing(false);
      }
    );
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedUserData(userData); // Reset editedUserData to original data
  };

  return (
    <div>
      <h2>User Details</h2>

      {userData && !isEditing ? (
        <div>
          <p>first_name: {userData.first_name}</p>
          <p>last_name: {userData.last_name}</p>
          <p>User ID: {userData.phoneNumber}</p>
          <p>email: {userData.email}</p>
          {/* Include other user details as needed */}
          <button onClick={handleEditClick}>Edit</button>
        </div>
      ) : (
        <div>
          {/* Editable form */}
          <label htmlFor="first_name">First Name:</label>
          <input
            type="text"
            id="first_name"
            name="first_name"
            value={editedUserData.first_name || ""}
            onChange={handleInputChange}
          />

          <label htmlFor="last_name">Last Name:</label>
          <input
            type="text"
            id="last_name"
            name="last_name"
            value={editedUserData.last_name || ""}
            onChange={handleInputChange}
          />

          

          {/* Include other form fields for the user details as needed */}

          <button onClick={handleSaveClick}>Save</button>
          <button onClick={handleCancelClick}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default Popup;

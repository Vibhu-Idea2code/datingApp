import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Users from "../../../User/IndexUser";
// import UserDetail from './UserDetails';
import UserDetails from "./UserDetDemo";

const common = () => {
  return (
    <Router>
      <Routes>
        <Route path="/user/" element={<Users />} />
        <Route path="/user-details/:userId" element={<UserDetails />} />
      </Routes>
    </Router>
  );
};

export default common;

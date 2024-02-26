import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "./userSlice";
// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import { usersSlice } from "./userSlice";
import MUIDataTable from "mui-datatables";
function IndexUser() {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) =>
    console.log(state.users, "state")
  );

  useEffect(() => {
    dispatch(usersSlice());
  }, [dispatch]);

  const columns = ["Name", "Age", "Email"]; // Example columns
  const options = {}; // Example options for MUIDataTable

  return (
    <div>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      <MUIDataTable
        title={"User Data"}
        data={data}
        columns={columns}
        options={options}
      />
    </div>
  );
}

export default IndexUser;

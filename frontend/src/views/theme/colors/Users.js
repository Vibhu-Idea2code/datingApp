import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
// import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";

const columns = [
  { field: "_id", headerName: "ID", width: 90 },
  {
    field: "user_img", // New column for profile picture
    headerName: "user_img",
    width: 150,
    renderCell: (params) => (
      <img
        src={params.row.user_img} // Assuming the URL of the image is in the profile_picture field
        alt={`Profile of ${params.row.first_name} ${params.row.last_name}`}
        style={{ height: "50px", width: "50px", borderRadius: "50%" }}
      />
    ),
  },
  {
    field: "first_name",
    headerName: "First name",
    width: 150,
    editable: true,
  },
  {
    field: "last_name",
    headerName: "Last name",
    width: 150,
    editable: true,
  },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 110,
    editable: true,
  },
  {
    field: "email",
    headerName: "email",
    type: "email",
    width: 250,
    editable: true,
  },
  {
    field: "actions",
    headerName: "Actions",
    width: 200,
    sortable: false,
    renderCell: (params) => (
      <>
        <IconButton
          color="primary"
          onClick={() => handleEdit(params.id)}
          disabled={params.row.editing}>
          <EditIcon />
        </IconButton>
        <IconButton
          color="secondary"
          onClick={() => handleDelete(params.id)}
          disabled={params.row.editing}>
          <DeleteIcon />
        </IconButton>
        <IconButton
          onClick={() => handleView(params.id)}
          disabled={params.row.editing}>
          <VisibilityIcon />
        </IconButton>
        {params.row.editing ? (
          <>
            <IconButton
              color="primary"
              onClick={() => handleUpdate(params.row)}>
              <CheckIcon />
            </IconButton>
            <IconButton
              color="secondary"
              onClick={() => handleCancelEdit(params.id)}>
              <ClearIcon />
            </IconButton>
          </>
        ) : null}
      </>
    ),
  },
];

export default function Users() {
  const [rows, setRows] = useState([]);

  const getData = () => {
    axios.get("http://localhost:8500/v1/admin/user-list").then((res) => {
      console.log(res);
      // setRows(res.data.data);
      const updatedRows = res.data.data.map((apiRow) => ({
        ...apiRow,
        id: apiRow._id,
      }));

      setRows(updatedRows);
    });
  };

  useEffect(() => {
    getData();
  }, []);
  // const handleEdit = (userId) => {

  //   console.log("Edit user with ID:", userId);
  // };

  // const handleDelete = (userId) => {
  //   // Add logic for delete action
  //   console.log("Delete user with ID:", userId);
  // };

  // const handleView = (userId) => {
  //   // Add logic for view action
  //   console.log("View user with ID:", userId);
  // };

  return (
    <Box>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
}

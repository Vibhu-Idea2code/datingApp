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
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import MUIDataTable from "mui-datatables";
import { Grid, Switch } from "@mui/material";
import * as Icons from "@mui/icons-material";
// import no_profile from "../../../assets/images/users/no_profile.jpg";
import swal from "sweetalert";

export default function IndexUser() {
  const navigate = useNavigate();
  // const [rows, setRows] = useState([]);
  const [datatableData, setdatatableData] = useState([]);
  const [baseurl, setbaseurl] = useState([]);
  const getData = async () => {
    await axios.get("http://localhost:9500/v1/admin/user-list").then((res) => {
      setdatatableData(res.data.data);
      setbaseurl(res.data.baseUrl);
    });
  };



  useEffect(() => {
    getData();
  }, []);

  const columns = [
    {
      name: "first_name",
      label: "Name",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "email",
      label: "Email",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "phoneNumber",
      label: "Mobile No",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "age",
      label: "Age",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "gender",
      label: "Gender",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "status",
      label: "Status",
      options: {
        filter: true,
        sort: false,
        customBodyRender: (_, { rowIndex }) => {
          // console.log(datatableData[rowIndex]);
          const { status, _id } = datatableData[rowIndex];
          return (
            // <p>asd</p>
            <Switch
              checked={status}
              onChange={() => {
                const data = { id: _id, status: !status };
                updateUserStatus(data, _id)
                  .then(() => {
                    toast.success("status changed successfully!", {
                      key: data._id,
                    });
                    list();
                  })
                  .catch(() => {
                    toast.error("something went wrong!", {
                      key: data._id,
                    });
                  });
              }}
            />
          );
        },
      },
    },
    {
      name: "_id",
      label: "Action",
      options: {
        customBodyRender: (value) => {
          const editdata = datatableData.find((data) => data._id === value);
          // console.log(editdata);
          return (
            <div>
              <Icons.Edit
                className="editIcon"
                style={{
                  marginRight: "10px",
                  marginBottom: "5px",
                  color: "green",
                }}
                onClick={() => {
                  const editdata = datatableData.find(
                    (data) => data._id === value
                  );
                  navigate("/indexForm", {
                    state: { editdata: editdata, baseurl: baseurl },
                  });
                  // console.log(editdata,"editdata-user list : line number :- 159");
                  // console.log(imageurl);
                }}
              />
              <Icons.Delete
                className="deleteIcon"
                style={{
                  marginRight: "10px",
                  marginBottom: "5px",
                  color: "6E260E",
                }}
                onClick={async () => {
                  const confirm = await swal({
                    title: "Are you sure?",
                    text: "Are you sure that you want to delete this user?",
                    icon: "warning",
                    buttons: ["No, cancel it!", "Yes, I am sure!"],
                    dangerMode: true,
                  });
                         if (confirm) {
                    // console.log(confirm);
                    await axios
                      .delete(
                        `http://localhost:9500/v1/admin/delete-user/${value}`,
                        value
                      )
                      .then((res) => {
                        console.log("deleted successfully!");
                        getData();
                      })
                      .catch(() => {
                        console.error("something went wrong!", {});
                      });
                  }
                }}
              />
            </div>
          );
        },
      },
    },
  ];

  const deleteMultiple = async (index) => {
    // const ids = index.data.map(
    //   (index1) =>
    //     datatableData.find(
    //       (data, index2) => index2 === index1.dataIndex && data._id
    //     )._id
    // );
    // const confirm = await swal({
    //   title: "Are you sure?",
    //   text: "Are you sure that you want to delete this users?",
    //   icon: "warning",
    //   buttons: ["No, cancel it!", "Yes, I am sure!"],
    //   dangerMode: true,
    // });
    // if (confirm) {
    //   deleteMultiUser(ids)
    //     .then(() => {
    //       list();
    //       toast.success("Deleted successfully!", {
    //         key: ids,
    //       });
    //     })
    //     .catch(() => {
    //       toast.error("Something went wrong!", {
    //         key: ids,
    //       });
    //     });
    // }
  };

  const SelectedRowsToolbar = ({ selectedRows, data }) => {
    return console.log(data);
    // <div>
    //   <IconButton onClick={() => deleteMultiple(selectedRows, data)}>
    //     <Icons.Delete />
    //   </IconButton>
    // </div>
  };

  const options = {
    customToolbarSelect: (selectedRows, data) => (
      <SelectedRowsToolbar
        selectedRows={selectedRows}
        data={data}
        columns={columns}
        datatableTitle="test"
      />
    ),
  };
  return (
    <Grid>
      <div className="container-fluid">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb m-0 mb-3 ms-2">
            <li className="breadcrumb-item">
              <a className="" href="/">
                Home
              </a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Users
            </li>
          </ol>
        </nav>
      </div>

      <Button
        style={{
          position: "absolute",
          top: 129,
          right: 50,
          borderRadius: 1,
          fontWeight: "bold",
          marginBottom: "10px",
          backgroundColor: "#ff4d67",
        }}
        variant="contained"
        color="primary"
        onClick={() => {
          navigate("/indexForm");
        }}>
        Add User
      </Button>

      <MUIDataTable
        title={"Users"}
        data={datatableData}
        columns={columns}
        options={options}
      />
    </Grid>
  );
}

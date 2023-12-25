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
import no_profile from "../../../assets/images/users/no_profile.jpg";

export default function Sign() {
  const navigate = useNavigate();
  // const [rows, setRows] = useState([]);
  const [datatableData, setdatatableData] = useState([]);

  const getData = async () => {
    await axios.get("http://localhost:9500/v1/sign/list").then((res) => {
      setdatatableData(res.data.data);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  const columns = [
    /* ---------------------------- COLUMNS FOR NAME ---------------------------- */
    {
      name: "name",
      label: "Name",
      options: {
        filter: true,
        sort: true,
      },
    },
    /* --------------------------- COLUMNS FOR STATUS --------------------------- */
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
    /* --------------------------- COLUMNS FOR ACTIONS -------------------------- */
    {
      name: "_id",
      label: "Action",
      options: {
        customBodyRender: (value) => {
          const editdata = datatableData.find((data) => data._id === value);
          // console.log(editdata);
          return (
            <div>
              <Icons.BarChart
                className="insightsIcon"
                onClick={() => {
                  const userdata = datatableData.find(
                    (data) => data._id === value
                  );

                  const currentDate = new Date();
                  const options = {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  };
                  const formattedDate = new Intl.DateTimeFormat(
                    "en-US",
                    options
                  ).format(currentDate);
                  const insightdata = { userid: value, date: formattedDate };

                  navigate("/popup", {
                    state: {
                      userdata: userdata,
                      insightdata: insightdata,
                      imageurl: baseurl,
                    },
                  });
                }}
              />
              <Icons.Edit
                className="editIcon"
                onClick={() => {
                  const editdata = datatableData.find(
                    (data) => data._id === value
                  );
                  navigate("/user/manage", {
                    state: { editdata: editdata, imageurl: baseurl },
                  });
                }}
              />
              <Icons.Delete
                className="deleteIcon"
                onClick={async () => {
                  const confirm = await swal({
                    title: "Are you sure?",
                    text: "Are you sure that you want to delete this user?",
                    icon: "warning",
                    buttons: ["No, cancel it!", "Yes, I am sure!"],
                    dangerMode: true,
                  });
                  if (confirm) {
                    // console.log(value);
                    deleteUser(value)
                      .then(() => {
                        toast.success("deleted successfully!", {
                          key: value,
                        });
                        list();
                      })
                      .catch(() => {
                        toast.error("something went wrong!", {
                          key: value,
                        });
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
        }}
        variant="contained"
        color="primary"
        onClick={() => {
          navigate("/AddSign");
        }}>
        Add Sign
      </Button>

      <MUIDataTable
        title={"Sign"}
        data={datatableData}
        columns={columns}
        options={options}
      />
    </Grid>
  );
}

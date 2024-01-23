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
import { useUserState } from "src/context/UserContext";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';


import {  updateCountryCodeStatus, deleteMultiCountryCode ,deleteCountryCode} from '../../apiController';
import swal from "sweetalert";

// import no_profile from "../../../assets/images/users/no_profile.jpg";

export default function Interest() {
  const navigate = useNavigate();
  // const [rows, setRows] = useState([]);
  const { userRole } = useUserState();
  // console.log(userRole);
  const [datatableData, setdatatableData] = useState([]);
  const [baseurl, setbaseurl] = useState("");
  const getData = async () => {
    await axios
      .get("http://localhost:9500/v1/countryCode/list-code")
      .then((res) => {
        // console.log()
        setdatatableData(res.data.data);
        setbaseurl(res.data.baseUrl);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const columns = [
    {
      name: "countryflag",
      label: "Profile",
      options: {
        customBodyRender: (countryflag) =>
          countryflag ? (
            <img
              src={`http://localhost:9500/profile_images/${countryflag}`}
              alt={countryflag}
              style={{ height: "50px", width: "50px", borderRadius: "50%" }}
            />
          ) : (
            <img
              src={no_profile}
              alt={countryflag}
              style={{ height: "50px", width: "50px", borderRadius: "50%" }}
            />
          ),
      },
    },
    {
      name: "countryCode",
      label: "Name",
      options: {
        filter: true,
        sort: true,
      },
    },
    // {
    //   name: "email",
    //   label: "Email",
    //   options: {
    //     filter: true,
    //     sort: true,
    //   },
    // },
    // {
    //   name: "phoneNumber",
    //   label: "Mobile No",
    //   options: {
    //     filter: true,
    //     sort: true,
    //   },
    // },
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
                updateCountryCodeStatus(data, _id)
                  .then(() => {
                    toast.success("status changed successfully!", {
                      key: data._id,
                    });
                    getData();

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
              {/* <Icons.BarChart
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
                      baseurl: baseurl,
                    },
                  });
                }}
              /> */}
              <Icons.Edit
                className="editIcon"
                style={{
                  width: "35px",
                  height: "40px",
                  cursor: "pointer",
                }}
                onClick={() => {
                  const editdata = datatableData.find(
                    (data) => data._id === value
                  );
                  navigate("/CountryCodeForm", {
                    state: { editdata: editdata, baseurl: baseurl },
                  });
                }}
              />
              <Icons.Delete
                className="deleteIcon"
                style={{
                  width: "35px",
                  height: "40px",
                  cursor: "pointer",
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
                    // console.log(value);
                    deleteCountryCode(value)
                      .then(() => {
                        toast.success("deleted successfully!", {
                          key: value,
                        });
                        getData();
                       
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
    const ids = index.data.map(
      (index1) =>
        datatableData.find(
          (data, index2) => index2 === index1.dataIndex && data._id
        )._id
    );
    const confirm = await swal({
      title: "Are you sure?",
      text: "Are you sure that you want to delete this users?",
      icon: "warning",
      buttons: ["No, cancel it!", "Yes, I am sure!"],
      dangerMode: true,
    });
    if (confirm) {
      deleteMultiCountryCode(ids)
        .then(() => {
          getData();
          toast.success("Deleted successfully!", {
            key: ids,
          });
        })
        .catch(() => {
          toast.error("Something went wrong!", {
            key: ids,
          });
        });
    }
  };

  const SelectedRowsToolbar = ({ selectedRows, data }) => {
    return (
      <div>
        <IconButton onClick={() => deleteMultiple(selectedRows, data)}>
          <Icons.Delete />
        </IconButton>
      </div>
    );
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
        <ToastContainer />
            <li className="breadcrumb-item">
              <a className="" href="/">
                Home
              </a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Country Code
            </li>
          </ol>
        </nav>
      </div>

      <Button
        style={{
          position: "absolute",
          top: 90,
          right: 30,
          borderRadius: 1,
          fontWeight: "bold",
          marginBottom: "10px",
          background: "#FF4D67",
          borderColor: "#FD788C",
          fontStyle: "Source Sans Pro",
        }}
        variant="contained"
        // color="primary"
        onClick={() => {
          navigate("/CountryCodeForm");
        }}>
        Add Country Code
      </Button>

      <MUIDataTable
        title={"Country Code"}
        data={datatableData}
        columns={columns}
        options={options}
      />
    </Grid>
  );
}

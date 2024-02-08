import * as React from "react";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import MUIDataTable from "mui-datatables";
import { Grid, Switch } from "@mui/material";
import * as Icons from "@mui/icons-material";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { updatePetStatus, deleteMultiPet } from "../../apiController";
import "react-toastify/dist/ReactToastify.css";
import IconButton from "@mui/material/IconButton";

import swal from "sweetalert";
import "../../scss/_custom.scss";

export default function Pets() {
  const navigate = useNavigate();
  // const [rows, setRows] = useState([]);
  const [datatableData, setdatatableData] = useState([]);

  const getData = async () => {
    await axios
      .get("http://localhost:9500/v1/pet/list", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        setdatatableData(res.data.data);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const columns = [
    {
      name: "name",
      label: "Name",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "status",
      label: "STATUS",
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
                updatePetStatus(data, _id)
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
                    },
                  });
                }}
              /> */}
              <Icons.Edit
                className="editIcon"
              
                onClick={() => {
                  const editdata = datatableData.find(
                    (data) => data._id === value
                  );
                  navigate("/AddPet", {
                    state: { editdata: editdata },
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
                    // console.log(confirm);
                    await axios
                      .delete(
                        `http://localhost:9500/v1/pet/delete/${value}`,
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
      deleteMultiPet(ids)
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
              Pet
            </li>
          </ol>
        </nav>
      </div>

      <Button
        className="btn btn-primary"
        style={{
          position: "absolute",
          top: 90,
          right: 30,
          borderRadius: 1,
          fontWeight: "bold",
          marginBottom: "10px",
          backgroundColor: "#ff4d67",
        }}
        variant="contained"
        color="primary"
        onClick={() => {
          navigate("/AddPet");
        }}>
        Add Pet
      </Button>

      <MUIDataTable
        title={"Pet"}
        data={datatableData}
        columns={columns}
        options={options}
      />
    </Grid>
  );
}

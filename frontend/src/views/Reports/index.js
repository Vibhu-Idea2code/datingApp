import * as React from "react";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import MUIDataTable from "mui-datatables";
import { Grid, IconButton, Switch } from "@mui/material";
import * as Icons from "@mui/icons-material";
import swal from "sweetalert";
import "../../scss/_custom.scss";
import { reports } from "../../apiController";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function report() {
  const [datatableData, setdatatableData] = useState([]);

  const getData = async (data) => {
    await reports(data).then((res) => {
      console.log(res.data.report);

      const transformedData = res.data.report.map((report) => ({
        ...report,
        user: report.user?.map((user) => user.first_name),
        reportBy: report.reportBy?.map((reportBy) => reportBy.first_name),

      }));

    console.log(transformedData);
    setdatatableData(transformedData);
  });
};

  useEffect(() => {
    getData();
  }, []);

  const columns = [
    /* ---------------------------- COLUMNS FOR NAME ---------------------------- */
    {
      name: "user",
      label: "NAME",
      options: {},
    },
    {
      name: "reportBy",
      label: "REPORT BY",
      options: {},
    },
    {
      name: "reason",
      label: "REASON",
      options: {},
    },

    {
      name: "reportStatus",
      label: "STATUS",
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          // Customize the rendering of the status here
          return (
            <Switch
              checked={value === 'active'} // Adjust this condition based on your status values
              onChange={() => {
                // Handle status change if needed
              }}
              inputProps={{ 'aria-label': 'status switch' }}
            />
          );
            },
      },
    },
  ];

  const options = {
    selectableRows: "none",
    sort: false,
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
              Reports
            </li>
          </ol>
        </nav>
      </div>

      <MUIDataTable
        title={"Report"}
        data={datatableData}
        columns={columns}
        options={options}
      />
    </Grid>
  );
}

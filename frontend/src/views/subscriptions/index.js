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
import { subscription } from "../../apiController";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function subscriptions() {
  const navigate = useNavigate();
  // const [rows, setRows] = useState([]);
  const [datatableData, setdatatableData] = useState([]);

  const getData = async (data) => {
    await subscription(data).then((res) => {
      console.log(res.data.data);

      const transformedData = res.data.data.map((data) => ({
        ...data,
        planName: data.planid?.map((plan) => plan.planType),
        prices: data.planid?.map((plan) => plan.price),
        durations: data.planid?.map((plan) => plan.duration),
        names: data.userid?.map((user) => user.first_name),
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
      name: "names",
      label: "NAME",
      options: {
        // filter: true,
        // sort: true,
        // customBodyRender: (value, tableMeta, updateValue) => (
        //   // <div
        //   //   style={{
        //   //   textAlign:"center"  // font keep centre
        //   //   }}
        //   // >
        //   //   {value}
        //   // </div>
        // ),
        // sort: false, // sorting is disable
      },
    },
    {
      name: "planName",
      label: "PLAN NAME",
      options: {
        // filter: true,
        // sort: true,
        // customBodyRender: (value, tableMeta, updateValue) => (
        //   <div
        //     style={{
        //     textAlign:"center"
        //     }}
        //   >
        //     {value}
        //   </div>
        // ),
        // sort: false,
      },
    },
    {
      name: "prices",
      label: "PRICE",
      options: {
        // filter: true,
        // sort: true,
        // customBodyRender: (value, tableMeta, updateValue) => (
        //   <div
        //     style={{
        //     textAlign:"center"
        //     }}
        //   >
        //     {value}
        //   </div>
        // ),
        // sort: false,
      },
    },
    {
      name: "StartDate",
      label: "START DATE",
      options: {
        // filter: true,
        // sort: true,
        // customBodyRender: (value, tableMeta, updateValue) => (
        //   <div
        //     style={{
        //     textAlign:"center !important"
        //     }}
        //   >
        //     {value}
        //   </div>
        // ),
        // sort: false,
      },
    },
    {
      name: "endDate",
      label: "END DATE",
      options: {
        // filter: true,
        // sort: true,
        // customBodyRender: (value, tableMeta, updateValue) => (
        //   <div
        //     style={{
        //     // textAlign:"center !important"
        //     }}
        //   >
        //     {value}
        //   </div>
        // ),
        // sort: false,
      },
    },
    {
      name: "durations",
      label: "DURATION",
      options: {
        // filter: true,
        // sort: true,
      //   customBodyRender: (value, tableMeta, updateValue) => (
      //     <div
      //       style={{
      //       textAlign:"center"
      //       }}
      //     >
      //       {value}
      //     </div>
      //   ),
      //   // sort: false,
      },
    },
    {
      name: "cancelled",
      label: "CANCELLED",
      options: {
        filter: true,
        sort: true,
        // customBodyRender: (value, tableMeta, updateValue) => (
        //   <div
        //     style={{
        //     textAlign:"center"
        //     }}
        //   >
        //     {value}
          // </div>
        // ),
        // sort: false,
      },
    },
    {
      name: "status",
      label: "ACTIVE",
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => (
          <div
            style={{
              backgroundColor: "green", 
              color:"white",// Example: Set background color for the entire cell
              padding: "8px", // Add padding for better visibility
              borderRadius: "34%", // Add border-radius for rounded corners
              display: "inline-block", // Ensure block-level display for inline styling
            }}
          >
            {value}
          </div>
        ),
       
      },
    },  
  ];

  const options = {

    selectableRows: 'none',
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
              Subscription
            </li>
          </ol>
        </nav>
      </div>

      <MUIDataTable
        title={"Subscription"}
        data={datatableData}
        columns={columns}
        options={options}
      />
    </Grid>
  );
}

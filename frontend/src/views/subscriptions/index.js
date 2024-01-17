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
import {
  updateNotificationStatus,
  deleteMultiNotification,
  subscription,
} from "../../apiController";
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

        names:data.userid?.map((user)=>user.first_name),
        

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
      label: "first_name",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "planName",
      label: "PlanName",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "prices",
      label: "Price",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "StartDate",
      label: "StartDate",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "endDate",
      label: "EndDate",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "durations",
      label: "duration",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "cancelled",
      label: "cancelled",
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
        // customBodyRender: (_, { rowIndex }) => {
        //   // console.log(datatableData[rowIndex]);
        //   const { status, _id } = datatableData[rowIndex];
        //   return (
        //     // <p>asd</p>
        //     <Switch
        //       checked={status}
        //       onChange={() => {
        //         const data = { id: _id, status: !status };
        //         updateNotificationStatus(data, _id)
        //           .then(() => {
        //             toast.success("status changed successfully!", {
        //               key: data._id,
        //             });
        //             getData();

        //           })
        //           .catch(() => {
        //             toast.error("something went wrong!", {
        //               key: data._id,
        //             });
        //           });
        //       }}
        //     />
        //   );
        // },
      },
    },
    /* --------------------------- COLUMNS FOR ACTIONS -------------------------- */
    // {
    //   name: "_id",
    //   label: "Action",
    //   options: {
    //     customBodyRender: (value) => {
    //       const editdata = datatableData.find((data) => data._id === value);
    //       // console.log(editdata);
    //       return (
    //         <div>
    //           {/* <Icons.BarChart
    //             className="insightsIcon"
    //             onClick={() => {
    //               const userdata = datatableData.find(
    //                 (data) => data._id === value
    //               );

    //               const currentDate = new Date();
    //               const options = {
    //                 year: "numeric",
    //                 month: "2-digit",
    //                 day: "2-digit",
    //               };
    //               const formattedDate = new Intl.DateTimeFormat(
    //                 "en-US",
    //                 options
    //               ).format(currentDate);
    //               const insightdata = { userid: value, date: formattedDate };

    //               navigate("/popup", {
    //                 state: {
    //                   userdata: userdata,
    //                   insightdata: insightdata,
    //                 },
    //               });
    //             }}
    //           /> */}
    //           <Icons.Edit
    //             className="editIcon"
    //             style={{
    //               width: "1em",
    //               height: "1em",
    //               cursor: "pointer",
    //             }}
    //             onClick={() => {
    //               const editdata = datatableData.find(
    //                 (data) => data._id === value
    //               );
    //               navigate("/AddNotification", {
    //                 state: { editdata: editdata },
    //               });
    //             }}
    //           />
    //           <Icons.Delete
    //             className="deleteIcon"
    //             style={{
    //               width: "1em",
    //               height: "1em",
    //               cursor: "pointer",
    //             }}
    //             onClick={async () => {
    //               const confirm = await swal({
    //                 title: "Are you sure?",
    //                 text: "Are you sure that you want to delete this user?",
    //                 icon: "warning",
    //                 buttons: ["No, cancel it!", "Yes, I am sure!"],
    //                 dangerMode: true,
    //               });
    //               if (confirm) {
    //                 // console.log(confirm);
    //                 await axios
    //                   .delete(
    //                     `http://localhost:9500/v1/notification/delete/${value}`,
    //                     value
    //                   )
    //                   .then((res) => {
    //                     console.log("deleted successfully!");
    //                     getData();
    //                   })
    //                   .catch(() => {
    //                     console.error("something went wrong!", {});
    //                   });
    //               }
    //             }}
    //           />
    //         </div>
    //       );
    //     },
    //   },
    // },
  ];

  //   const deleteMultiple = async (index) => {
  //     const id = index.data.map(
  //       (index1) =>
  //         datatableData.find(
  //           (data, index2) => index2 === index1.dataIndex && data._id
  //         )._id
  //     );
  //     const confirm = await swal({
  //       title: "Are you sure?",
  //       text: "Are you sure that you want to delete this users?",
  //       icon: "warning",
  //       buttons: ["No, cancel it!", "Yes, I am sure!"],
  //       dangerMode: true,
  //     });
  //     if (confirm) {
  //         deleteMultiNotification(id)
  //         .then(() => {
  //           getData();

  //           toast.success("Deleted successfully!", {
  //             key: id,
  //           });
  //         })
  //         .catch(() => {
  //           toast.error("Something went wrong!", {
  //             key: id,
  //           });
  //         });
  //     }
  //   };

  //   const SelectedRowsToolbar = ({ selectedRows, data }) => {
  //     return (
  //       <div>
  //         <IconButton onClick={() => deleteMultiple(selectedRows, data)}>
  //           <Icons.Delete />
  //         </IconButton>
  //       </div>
  //     );
  //   };

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
              Subscription
            </li>
          </ol>
        </nav>
      </div>

      <MUIDataTable
        title={"Notification"}
        data={datatableData}
        columns={columns}
        options={options}
      />
    </Grid>
  );
}

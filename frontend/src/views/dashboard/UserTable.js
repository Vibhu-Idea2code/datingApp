import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import { toast, ToastContainer } from "react-toastify";
import { getUserDashboard } from "../../apiController";

const UserTable = () => {
  const [dataTableData, setDataTable] = useState([]);

  const activeUserList = async () => {
    try {
      const response = await getUserDashboard();
      const formattedData = response.data.ageRangeDetails.map((detail) => ({
        ageRange: detail.ageRange,
        count: detail.count,
        percentage: detail.percentage,
        userDetails: [
          {
            countryCode: detail.countryCode ? detail.countryCode : "null",
          },
        ],
      }));
      setDataTable(formattedData);
    } catch (error) {
      console.error("Error fetching user dashboard data:", error);
      toast.error("Failed to fetch user dashboard data");
    }
  };

  useEffect(() => {
    activeUserList();
  }, []);

  const columns = [
    {
      name: "ageRange",
      label: "Age Range",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "count",
      label: "Count",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "percentage",
      label: "Percentage",
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value) => {
          return value ? <div>{value}</div> : <div>null</div>;
        },
      },
    },
    {
      name: "userDetails",
      label: "Nationality",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value) => {
          const ccode =
            value && value.length > 0 ? value[0].countryCode : "null";
          return <div>{ccode}</div>;
        },
      },
    },
  ];

  const options = {
    selectableRows: "none",
    print: false,
    download: false,
    viewColumns: false,
    filter: false,
    rowsPerPage: 5,
  };

  return (
    <>
      <ToastContainer />
      <MUIDataTable
        data={dataTableData}
        columns={columns}
        options={options}
        title={"Users"}
      />
    </>
  );
};

export default UserTable;

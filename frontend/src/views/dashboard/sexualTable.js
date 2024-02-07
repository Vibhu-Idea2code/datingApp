import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import { toast, ToastContainer } from "react-toastify";
import { getSexualDashboard } from "../../apiController";

const UserTable = () => {
  const [dataTableData, setDataTable] = useState([]);

  const activeUserList = async () => {
    getSexualDashboard().then((res) => {
      setDataTable(res.data.ageRangeDetails);
    });
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
      },
    },
    {
      name: "userDetails",
      label: "Nationality",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value) => {
          return (
            <>
              {value.map((user, index) => (
                <div key={index}>{user.countryCode}</div>
              ))}
            </>
          );
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
    rowsPerPage: 3,
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

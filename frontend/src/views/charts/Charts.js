import React, { useEffect, useState } from "react";
import { CCard, CCardBody, CCol, CCardHeader, CRow } from "@coreui/react";
import {
  CChartBar,
  CChartDoughnut,
  CChartLine,
  CChartPie,
  CChartPolarArea,
  CChartRadar,
} from "@coreui/react-chartjs";
import { DocsCallout } from "src/components";
import { getUserDashboardChat } from "../../apiController";

const Charts = () => {
  const random = () => Math.round(Math.random() * 100);
  const [userData, setUserData] = useState(null);

  const getActiveInActionUser = async () => {
    try {
      const res = await getUserDashboardChat();
      const newData = res.data;
      console.log(newData);
      setUserData(newData);
      setIsLoading(false);
    } catch (err) {
      // if (!err.res.data.status) {
      //   if (err.response.data.status === 401) {
      //     toast.error(err.response.data.message);
      //   } else {
      //     toast.error(err.response.data, "else");
      //   }
      // }
    }
  };

  useEffect(() => {
    getActiveInActionUser();
  }, []);

  return (
    <CCol>
      <CCard className="mb-4">
        <CCardHeader>Subscribers User</CCardHeader>
        <CCardBody>
          {userData && (
            <CChartDoughnut
              data={{
                labels: ["Active Users", "Inactive Users"],
                datasets: [
                  {
                    backgroundColor: ["#41B883", "#E46651"],
                    data: [userData.trueCount, userData.falseCount],
                  },
                ],
              }}
            />
          )}
        </CCardBody>
      </CCard>
    </CCol>
  );
};

export default Charts;

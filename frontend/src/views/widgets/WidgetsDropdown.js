import { useState, useEffect } from "react";

import {
  CRow,
  CCol,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle,
  CWidgetStatsA,
  CCardHeader,
  CCard,
  CCardBody,
  CCardTitle,
} from "@coreui/react";
import { getStyle } from "@coreui/utils";
import { CChartBar, CChartLine } from "@coreui/react-chartjs";
import CIcon from "@coreui/icons-react";
import { cilOptions, cilPeople, cilUser } from "@coreui/icons";
import {
  getDashboardCount,
  getLastUsers,
  getStatuswiseUserCount,
} from "../../apiController"
;

const WidgetsDropdown = () => {
  const [isLoading, setIsLoading] = useState(true);

  /* ---------------------------------- USER ---------------------------------- */
  const [allCount, setAllCount] = useState(null);

  const [allCountTody, setAllCountToday] = useState(null);

  const [allCountWeek, setAllCountWeek] = useState(null);

  const [allCountMonth, setAllCountMonth] = useState(null);
  /* ------------------------------ SUBSCRIPTION ------------------------------ */
  const [allCountSub, setAllCountSub] = useState(null);

  const [allCountSubTody, setAllCountSubToday] = useState(null);

  const [allCountSubWeek, setAllCountSubWeek] = useState(null);

  const [allCountSubMonth, setAllCountSubMonth] = useState(null);

  const [userCount, setuserCount] = useState(null);
  const [today, setToday] = useState(null);

  const [datatableData, setdatatableData] = useState([]);

  // const random = (min, max) =>
  //   Math.floor(Math.random() * (max - min + 1) + min);

  const getAllCount = async () => {
    try {
      const response = await getDashboardCount();
      const resUserCount = await getStatuswiseUserCount();

      setuserCount(resUserCount.data.data);

      const newAllCount = response.data.data;
      // console.log(response.data.data,"123456")
      setAllCount(newAllCount);

      /* ---------------------------- TODAY COUNT USER ---------------------------- */
      const newAllCountTody = response.data.data.today;
      setAllCountToday(newAllCountTody);
      /* ---------------------------- WEEKLY COUNT USER --------------------------- */
      const newAllCountWeek = response.data.data.thisWeek;
      setAllCountWeek(newAllCountWeek);

      /* --------------------------- MONTHLY COUNT USER --------------------------- */
      const newAllCountMonth = response.data.data.thisMonth;
      setAllCountMonth(newAllCountMonth);

      /* ---------------------------- ALL SUBSCRIPTION ---------------------------- */
      const newAllCountsubs = response.data.data.subscriptionCount;
      // console.log(response.data.data.subscriptionCount,"123456")
      setAllCountSub(newAllCountsubs);
      /* ---------------------------- TODAY COUNT USER ---------------------------- */
      const newAllCountTodysubs = response.data.data.subtoday;
      setAllCountSubToday(newAllCountTodysubs);
      /* ---------------------------- WEEKLY COUNT USER --------------------------- */
      const newAllCountWeeksubs = response.data.data.subthisWeek;
      setAllCountSubWeek(newAllCountWeeksubs);

      /* --------------------------- MONTHLY COUNT USER --------------------------- */
      const newAllCountMonthsubs = response.data.data.subthisMonth;
      setAllCountSubMonth(newAllCountMonthsubs);

      // setIsLoading(false);
    } catch (err) {
      if (!err.response.data.isSuccess) {
        if (err.response.data.status === 401) {
          toast.error(err.response.data.message);
        } else {
          console.log(err.response.data.data, "else");
        }
      }
    }
  };

  useEffect(() => {
    getAllCount();
  }, []);

  return (
    <>
      <CRow>
        <CCardBody>
          <CCardTitle style={{ marginBottom: "20px" }}>
            Numbers of Users
          </CCardTitle>
        </CCardBody>
        {/* <CCardHeader>
            <strong>User</strong>
          </CCardHeader> */}
        <CCol sm={6} lg={3}>
          <CWidgetStatsA
            className="mb-4"
            // title="All Users"
            color="primary"
            value={
              <>
                <CIcon icon={cilPeople} />
                <br></br>
                <span style={{ fontSize: "16px" }}>All Users</span>
                <br></br>
                <span style={{ fontSize: "18px" }}> {allCount?.userCount}</span>
              </>
            }
          />
        </CCol>
        <CCol sm={6} lg={3}>
          <CWidgetStatsA
            className="mb-4"
            color="info"
            // title="new user today"
            value={
              <>
                <CIcon icon={cilUser} />
                <br></br>
                <span style={{ fontSize: "16px" }}>New User Today</span>
                <br></br>
                <span style={{ fontSize: "18px" }}> {allCountTody}</span>
              </>
            }
          />
        </CCol>
        <CCol sm={6} lg={3}>
          <CWidgetStatsA
            className="mb-4"
            color="warning"
            // title="new user today"
            value={
              <>
                <CIcon icon={cilUser} />
                <br></br>
                <span style={{ fontSize: "16px" }}>New User Weekly</span>
                <br></br>
                <span style={{ fontSize: "18px" }}> {allCountWeek}</span>
              </>
            }
          />
        </CCol>

        <CCol sm={6} lg={3}>
          <CWidgetStatsA
            className="mb-4"
            color="danger"
            // title="new user today"
            value={
              <>
                <CIcon icon={cilPeople} />
                <br></br>
                <span style={{ fontSize: "16px" }}>New User Monthly</span>
                <br></br>
                <span style={{ fontSize: "18px" }}> {allCountMonth}</span>
              </>
            }
          />
        </CCol>
       
      </CRow>

      <CRow>
        <CCardBody>
          <CCardTitle style={{ marginBottom: "20px" }}>
            Numbers of Subscriber
          </CCardTitle>
        </CCardBody>
        <CCol sm={6} lg={3}>
          <CWidgetStatsA
            className="mb-4"
            // title="All Subscribers"
            color="primary"
            value={
              <>
                <CIcon icon={cilPeople} />
                <br></br>
                <span style={{ fontSize: "16px" }}>All Subscribers</span>
                <br></br>
                <span style={{ fontSize: "18px" }}> {allCountSub}</span>
              </>
            }
          />
        </CCol>
        <CCol sm={6} lg={3}>
          <CWidgetStatsA
            className="mb-4"
            color="info"
            value={
              <>
                <CIcon icon={cilUser} />
                <br></br>
                <span style={{ fontSize: "16px" }}>New Subscribers Today</span>
                <br></br>
                <span style={{ fontSize: "18px" }}>{allCountSubTody}</span>
              </>
            }
          />
        </CCol>
        <CCol sm={6} lg={3}>
          <CWidgetStatsA
            className="mb-4"
            color="warning"
            // title="New Subscribers Weekly"
            value={
              <>
                <CIcon icon={cilUser} />
                <br></br>
                <span style={{ fontSize: "16px" }}>New Subscribers Weekly</span>
                <br></br>
                <span style={{ fontSize: "18px" }}> {allCountSubWeek}</span>
              </>
            }
          />
        </CCol>

        <CCol sm={6} lg={3}>
          <CWidgetStatsA
            className="mb-4"
            color="danger"
            // title="New Subscribers Monhtly"
            value={
              <>
                <CIcon icon={cilPeople} />
                <br></br>
                <span style={{ fontSize: "16px" }}>
                  New Subscribers Monhtly
                </span>
                <br></br>
                <span style={{ fontSize: "18px" }}> {allCountSubMonth}</span>
              </>
            }
          />
        </CCol>
       
      </CRow>
    </>
  );
};

export default WidgetsDropdown;

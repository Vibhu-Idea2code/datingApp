import { useState, useEffect } from "react";

import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from "@coreui/react";
import { CChartLine } from "@coreui/react-chartjs";
import { getStyle, hexToRgba } from "@coreui/utils";
import CIcon from "@coreui/icons-react";
import {
  cibCcAmex,
  cibCcApplePay,
  cibCcMastercard,
  cibCcPaypal,
  cibCcStripe,
  cibCcVisa,
  cibGoogle,
  cibFacebook,
  cibLinkedin,
  cifBr,
  cifEs,
  cifFr,
  cifIn,
  cifPl,
  cifUs,
  cibTwitter,
  cilCloudDownload,
  cilPeople,
  cilUser,
  cilUserFemale,
} from "@coreui/icons";

import avatar1 from "src/assets/images/avatars/1.jpg";
import avatar2 from "src/assets/images/avatars/2.jpg";
import avatar3 from "src/assets/images/avatars/3.jpg";
import avatar4 from "src/assets/images/avatars/4.jpg";
import avatar5 from "src/assets/images/avatars/5.jpg";
import avatar6 from "src/assets/images/avatars/6.jpg";

import UserTable from "./UserTable";
import Charts from "../charts/Charts";

import WidgetsBrand from "../widgets/WidgetsBrand";
import WidgetsDropdown from "../widgets/WidgetsDropdown";
import {
  getDashboardCount,
  getLastUsers,
  getStatuswiseUserCount,
  getUserDashboard,
} from "../../apiController";

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [allCount, setAllCount] = useState(null);
  const [userCount, setuserCount] = useState(null);
  const [setDataTable, setdatatableData] = useState([]);
  const random = (min, max) =>
    Math.floor(Math.random() * (max - min + 1) + min);

  const getAllCount = async () => {
    try {
      const response = await getDashboardCount();
      const resUserCount = await getStatuswiseUserCount();
      setuserCount(resUserCount.data.data);
      const newAllCount = response.data.data;

      setAllCount(newAllCount);

      // setIsLoading(false);
    } catch (err) {
      if (!err.response.data.data) {
        if (!err.response.data.status === 200) {
          toast.error(err.response.data.message);
        } else {
          console.log(err.response.data.data, "else");
        }
      }
    }
  };

  useEffect(() => {
    getUserDashboard().then((res) => {
      const ageRanges = res.data.ageRangeDetails.map(
        (detail) => detail.ageRange
      );
      setdatatableData(ageRanges);
    });
    getAllCount();
  }, []);

  return (
    <>
      <WidgetsDropdown />
      <CCard className="mb-4">
        <CRow>
          <CCol className="mt-4 dashboradData" xs={7}>
            <UserTable />
          </CCol>
          <CCol className="mt-4 h-100" xs={4}>
            <Charts />
          </CCol>

          {/* <sexualTable /> */}
        </CRow>
      </CCard>
    </>
  );
};

export default Dashboard;

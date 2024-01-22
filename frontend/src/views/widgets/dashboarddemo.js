import { useState, useEffect } from "react";

// material-ui
import {
  Grid,
  List,
  ListItemButton,
  ListItemText,
  Typography,
  CircularProgress,
} from "@mui/material";
import no_profile from "assets/images/users/no_profile.jpeg";

// project import
import PieChart from "./PieChart";
import MainCard from "components/MainCard";
import AnalyticEcommerce from "components/cards/statistics/AnalyticEcommerce";
import MUIDataTable from "mui-datatables";
import {
  getDashboardCount,
  getLastUsers,
  getStatuswiseUserCount,
} from "../../ApiServices";

// ==============================|| DASHBOARD - DEFAULT ||============================== //

const DashboardDefault = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [allCount, setAllCount] = useState(null);
  const [userCount, setuserCount] = useState(null);
  const [datatableData, setdatatableData] = useState([]);

  const getAllCount = async () => {
    try {
      const response = await getDashboardCount();
      const resUserCount = await getStatuswiseUserCount();
      setuserCount(resUserCount.data.info);
      const newAllCount = response.data.info;
      setAllCount(newAllCount);
      getUsers();
      // setIsLoading(false);
    } catch (err) {
      if (!err.response.data.isSuccess) {
        if (err.response.data.status === 401) {
          toast.error(err.response.data.message);
        } else {
          console.log(err.response.data, "else");
        }
      }
    }
  };

  const getUsers = async () => {
    try {
      const response = await getLastUsers();
      setdatatableData(response.data.info);
      setIsLoading(false);
    } catch (err) {
      if (!err.response.data.isSuccess) {
        if (err.response.data.status === 401) {
          toast.error(err.response.data.message);
        } else {
          console.log(err.response.data, "else");
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllCount();
  }, []);

  const columns = [
    {
      name: "image",
      label: "Profile",
      options: {
        customHeadRender: () => (
          <th key="Profile" style={{ textAlign: "center" }}>
            Profile
          </th>
        ),
        customBodyRender: (image) => (
          <div style={{ textAlign: "center" }}>
            {image ? (
              <img
                src={`${process.env.REACT_APP_API_KEY_IMAGE_PATH}${image}`}
                alt={image}
                style={{ height: "50px", width: "50px", borderRadius: "50%" }}
              />
            ) : (
              <img
                src={no_profile}
                alt={image}
                style={{ height: "50px", width: "50px", borderRadius: "50%" }}
              />
            )}
          </div>
        ),
      },
    },
    {
      name: "name",
      label: "Name",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "email",
      label: "Email",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "mo_no",
      label: "Mobile No",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "status",
      label: "Status",
      options: {
        filter: true,
        sort: false,
        customBodyRender: (_, { rowIndex }) => {
          const { status } = datatableData[rowIndex];
          return (
            <div>
              {status ? (
                <p className="activeP">Active</p>
              ) : (
                <p className="deactiveP">De-Active</p>
              )}
            </div>
          );
        },
      },
    },
  ];

  return (
    <div>
      {isLoading ? (
        <Grid item xs={12} style={{ textAlign: "center" }}>
          <CircularProgress size={26} fullWidth />
        </Grid>
      ) : (
        <Grid container rowSpacing={4.5} columnSpacing={2.75}>
          {/* row 1 */}
          <Grid item xs={12} sx={{ mb: -2.25 }}>
            <Typography variant="h5">Dashboard</Typography>
          </Grid>

          <Grid item xs={12} sm={8} md={3} lg={2}>
            <AnalyticEcommerce
              title="Total Users"
              count={allCount.userCount}
              extra="8,900"
              viewurl="users"
              headerBackground="#8000801f"
              footerBackground="#80008045"
            />
          </Grid>
          <Grid item xs={12} sm={8} md={3} lg={2}>
            <AnalyticEcommerce
              title="Total Essentials"
              count={allCount.essentialsCount}
              extra="35,000"
              viewurl="essentials"
              headerBackground="#0000ff2e"
              footerBackground="#0000ff61"
            />
          </Grid>
          <Grid item xs={12} sm={8} md={3} lg={2}>
            <AnalyticEcommerce
              title="Total Reels"
              count={allCount.reelsCount}
              isLoss
              color="warning"
              extra="1,943"
              viewurl="reels"
              headerBackground="#ffa50036"
              footerBackground="#ffa5006b"
            />
          </Grid>
          <Grid item xs={12} sm={8} md={3} lg={2}>
            <AnalyticEcommerce
              title="Total Workout Collections"
              count={allCount.workCollCount}
              isLoss
              color="warning"
              extra="$20,395"
              viewurl="workoutCollection"
              headerBackground="#80808047"
              footerBackground="#80808069"
            />
          </Grid>
          <Grid item xs={12} sm={8} md={3} lg={2}>
            <AnalyticEcommerce
              title="Total Exercise Library"
              count={allCount.exLibCount}
              isLoss
              color="warning"
              extra="$20,395"
              viewurl="exeLibrary"
              headerBackground="#00800033"
              footerBackground="#00800057"
            />
          </Grid>
          <Grid item xs={12} sm={8} md={3} lg={2}>
            <AnalyticEcommerce
              title="Total Recipes"
              count={allCount.recipesCount}
              isLoss
              color="warning"
              extra="$20,395"
              viewurl="recipes"
              headerBackground="#5f9ea059"
              footerBackground="#5f9ea085"
            />
          </Grid>

          <Grid
            item
            md={8}
            sx={{ display: { sm: "none", md: "block", lg: "none" } }}
          />

          {/* row 2 */}
          <Grid item xs={12} md={7} lg={8}>
            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item>
                <Typography variant="h5">Last Signup Users</Typography>
              </Grid>
              <Grid item />
            </Grid>
            <MainCard sx={{ mt: 2 }} content={false}>
              <MUIDataTable
                data={datatableData}
                columns={columns}
                options={{
                  selectableRows: false, // This removes the checkbox column
                  pagination: false, // This removes the pagination
                  rowsPerPageOptions: false, // This removes the rows per page options
                }}
              />
            </MainCard>
          </Grid>
          <Grid item xs={12} md={5} lg={4}>
            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item>
                <Typography variant="h5">Analytics Report</Typography>
              </Grid>
              <Grid item />
            </Grid>
            <MainCard sx={{ mt: 2 }} content={false}>
              <List sx={{ p: 0, "& .MuiListItemButton-root": { py: 2 } }}>
                <ListItemButton divider>
                  <ListItemText primary="Active Users" />
                  <Typography variant="h5">{userCount.activeCount}</Typography>
                </ListItemButton>
                <ListItemButton divider>
                  <ListItemText primary="De-Active Users" />
                  <Typography variant="h5">
                    {userCount.inactiveCount}
                  </Typography>
                </ListItemButton>
              </List>
              <PieChart
                activeUsersCount={userCount.activeCount}
                inactiveUsersCount={userCount.inactiveCount}
              />
            </MainCard>
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default DashboardDefault;

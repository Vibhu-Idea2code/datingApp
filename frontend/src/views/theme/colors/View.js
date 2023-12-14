import { Grid, Paper, TextField } from "@mui/material";
import { Box, Container } from "@mui/system";
import React from "react";

const View = () => {
   const [datatableData, setdatatableData] = useState([]);
  return (
    <Container className={classes.root}>
      <Paper component={Box} p={4}>
        <Grid container spacing={3}>
          <Grid item md={3}>
            <TextField
              label="first_name"
              placeholder="enter your first name"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item md={3}>
            <TextField
              label="last_name"
              placeholder="enter your last name"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item md={3}>
            <TextField
              label="email"
              placeholder="enter your email"
              variant="outlined"
              fullWidth
            />
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default View;

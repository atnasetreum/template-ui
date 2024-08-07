import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

import MainLayout from "../layout";
import { Chart, Deposits, Orders } from "@components";

const DashboardPage = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={8} lg={9}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            height: 350,
          }}
        >
          <Chart />
        </Paper>
      </Grid>
      <Grid item xs={12} md={4} lg={3}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            height: 350,
          }}
        >
          <Deposits />
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
          <Orders />
        </Paper>
      </Grid>
    </Grid>
  );
};

DashboardPage.Layout = MainLayout;

export default DashboardPage;

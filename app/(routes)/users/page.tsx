import Grid from "@mui/material/Grid";

import MainLayout from "../layout";
import { TableUsers } from "@components";

const UsersPage = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <TableUsers />
      </Grid>
    </Grid>
  );
};

UsersPage.Layout = MainLayout;

export default UsersPage;

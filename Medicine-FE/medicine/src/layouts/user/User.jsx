import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import Breadcrumbs from "../Breadcrumbs";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

const User = () => {
  return (
    <Grid container gap={6}>
      <Grid xs={12}>
        <Header />
        <Breadcrumbs />
      </Grid>
      <Grid xs={12}>
        <Outlet />
      </Grid>
      <Grid xs={12}>
        <Footer />
      </Grid>
    </Grid>
  );
};

export default User;

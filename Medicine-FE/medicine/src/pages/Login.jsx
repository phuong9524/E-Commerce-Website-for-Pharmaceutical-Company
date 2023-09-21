import { Box } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import LoginForm from "../components/auth/LoginForm";
import TitleBox from "../components/shared/TitleBox";
import AuthLayout from "../layouts/auth/authLayout";


const Login = () => {
  return (
    <AuthLayout>
      <Box
        sx={{
          width: {
            sm: "90vw",
            xs: "90vw", 
            md: "60vw",
            lg: "60vw",
            xl: "60vw",
          },
        }}
      >
        <Grid container height="90vh">
          <LoginForm />

          <TitleBox />
        </Grid>
      </Box>
    </AuthLayout>
  );
};

export default Login;

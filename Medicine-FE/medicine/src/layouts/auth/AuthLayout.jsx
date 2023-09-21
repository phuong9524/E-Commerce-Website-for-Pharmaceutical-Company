import { Box, ThemeProvider } from "@mui/material";
import { authTheme } from "../../styles/Theme";
import bgImage from "/Medicine-FE/medicine/src/assets/authBackground.png";
const AuthLayout = ({ children }) => {
  return (
    <ThemeProvider theme={authTheme}>
      <Box
        sx={{
          backgroundImage: `url(${bgImage})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          overflow: "hidden",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {children}
      </Box>
    </ThemeProvider>
  );
};

export default AuthLayout;

import { Box, Button, Typography, colors } from "@mui/material";
import { postLogin } from "../../api/authApiService";
import jwt_decode from "jwt-decode";
import { fetchUserLoginSuccess } from "../../redux/silce/userSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { adminRoute, auth } from "../../routes/routes";
import { useDispatch } from "react-redux";

import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { FormInputAuth } from "../shared/FormInputAuth";

export default function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const response = await postLogin(data.get("email"), data.get("password"));
    if (response && response.status === 200) {
      const token = response.data;
      const decodeToken = jwt_decode(token);

      dispatch(
        fetchUserLoginSuccess({
          id: decodeToken.Id,
          username: decodeToken.UserName,
          role: decodeToken.Roles,
          accessToken: token,
        })
      );
      if (decodeToken.Roles === "") {
        navigate("/");
      } else {
        navigate(`/${adminRoute.home}`);
      }
    } else {
      toast.error(response?.message);
    }
  };

  return (
    <Grid
      xs={12}
      sm={12}
      md={6}
      lg={6}
      xl={6}
      minHeight={550}
      sx={{
        boxShadow: {
          xs: "",
          sm: "",
          md: "15px 2px 5px -5px",
          lg: "15px 2px 5px -5px",
          xl: "15px 2px 5px -5px",
        },
      }}
    >
      <Box
        sx={{
          backgroundColor: "rgba(167, 241, 198, 0.8)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "100%",
          borderRadius: {
            xs: "30px",
            sm: "30px",
            md: "30px 0 0 30px",
            lg: "30px 0 0 30px",
            xl: "30px 0 0 30px",
          },
        }}
      >
        <Box width="80%" component="form" onSubmit={handleSubmit}>
          <Box display="flex" flexDirection="column" alignItems="center">
            <Box
              component="img"
              sx={{
                mt: "60px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              src="https://res.cloudinary.com/dwsae4gmt/image/upload/v1687323197/logo_tek9mx.ico"
            ></Box>

            <Typography
              color="white"
              variant="h5"
              fontWeight="bold"
              mt={7}
              mb={3}
            >
              Đăng nhập
            </Typography>
          </Box>

          <FormInputAuth
            // label="Tên đăng nhập"
            placeholder="Nhập tên đăng nhập..."
            id="mail"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus={true}
          />
          <FormInputAuth
            label="Mật khẩu"
            placeholder="Nhập mật khẩu..."
            id="password"
            name="password"
            autoFocus={false}
            type="password"
          />
          {/* <FormInput
            label="MFA Code"
            placeholder="Enter your code..."
            isIconActive={true}
          /> */}

          <Box
            display="flex"
            flexDirection="row"
            justifyContent="right"
            mt={2}
            width="100%"
            color="white"
          >
            {/* <div style={{ display: "flex" }}>
              <Checkbox disableRipple sx={{ p: 0, pr: 1 }} />
              <Typography>Lưu mật khẩu</Typography>
            </div> */}
            <a
              href={`auth/${auth.register}`}
              style={{
                color: colors.green[500],
                textDecoration: "none",
              }}
            >
              Chưa có tài khoản? Đăng ký
            </a>
          </Box>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 4, boxShadow: `0 0 20px ${colors.green[500]}` }}
          >
            Đăng nhập
          </Button>
        </Box>
      </Box>
    </Grid>
  );
}

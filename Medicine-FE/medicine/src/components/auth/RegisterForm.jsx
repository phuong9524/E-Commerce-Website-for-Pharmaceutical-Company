import { Box, Button, colors, Typography } from "@mui/material";
import jwt_decode from "jwt-decode";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { postLogin } from "../../api/authApiService";

import { fetchUserLoginSuccess } from "../../redux/silce/userSlice";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { FormInputAuth } from "../shared/FormInputAuth";
import { postCreateNewUser } from "../../api/userApiService";

export default function RegisterForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleRegister = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const response = await postCreateNewUser({
      fullName: data.get("FullName"),
      email: data.get("email"),
      password: data.get("password"),
      userName: data.get("email"),
      address: "",
      phoneNumber: "0",
      role: "",
      avatar: "",
    });
    if (response && response.status === 201) {
      toast("Đăng ký thành công");
      const response = await postLogin(data.get("email"), data.get("password"));
      if (response && response.status === 200) {
        const token = response.data;
        const decodeToken = jwt_decode(token);
        dispatch(
          fetchUserLoginSuccess({
            username: decodeToken.UserName,
            role: decodeToken[
              "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
            ],
            accessToken: token,
          })
        );
        navigate("/");
      }
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
        <Box width="80%" component="form" onSubmit={handleRegister}>
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
              Đăng ký
            </Typography>
          </Box>

          <FormInputAuth
            placeholder="Nhập họ tên..."
            id="fullName"
            label="Họ và Tên"
            name="FullName"
            autoComplete="fullName"
            autoFocus={true}
          />

          <FormInputAuth
            placeholder="Nhập email..."
            id="mail"
            label="Email"
            name="email"
            autoComplete="email"
          />

          <FormInputAuth
            label="Mật khẩu"
            placeholder="Nhập mật khẩu..."
            id="password"
            name="password"
            autoFocus={false}
            type="password"
          />

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
              href={`/auth`}
              style={{
                color: colors.green[500],
                textDecoration: "none",
              }}
            >
              Đã có tài khoản? Đăng nhập
            </a>
          </Box>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 4, boxShadow: `0 0 20px ${colors.green[500]}` }}
          >
            Đăng ký
          </Button>
        </Box>
      </Box>
    </Grid>
  );
}

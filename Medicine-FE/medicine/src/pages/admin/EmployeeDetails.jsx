import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import TrashIcon from "@heroicons/react/24/solid/TrashIcon";
import { useLocation } from "react-router-dom";

import { FormInputInfo } from "../../components/shared/FormInputInfo";
import EmployeeManagementAvatarUpload from "../../components/employeeManagement/employee-management-avatar-upload";
import { FormInputDatePicker } from "../../components/shared/FormInputDatePicker";
import { useEffect, useState } from "react";
import { getInfoUser } from "../../api/userApiService";
import { getInitials } from "../../utils/GetInitials";
import { COLORS } from "../../utils/Constants";

export const EmployeeDetails = () => {
  const location = useLocation();
  const [userInfo, setUserInfo] = useState([]);
  const [isChange, setIsChange] = useState(false);

  const onClickToChangeRole = () => {
    setIsChange(true);
  };

  // const onClickToConfirm = async () => {
  //   const response = 
  // }

  const fetchDetails = async () => {
    const response = await getInfoUser({ id: location.state });
    if (response && response.status === 200) {
      setUserInfo(response.data);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, [location]);

  return (
    <Box
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid xs={12} display="flex" justifyContent="space-between">
            <Stack direction="row" display="flex" alignItems="center" gap={2}>
              <Avatar src={userInfo?.avatar}>
                {getInitials(userInfo?.fullName)}
              </Avatar>
              <Typography fontWeight="bold">{userInfo?.fullName}</Typography>
            </Stack>

            {/* <Button
              startIcon={
                <SvgIcon fontSize="small">
                  <TrashIcon />
                </SvgIcon>
              }
              variant="contained"
              sx={{
                width: 120,
                boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                borderRadius: "5px",
                backgroundColor: "#fff",
                outline: "1px solid",
                textTransform: "none",
                color: "#FF6464",
                ":hover": {
                  backgroundColor: "#FF6464",
                  color: "#fff",
                  outline: "1px solid",
                  outlineColor: "#FF6464",
                },
              }}
            >
              Xóa
            </Button> */}
          </Grid>
          <Grid xs={12}>
            <Divider />
          </Grid>
          <Grid xs={12} lg={4} sm={6} md={4}>
            <Card
              sx={{
                border: "none",
                boxShadow: "none",
                maxWidth: 500,
              }}
            >
              <CardHeader
                subheader="HÌNH ẢNH ĐẠI DIỆN"
                subheaderTypographyProps={{
                  textAlign: "left",
                  fontWeight: "bold",
                  fontSize: 14,
                }}
              />
              <CardMedia
                component="img"
                image={
                  userInfo?.avatar === ""
                    ? "https://res.cloudinary.com/dwsae4gmt/image/upload/v1688621295/5556468_t5luap.png"
                    : userInfo?.avatar
                }
              />
              {/* <CardActions sx={{ justifyContent: "center" }}>
                <EmployeeManagementAvatarUpload image={image} />
              </CardActions> */}
            </Card>
          </Grid>
          <Grid xs={12} lg={4} sm={6} md={4}>
            <Card
              sx={{
                border: "none",
                boxShadow: "none",
              }}
            >
              <CardHeader
                subheader="THÔNG TIN NHÂN VIÊN"
                subheaderTypographyProps={{
                  textAlign: "left",
                  fontWeight: "bold",
                  fontSize: 14,
                }}
              />
              <CardContent>
                <FormInputInfo
                  label="Họ và Tên"
                  value={userInfo?.fullName}
                  disabled
                />
                <FormInputInfo
                  label="Tên tài khoản"
                  value={userInfo?.userName}
                  disabled
                />
                {/* <FormInputDatePicker
                  label="Ngày sinh"
                  onChange={(value) => console.log(value.toLocaleDateString())}
                  value={"22/03/1998"}
                />
                <FormInputCategory label="Giới tính" /> */}
              </CardContent>

              <CardHeader
                subheader="LIÊN HỆ"
                subheaderTypographyProps={{
                  textAlign: "left",
                  fontWeight: "bold",
                  fontSize: 14,
                }}
              />
              <CardContent>
                <FormInputInfo label="Email" value={userInfo?.email} disabled />
                <FormInputInfo
                  label="SĐT"
                  value={userInfo?.phoneNumber}
                  disabled
                />
                <FormInputInfo
                  label="Địa chỉ"
                  value={userInfo?.address}
                  disabled
                />
              </CardContent>
            </Card>
          </Grid>
          <Grid xs={12} lg={4} sm md>
            <Card
              sx={{
                border: "none",
                boxShadow: "none",
              }}
            >
              <CardHeader
                subheader="VAI TRÒ"
                subheaderTypographyProps={{
                  textAlign: "left",
                  fontWeight: "bold",
                  fontSize: 14,
                }}
              />
              <CardContent>
                {isChange === false ? (
                  <>
                    <FormInputInfo
                      label={"Vai trò hiện tại"}
                      value={userInfo?.roles?.join(", ")}
                    />
                    {/* <Button
                      onClick={onClickToChangeRole}
                      variant="contained"
                      sx={{
                        boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                        borderRadius: "5px",
                        backgroundColor: "#fff",
                        outline: "1px solid",
                        textTransform: "none",
                        color: COLORS.background,
                        ":hover": {
                          backgroundColor: COLORS.background,
                          color: "#fff",
                          outline: "1px solid",
                          outlineColor: COLORS.background,
                        },
                      }}
                    >
                      Thay đổi vai trò
                    </Button>{" "} */}
                  </>
                ) : (
                  <>
                    <Button
                      onClick={onClickToConfirm}
                      variant="contained"
                      sx={{
                        boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                        borderRadius: "5px",
                        backgroundColor: "#fff",
                        outline: "1px solid",
                        textTransform: "none",
                        color: COLORS.background,
                        ":hover": {
                          backgroundColor: COLORS.background,
                          color: "#fff",
                          outline: "1px solid",
                          outlineColor: COLORS.background,
                        },
                      }}
                    >
                      Xác nhận thay đổi
                    </Button>{" "}
                  </>
                )}
              </CardContent>
              <CardHeader
                subheader="THỜI GIAN LÀM VIỆC"
                subheaderTypographyProps={{
                  textAlign: "left",
                  fontWeight: "bold",
                  fontSize: 14,
                }}
              />
              <CardContent>
                <FormInputDatePicker
                  label="Ngày bắt đầu"
                  onChange={(value) => console.log(value.toLocaleDateString())}
                  value={"22/08/2023"}
                />

                <FormInputDatePicker
                  label="Ngày kết thúc (Dựa trên hợp đồng)"
                  onChange={(value) => console.log(value.toLocaleDateString())}
                  value={"22/08/2023"}
                />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

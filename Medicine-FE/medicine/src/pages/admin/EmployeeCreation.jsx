import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

import { Fragment, useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import {
  Avatar,
  Card,
  CardContent,
  Button,
  Container,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { adminRoute } from "../../routes/routes";
import { FormInputInfo } from "../../components/shared/FormInputInfo";
import { toast } from "react-toastify";
import { getRoles, postAddUser } from "../../api/userApiService";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

import { UploadAvatar } from "../../components/shared/UploadAvatar";
import { FormInputCategory } from "../../components/shared/FormInputCategory";

const steps = ["Thông tin cá nhân", "Thông tin tài khoản", "Xem trước"];

export const EmployeeCreation = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [roleData, setRoleData] = useState([]);
  const [info, setInfo] = useState({
    userName: "",
    fullName: "",
    email: "",
    password: "",
    phoneNumber: "",
    address: "",
    role: "",
    // position: "",
    avatar: "",
  });

  const information = [
    { title: "Họ và tên", content: info.fullName },
    { title: "Tài khoản", content: info.userName },
    { title: "Mật khẩu", content: info.password },
    { title: "Vai trò", content: info.role },
    { title: "Email", content: info.email },
    { title: "SĐT", content: info.phoneNumber },
    { title: "Địa chỉ", content: info.address },
    // { title: "Bộ phận", content: info.position },
  ];

  useEffect(() => {
    const fetchRoles = async () => {
      const response = await getRoles();
      if (response && response.status === 200) {
        setRoleData(response.data);
      }
    };
    fetchRoles();
  }, []);

  const createUser = async () => {
    const response = await postAddUser({
      userName: info.userName,
      fullName: info.fullName,
      email: info.email,
      password: info.password,
      phoneNumber: info.phoneNumber,
      address: info.address,
      role: info.role,
      avatar: info.avatar,
    });

    if (response && response.status === 201) {
      toast.success("Thêm nhân viên thành công");
      navigate(`/admin/${adminRoute.employeeManagement}`);
    }
  };

  const image = (imageList) => {
    setInfo({
      ...info,
      avatar: imageList,
    });
  };

  const renderContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <>
            <UploadAvatar image={image} width={70} height={70} />
            <FormInputInfo
              label="Họ và tên"
              value={info.fullName}
              onChange={(event) => {
                setInfo({
                  ...info,
                  fullName: event.target.value,
                });
              }}
            />
            <FormInputInfo
              label="Email"
              value={info.email}
              onChange={(event) => {
                setInfo({
                  ...info,
                  email: event.target.value,
                });
              }}
            />
            <FormInputInfo
              label="SĐT"
              value={info.phoneNumber}
              onChange={(event) => {
                setInfo({
                  ...info,
                  phoneNumber: event.target.value,
                });
              }}
            />
            <FormInputInfo
              label="Địa chỉ"
              value={info.address}
              onChange={(event) => {
                setInfo({
                  ...info,
                  address: event.target.value,
                });
              }}
            />
          </>
        );
      case 1:
        return (
          <>
            <FormInputInfo
              label="Tên tài khoản"
              value={info.userName}
              onChange={(event) => {
                setInfo({
                  ...info,
                  userName: event.target.value,
                });
              }}
            />
            <FormInputInfo
              label="Mật khẩu"
              value={info.password}
              onChange={(event) => {
                setInfo({
                  ...info,
                  password: event.target.value,
                });
              }}
            />
            <FormInputCategory
              label="Vai trò"
              data={roleData}
              value={info.role}
              onChange={(event) => {
                setInfo({
                  ...info,
                  role: event.target.value,
                });
              }}
            />
          </>
        );
      case 2:
        return (
          <>
            <Box display="flex" justifyContent="center" pb={5}>
              <Avatar src={info.avatar} sx={{ width: 70, height: 70 }} />
            </Box>

            <Grid direction="row" container spacing={2}>
              {information.map((item) => (
                <>
                  <Grid xs={6} textAlign="right" key={item.title}>
                    <Typography sx={{ color: "#677788" }}>
                      {item.title}:
                    </Typography>
                  </Grid>
                  <Grid xs={6} textAlign="left">
                    <Typography fontWeight="bold">{item.content}</Typography>
                  </Grid>
                </>
              ))}
            </Grid>
          </>
        );
    }
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Box component="main" sx={{ flexGrow: 1, py: 8 }}>
      <Container maxWidth="lg">
        <Stepper activeStep={activeStep}>
          {steps.map((label) => {
            const stepProps = {};
            const labelProps = {};

            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>

        <Fragment>
          <Card
            sx={{
              mt: 10,
              borderRadius: "8px",
              boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
            }}
          >
            {/* <CardHeader
                avatar={<Avatar>{getInitials(info.fullName)}</Avatar>}
                sx={{ textAlign: "center" }}
              /> */}
            <CardContent>
              <Box pl={2} pr={2}>
                {renderContent()}
                <Divider sx={{ pt: 2 }} />
                <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                  <Button
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                  >
                    Trở về trước
                  </Button>
                  <Box sx={{ flex: "1 1 auto" }} />
                  {activeStep === steps.length - 1 ? (
                    <Button onClick={createUser}>Hoàn thành</Button>
                  ) : (
                    <Button onClick={handleNext}>Bước tiếp theo</Button>
                  )}
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Fragment>
      </Container>
    </Box>
  );
};

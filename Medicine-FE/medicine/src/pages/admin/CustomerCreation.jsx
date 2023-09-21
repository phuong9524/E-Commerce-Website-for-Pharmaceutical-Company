import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { FormInputInfo } from "../../components/shared/FormInputInfo";
import { FormInputCategory } from "../../components/shared/FormInputCategory";
import { useEffect, useState } from "react";
import {
  getDistricts,
  getProvince,
  getWards,
} from "../../api/provinceApiService";
import { postCreateNewUser } from "../../api/userApiService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { adminRoute } from "../../routes/routes";

export const CustomerCreation = () => {
  const navigate = useNavigate();
  const [direct, setDirect] = useState({
    province: [],
    districts: [],
    wards: [],
    address: "",
  });

  useEffect(() => {
    const Province = async () => {
      const response = await getProvince();
      if (response && response.status === 200) {
        setDirect({ ...direct, province: response.data.results });
      }
    };
    Province();
  }, []);

  const onChangeToDistricts = async (name) => {
    const province = direct.province.filter((item) => item.name === name);
    const response = await getDistricts(province[0].code);
    if (response && response.status === 200) {
      setDirect({ ...direct, districts: response.data.results });
    }
  };

  const onChangeToWards = async (name) => {
    const district = direct.districts.filter((item) => item.name === name);
    const response = await getWards(district[0].code);
    if (response && response.status === 200) {
      setDirect({ ...direct, wards: response.data.results });
    }
  };

  const onChangetoGetFullDirect = (name) => {
    const address = direct.wards.filter((item) => item.name === name);
    setDirect({
      ...direct,
      address:
        address[0].province +
        ", " +
        address[0].district +
        ", " +
        address[0].name,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const response = await postCreateNewUser({
      fullName: data.get("fullName"),
      email: data.get("email"),
      password: data.get("email"),
      username: data.get("username"),
      address: direct.address + ", " + data.get("address"),
      phoneNumber: data.get("phoneNumber"),
      role: "",
      avatar: "",
    });

    if (response && response.status === 201) {
      toast.success(
        `Tạo khách hàng thành công, mật khẩu = ${data.get("email")}`
      );
      navigate(`/${adminRoute.home}/${adminRoute.customers}`);
    } else {
      console.log(response);
      // toast.error(response.status)
    }
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        py: 8,
      }}
      component="form"
      onSubmit={handleSubmit}
    >
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid xs={12} sm={12} md={12} lg={12}>
            <Typography fontWeight="bold" fontSize="22.575px" textAlign="left">
              Thêm khách hàng
            </Typography>
          </Grid>
          <Grid xs={12} sm={12} md={12} lg={12}>
            <Divider />
          </Grid>

          <Grid xs={12} sm={12} md={12} lg={4}>
            <Typography textAlign="left" fontWeight="bold">
              Thông tin tài khoản
            </Typography>
          </Grid>
          <Grid xs={12} sm={12} md={12} lg={8}>
            <Stack spacing={3}>
              <Card
                sx={{
                  borderRadius: "20px",
                  boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                }}
              >
                <CardContent>
                  <Box display="flex" flexWrap="wrap">
                    <Grid xs={12} sm={12} md={12} lg={12}>
                      <FormInputInfo
                        label="Họ và tên"
                        name="fullName"
                        require={true}
                      />
                    </Grid>
                    <Grid xs={12} sm={12} md={12} lg={12} >
                      <FormInputInfo label="Tên tài khoản" name="username" require={true} />
                    </Grid>
                    <Grid xs={12} sm={12} md={6} lg={12}>
                      <FormInputInfo label="Email" name="email" require={true}/>
                    </Grid>
                    <Grid xs={12} sm={12} md={6} lg={12}>
                      <FormInputInfo label="SĐT" name="phoneNumber" require={true}/>
                    </Grid>
                  </Box>
                </CardContent>
              </Card>
            </Stack>
          </Grid>

          <Grid xs={12} sm={12} md={12} lg={4}>
            <Typography textAlign="left" fontWeight="bold">
              Địa chỉ giao hàng
            </Typography>
          </Grid>
          <Grid xs={12} sm={12} md={12} lg={8}>
            <Stack spacing={2}>
              <Card
                sx={{
                  borderRadius: "20px",
                  boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                }}
              >
                <CardContent>
                  <Box display="flex" flexWrap="wrap">
                    <Grid xs={12} sm={12} md={4} lg={4}>
                      <FormInputCategory
                        label="Thành phố"
                        data={direct?.province}
                        onChange={(event) =>
                          onChangeToDistricts(event.target.value)
                        }
                      />
                    </Grid>
                    <Grid xs={12} sm={12} md={4} lg={4}>
                      <FormInputCategory
                        label="Quận, huyện"
                        data={direct.districts}
                        onChange={(event) =>
                          onChangeToWards(event.target.value)
                        }
                      />
                    </Grid>
                    <Grid xs={12} sm={12} md={4} lg={4}>
                      <FormInputCategory
                        label="Phường, xã"
                        data={direct.wards}
                        onChange={(event) =>
                          onChangetoGetFullDirect(event.target.value)
                        }
                      />
                    </Grid>
                    <Grid xs={12} sm={12} md={6} lg={12}>
                      <FormInputInfo label="Đường, số nhà" name="address" />
                    </Grid>
                  </Box>
                </CardContent>
              </Card>
            </Stack>
          </Grid>
          <Grid xs sm md lg pt={5}>
            <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
              <Button
                type="submit"
                variant="contained"
                color="error"
                onClick={() =>
                  navigate(`/${adminRoute.home}/${adminRoute.customers}`)
                }
                sx={{
                  textTransform: "none",
                  borderRadius: 2,
                  boxShadow: "none",
                  width: 100,
                }}
              >
                Hủy
              </Button>

              <Button
                type="submit"
                variant="contained"
                color="success"
                sx={{
                  textTransform: "none",
                  borderRadius: 2,
                  boxShadow: "none",
                  width: 100,
                }}
              >
                Lưu
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

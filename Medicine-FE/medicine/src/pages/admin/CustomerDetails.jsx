import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Container,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { FormInputInfo } from "../../components/shared/FormInputInfo";
import QueryStatsOutlinedIcon from "@mui/icons-material/QueryStatsOutlined";
import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { getInitials } from "../../utils/GetInitials";
import { CustomerOrdersTable } from "../../components/customer/customer-orders-table";
import { CustomersSearch } from "../../components/customer/customers-search";
import {
  formatDaySince,
  formatToDate,
  formatToFulldatetime,
} from "../../utils/FormatTime";
import { numberToCurrency } from "../../utils/currencyFormat";

export const CustomerDetails = () => {
  const location = useLocation();

  useEffect(() => {});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowperPage] = useState(5);

  const handlePageChange = useCallback((event, value) => {
    setPage(value);
  }, []);

  const handleRowPerPageChange = useCallback((event) => {
    setRowperPage(event.target.value);
  }, []);

  return (
    <Box
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid xs={12} sm={12} md={12} lg={12}>
            <Typography fontWeight="bold" fontSize="22.575px" textAlign="left">
              {location.state.fullName}
            </Typography>
          </Grid>

          <Grid xs={12} sm={12} md={8} lg={8}>
            <Stack spacing={3}>
              <Card
                sx={{
                  borderRadius: "20px",
                  boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                }}
              >
                <CardHeader
                  avatar={
                    <Avatar src={""}>
                      {getInitials(location?.state?.fullName)}
                    </Avatar>
                  }
                  title={location.state.fullName}
                  subheader={`Trở thành khách hàng được ${formatDaySince(
                    location?.state?.createdAt
                  )} ngày`}
                  sx={{
                    textAlign: "left",
                  }}
                  titleTypographyProps={{
                    fontSize: "15.75px",
                    fontWeight: "bold",
                  }}
                />
                <Divider />
                <CardContent>
                  <Box display="flex" flexWrap="wrap">
                    <Grid xs={12} sm={12} md={6} lg={6}>
                      <FormInputInfo
                        label="Họ và Tên"
                        name="name"
                        disabled={true}
                        defaultValue={location.state.fullName}
                      />
                    </Grid>
                    <Grid xs={12} sm={12} md={6} lg={6}>
                      <FormInputInfo
                        label="Tên tài khoản"
                        name="name"
                        disabled={true}
                        defaultValue={"anna"}
                      />
                    </Grid>
                    <Grid xs={12} sm={12} md={6} lg={6}>
                      <FormInputInfo
                        label="SĐT"
                        name="phone"
                        disabled={true}
                        defaultValue={location.state.phoneNumber}
                      />
                    </Grid>
                    <Grid xs={12} sm={12} md={6} lg={6}>
                      <FormInputInfo
                        label="Email"
                        name="email"
                        disabled={true}
                        defaultValue={location.state.email}
                      />
                    </Grid>
                    <Grid xs={12} sm={12} md={12} lg={12}>
                      <FormInputInfo
                        label="Địa chỉ"
                        name="address"
                        disabled={true}
                        defaultValue={location.state.address}
                      />
                    </Grid>
                  </Box>
                </CardContent>
              </Card>
              <Card
                sx={{
                  borderRadius: "20px",
                  boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                }}
              >
                <CardHeader
                  title="Lịch sử đơn hàng"
                  sx={{
                    textAlign: "left",
                  }}
                  titleTypographyProps={{
                    fontSize: "15.75px",
                    fontWeight: "bold",
                  }}
                />
                <Divider />

                <CardContent>
                  <CustomersSearch
                    sx={{
                      p: 2,
                      textAlign: "left",
                    }}
                    // searchKeys={searchKeys}
                    placeholder="Tìm kiếm đơn hàng"
                  />
                  <CustomerOrdersTable
                    // count={data.length}
                    // items={customers}
                    onPageChange={handlePageChange}
                    onRowsPerPageChange={handleRowPerPageChange}
                    page={page}
                    rowsPerPage={rowsPerPage}
                  />
                </CardContent>
              </Card>
            </Stack>
          </Grid>
          <Grid xs sm md lg>
            <Stack spacing={3}>
              <Card
                sx={{
                  borderRadius: "20px",
                  boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                }}
              >
                <CardHeader
                  avatar={<QueryStatsOutlinedIcon sx={{ height: 42 }} />}
                  title="Thống kê hoạt động"
                  sx={{
                    textAlign: "left",
                  }}
                  titleTypographyProps={{
                    fontSize: "15.75px",
                    fontWeight: "bold",
                  }}
                />
                <Divider />

                <CardContent>
                  <Box display="flex" flexWrap="wrap">
                    <Grid xs={12} sm={12} md={12} lg={12}>
                      <FormInputInfo
                        label={"Ngày tạo tài khoản"}
                        disabled={true}
                        defaultValue={formatToDate(location.state.createdAt)}
                      />
                    </Grid>
                    <Grid xs={12} sm={12} md={12} lg={12}>
                      <FormInputInfo
                        label={"Đăng nhập lần cuối"}
                        disabled={true}
                        defaultValue={
                          location.state.lastLogin === null
                            ? "Chưa đăng nhập lần nào"
                            : formatToFulldatetime(location?.state?.lastLogin)
                        }
                      />
                    </Grid>
                    <Grid xs={12} sm={12} md={12} lg={12}>
                      <FormInputInfo
                        label={"Tổng đơn hàng đã đặt"}
                        disabled={true}
                        defaultValue={location.state.orders.toString()}
                      />
                    </Grid>
                    <Grid xs={12} sm={12} md={12} lg={12}>
                      <FormInputInfo
                        label={"Tổng số tiền đã chi"}
                        disabled={true}
                        defaultValue={numberToCurrency(
                          location.state.sumMoney.toString()
                        )}
                      />
                    </Grid>
                  </Box>
                </CardContent>
              </Card>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

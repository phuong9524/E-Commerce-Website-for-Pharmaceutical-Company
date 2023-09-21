import {
  Avatar,
  Badge,
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Container,
  Divider,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import { getInitials } from "../../utils/GetInitials";
import { getOrderDetails } from "../../api/orderApiService";
import { numberToCurrency } from "../../utils/currencyFormat";
import {
  orderStatuses,
  shippingFee,
  statusColor,
} from "../../utils/mappingData";
import { COLORS } from "../../utils/Constants";
import { SeverityPill } from "../../components/shared/SeverityPill";
import { formatToFulldatetime } from "../../utils/FormatTime";
import { OrderTimeLine } from "../../components/shared/OrderTimeLine";

export const OrderManagementDetails = () => {
  const [orderDetails, setOrderDetails] = useState([]);
  const matches = useMediaQuery(useTheme().breakpoints.up("lg"));
  const location = useLocation();

  const OrderDetails = async () => {
    const response = await getOrderDetails(location.state);
    if (response && response.status === 200) {
      setOrderDetails(response?.data);
    }
  };

  useEffect(() => {
    OrderDetails();
  }, [location]);

  const listFee = [
    {
      name: "Tổng giá trị sản phẩm",
      value: numberToCurrency(orderDetails?.sum),
    },
    {
      name: "Chi phí vận chuyển",
      value: numberToCurrency(shippingFee[orderDetails?.description] ?? 0),
    },
    { name: "Giảm giá", value: numberToCurrency(0) },
    {
      name: "Tổng giá trị đơn hàng",
      value: numberToCurrency(
        orderDetails?.sum + (shippingFee[orderDetails?.description] ?? 0)
      ),
    },
  ];

  return (
    <Box
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid
            xs={12}
            sm={12}
            md={12}
            lg={12}
            container
            textAlign={"left"}
            spacing={0}
            alignItems={"center"}
          >
            <Grid xs={12} sm={12} md={12} lg={5}>
              <Typography
                fontWeight="bold"
                fontSize="22.575px"
                textAlign="left"
              >
                Đơn hàng {orderDetails?.id}
              </Typography>
            </Grid>
            <Grid xs={12} sm={12} md={12} lg={6}>
              {orderDetails?.statuses !== undefined ? (
                <Stack direction={"row"} gap={1}>
                  <SeverityPill
                    color={
                      statusColor[orderDetails?.statuses[0]?.status?.status]
                    }
                  >
                    {orderStatuses[orderDetails?.statuses[0]?.status?.status]}
                  </SeverityPill>
                  <Typography color="#717788">
                    {formatToFulldatetime(
                      orderDetails?.statuses?.slice(-1)[0].createdAt
                    )}
                  </Typography>
                </Stack>
              ) : (
                ""
              )}
            </Grid>
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
                  title={
                    <Stack direction={"row"} gap={2.5} alignItems={"center"}>
                      <Typography
                        sx={{ fontSize: "15.75px", fontWeight: "bold" }}
                      >
                        Thông tin đơn hàng
                      </Typography>

                      <Badge
                        badgeContent={1}
                        sx={{
                          "& .MuiBadge-badge": {
                            fontWeight: "bold",
                            color: "black",
                            backgroundColor: "#E7E8EC",
                          },
                        }}
                      />
                    </Stack>
                  }
                  sx={{
                    textAlign: "left",
                  }}
                />
                <Divider />

                <CardContent>
                  <Stack gap={2}>
                    {orderDetails?.product?.map((item) => {
                      return (
                        <>
                          <Grid container spacing={2} key={item.id}>
                            <Grid xs={2} sm={2} md={2} lg={2}>
                              <img src={item?.images[0]} width={150} />
                            </Grid>
                            <Grid xs sm md lg container>
                              <Grid
                                xs={12}
                                sm={5}
                                md={5}
                                lg={5}
                                textAlign="left"
                              >
                                <Typography fontWeight="bold" py={1}>
                                  {item.name}
                                </Typography>
                              </Grid>
                              <Grid
                                xs
                                sm
                                md
                                lg={5}
                                alignItems={"center"}
                                justifyContent={"center"}
                                display={"flex"}
                              >
                                <Typography>{item.quantity}</Typography>
                              </Grid>
                              <Grid
                                xs
                                sm
                                md
                                lg
                                alignItems={"center"}
                                justifyContent={"flex-end"}
                                display={"flex"}
                                pr={3}
                              >
                                <Typography>
                                  {numberToCurrency(item.price)}
                                </Typography>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Divider />
                        </>
                      );
                    })}
                  </Stack>

                  <Grid container spacing={13}>
                    {matches ? <Grid xs={12} sm={12} md={5} lg={5} /> : <></>}
                    <Grid xs sm md lg>
                      <List>
                        {listFee.map((item) => (
                          <ListItem
                            key={item.name}
                            secondaryAction={
                              <Typography fontWeight="bold">
                                {item.value}
                              </Typography>
                            }
                          >
                            <ListItemText
                              sx={{ textAlign: "left" }}
                              primary={item.name}
                            />
                          </ListItem>
                        ))}
                      </List>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
              <Card
                sx={{
                  borderRadius: "20px",
                  boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                }}
              >
                <CardHeader
                  title="Lịch sử giao hàng"
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
                  <OrderTimeLine timeline={orderDetails?.statuses} />
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
                  title="Thông tin khách hàng"
                  sx={{
                    textAlign: "left",
                  }}
                  titleTypographyProps={{
                    fontSize: "15.75px",
                    fontWeight: "bold",
                  }}
                />
                <Divider />

                <CardContent sx={{ textAlign: "left" }}>
                  <Stack gap={2}>
                    <CardActionArea>
                      <Stack
                        display={"flex"}
                        alignItems={"center"}
                        flexDirection={"row"}
                        gap={2}
                      >
                        <Avatar src={orderDetails?.user?.avatar}>
                          {getInitials(orderDetails?.user?.fullName)}
                        </Avatar>
                        <Typography
                          color={"#717788"}
                          variant="body1"
                          sx={{
                            ":hover": {
                              color: COLORS.mainColor,
                            },
                          }}
                        >
                          {orderDetails?.user?.fullName}
                        </Typography>
                      </Stack>
                    </CardActionArea>
                    <Divider />
                    <Stack gap={1}>
                      <Typography fontWeight={"bold"}>
                        Thông tin liên lạc
                      </Typography>
                      <Typography color={"#717788"}>
                        Email: {orderDetails?.user?.email}
                      </Typography>
                      <Typography color={"#717788"}>
                        SĐT: {orderDetails?.user?.phoneNumber}
                      </Typography>
                    </Stack>
                    <Divider />
                    <Stack gap={1}>
                      <Typography fontWeight={"bold"}>
                        Phương thức thanh toán
                      </Typography>
                      <Typography color={"#717788"}>
                        {orderDetails?.paymentMethod}
                      </Typography>
                    </Stack>
                    <Divider />
                    <Stack gap={1}>
                      <Typography fontWeight={"bold"} variant="body2">
                        Phương thức giao hàng
                      </Typography>
                      <Typography color={"#717788"} variant="body2">
                        {orderDetails?.description}
                      </Typography>
                    </Stack>
                    <Divider />
                    <Stack gap={1}>
                      <Typography fontWeight={"bold"} variant="body2">
                        Địa chỉ giao hàng
                      </Typography>
                      <Typography color={"#717788"} variant="body2">
                        {orderDetails?.destination}
                      </Typography>
                    </Stack>
                    <Divider />
                  </Stack>
                </CardContent>
              </Card>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  Divider,
  Pagination,
  Stack,
  Tab,
  Tabs,
  ThemeProvider,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { useEffect, useState } from "react";
import { COLORS } from "../../utils/Constants";
import { buttonSelectedTheme } from "../../styles/Theme";
import { CustomersSearch } from "../../components/customer/customers-search";
import { useNavigate } from "react-router-dom";
import { userRoute } from "../../routes/routes";
import { getOrderWithFilter } from "../../api/orderApiService";
import { numberToCurrency } from "../../utils/currencyFormat";
import { orderStatuses } from "../../utils/mappingData";

export const HistoryOrder = () => {
  const navigate = useNavigate();

  const [filterList, setFilterList] = useState({
    userId: null,
    orderId: null,
    status: "8",
    pageIndex: 1,
  });

  const [listOrders, setListOrders] = useState();

  const handleChange = (_event, newValue) => {
    setFilterList({ ...filterList, status: newValue });
  };

  const searchKeys = (searchKeys) => {
    setFilterList({ ...filterList, orderId: searchKeys });
  };

  useEffect(() => {
    const listOrders = async () => {
      const response = await getOrderWithFilter({
        userId: filterList.userId ?? null,
        orderId: filterList.orderId ?? null,
        status: filterList.status,
        pageIndex: filterList.pageIndex,
        pageSize: 5,
      });

      if (response && response.status === 200) {
        setListOrders(response.data);
      }
    };
    listOrders();
  }, [filterList]);

  return (
    <Box
      sx={{
        backgroundColor: "#F5F5F5",
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid xs={12} sm={12} md={12} lg={12}>
            <Typography fontWeight="bold" fontSize="22.575px" textAlign="left">
              Đơn hàng của tôi
            </Typography>
          </Grid>
          <Grid xs={12} sm={12} md={12} lg={12}>
            <Box sx={{ borderBottom: 1, borderColor: "divider", backgroundColor: "white" }}>
              <ThemeProvider theme={buttonSelectedTheme}>
                <Tabs
                  value={filterList.status}
                  onChange={handleChange}
                  scrollButtons="auto"
                  variant="scrollable"
                >
                  <Tab sx={{ width: 180 }} value="8" label="Tất cả đơn" />
                  <Tab sx={{ width: 180 }} value="0" label="Chờ xác nhận" />
                  <Tab sx={{ width: 180 }} value="2" label="Chuẩn bị hàng" />
                  <Tab sx={{ width: 180 }} value="3" label="Đang giao" />
                  <Tab sx={{ width: 180 }} value="7" label="Hoàn thành" />
                  <Tab sx={{ width: 180 }} value="6" label="Đã hủy" />
                </Tabs>
              </ThemeProvider>
            </Box>
          </Grid>
          <Grid xs={12} sm={12} md={12} lg={12}>
            <CustomersSearch
              placeholder="Tìm kiếm theo mã đơn hàng"
              searchKeys={searchKeys}
            />
          </Grid>
          {listOrders?.items?.map((item) => {
            return (
              <Grid xs={12} sm={12} md={12} lg={12} key={item?.id} >
                <Card
                  sx={{
                    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                    borderRadius: "8px",
                  }}
                >
                  <CardHeader
                    subheader={orderStatuses[item?.statuses[0]?.status.status]}
                    subheaderTypographyProps={{
                      textAlign: "left",
                      fontWeight: "bold",
                    }}
                  />
                  <Divider />
                  <CardContent>
                    <Stack gap={2}>
                      {item?.products?.map((product) => {
                        return (
                          <>
                            <Stack
                              key={product.id}
                              display="flex"
                              justifyContent="space-between"
                              flexDirection="row"
                              alignItems="center"
                            >
                              <Stack direction="row" gap={2}>
                                <img
                                  src={product?.images[0]}
                                  width={82}
                                  height={82}
                                  style={{ border: "1px solid #EEEEEE" }}
                                />
                                <Stack display="flex" justifyContent="left">
                                  <Typography>{product.name}</Typography>
                                  <Typography textAlign="left">
                                    x{product.quantity}
                                  </Typography>
                                </Stack>
                              </Stack>
                              <Stack>
                                <Typography>
                                  {numberToCurrency(product.price)}
                                </Typography>
                              </Stack>
                            </Stack>
                            <Divider />
                          </>
                        );
                      })}
                    </Stack>
                  </CardContent>

                  <CardActions sx={{ justifyContent: "right", p: "16px" }}>
                    <Stack
                      direction="column"
                      gap={2}
                      display="flex"
                      textAlign="right"
                    >
                      <Typography>
                        Tổng tiền: {numberToCurrency(item?.sum)}
                      </Typography>
                      <Stack gap={2} direction="row">
                        <Button
                          onClick={() =>
                            navigate(`/${userRoute.orderDetails}`, {
                              state: item.id,
                            })
                          }
                          variant="contained"
                          sx={{
                            boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                            borderRadius: "6px",
                            backgroundColor: COLORS.background,
                            ":hover": {
                              backgroundColor: "#0E6637",
                            },
                          }}
                        >
                          Xem chi tiết
                        </Button>
                        <Button
                          onClick={() => navigate(`/${userRoute.product}`)}
                          variant="contained"
                          sx={{
                            boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                            borderRadius: "6px",
                            backgroundColor: COLORS.background,
                            ":hover": {
                              backgroundColor: "#0E6637",
                            },
                          }}
                        >
                          Mua lại
                        </Button>
                      </Stack>
                    </Stack>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}

          <Grid
            xs={12}
            sm={12}
            md={12}
            lg={12}
            justifyContent={"center"}
            display={"flex"}
          >
            <Pagination
              count={listOrders?.totalPage}
              page={filterList.pageIndex - 1}
              onChange={(_event, page) =>
                setFilterList({ ...filterList, pageIndex: page })
              }
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

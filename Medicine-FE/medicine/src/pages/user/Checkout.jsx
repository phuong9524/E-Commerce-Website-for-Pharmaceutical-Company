import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Divider,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  ThemeProvider,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { useLocation, useNavigate } from "react-router-dom";
import { buttonSelectedTheme } from "../../styles/Theme";
import { numberToCurrency } from "../../utils/currencyFormat";
import { userRoute } from "../../routes/routes";
import { buyButton } from "../../styles/Button";
import { COLORS } from "../../utils/Constants";
import { useState } from "react";
import { postConfirmCart } from "../../api/cartApiService";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/silce/cartSlice";
import { FormInputInfo } from "../../components/shared/FormInputInfo";

const data = [
  {
    id: 1,
    value: "Trực tiếp",
    img: "https://res.cloudinary.com/dwsae4gmt/image/upload/v1691491140/1b3b9cda5208b323eb9ec56b84c7eb87_zhqgrl.png",
    title: "Thanh toán khi nhận hàng",
  },
  {
    id: 2,
    value: "Viettel money",
    img: "https://res.cloudinary.com/dwsae4gmt/image/upload/v1691493109/d7ac8660aae903818dd7da8e4772e145_xsjio3.png",
    title: "Thanh toán bằng ví Viettel Money",
  },
  {
    id: 3,
    value: "MoMo",
    img: "https://res.cloudinary.com/dwsae4gmt/image/upload/v1691493109/ea880ef285856f744e3ffb5d282d4b2d_bjm6cw.jpg",
    title: "Thanh toán bằng ví MoMo",
  },
  {
    id: 4,
    value: "ZaloPay",
    img: "https://res.cloudinary.com/dwsae4gmt/image/upload/v1691493109/dd7ded6d3659036f15f95fe81ac76d93_nmsvtg.png ",
    title: "Thanh toán bằng ví ZaloPay",
  },
  {
    id: 5,
    value: "VNPAY",
    img: "https://res.cloudinary.com/dwsae4gmt/image/upload/v1691493110/a35cb9c62b9215dbc6d334a77cda4327_hdyf4o.png",
    title: "Thanh toán bằng VNPAY",
  },
  {
    id: 6,
    value: "Thẻ tín dụng",
    img: "https://res.cloudinary.com/dwsae4gmt/image/upload/v1691493109/7fb406156d0827b736cf0fe66c90ed78_m0l6zg.png",
    title: "Thanh toán bằng thẻ quốc tế Visa, Master, JCB",
  },
];

const shipping = [
  {
    id: 1,
    value: "Vận chuyển nhanh",
    price: 14000,
  },
  {
    id: 2,
    value: "Vận chuyển siêu tốc",
    price: 30000,
  },
];

export const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const subTotal = location.state.price;
  const [paymentMethod, setPaymentMethod] = useState("Trực tiếp");
  const [shippingMethod, setShippingMethod] = useState("Vận chuyển siêu tốc");
  const [shippingFee, setShippingFee] = useState(30000);
  const [shippingAddress, setShippingAddress] = useState(
    location.state.address
  );
  const [isDisabled, setIsDisabled] = useState(true);

  const handleChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handleChangeShippingMethod = (event) => {
    setShippingMethod(event.target.value);
    const filterItem = shipping.filter(
      (item) => event.target.value === item.value
    );
    setShippingFee(filterItem[0].price);
  };

  const handleConfirmCart = async () => {
    let i = 0;
    const cartInfos = [];
    do {
      const picked = (({ id, price }) => ({ id, price }))(
        location.state.items[i]
      );
      cartInfos.push(picked);
      i++;
    } while (i < location.state.items.length);

    const response = await postConfirmCart({
      cartInfos,
      paymentMethod,
      description: shippingMethod,
      destination: shippingAddress,
    });

    if (response && response.status === 201) {
      navigate(`/${userRoute.orderSuccess}`, { state: response.data.id });
      dispatch(addToCart());
    }
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        py: 8,
      }}
      component="form"
    >
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid xs={12} sm={12} md={12} lg={12}>
            <Typography fontWeight="bold" fontSize="22.575px" textAlign="left">
              Thanh toán
            </Typography>
          </Grid>
          <Grid xs={12} sm={12} md={8} lg={8}>
            <Stack spacing={3}>
              <Card
                sx={{
                  borderRadius: "20px",
                  boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                  textAlign: "left",
                }}
              >
                <CardHeader
                  title="Danh sách sản phẩm"
                  titleTypographyProps={{
                    fontWeight: "bold",
                    fontSize: "18px",
                  }}
                />
                <CardContent>
                  {location.state.items.map((item) => (
                    <Grid container spacing={5} key={item.id}>
                      <Grid xs={2} sm={2} md={2} lg={2}>
                        <img src={item.images[0]} width={150} />
                      </Grid>
                      <Grid xs sm md lg container>
                        <Grid
                          xs={12}
                          sm={5}
                          md={5}
                          lg={5}
                          textAlign="left"
                          justifyContent="center"
                          display="flex"
                          flexDirection="column"
                        >
                          <Typography fontWeight="bold" py={1}>
                            {item.productName}
                          </Typography>
                        </Grid>
                        <Grid
                          xs
                          sm
                          md
                          lg
                          display="flex"
                          flexDirection="row"
                          justifyContent="space-around "
                          alignItems="center"
                          textAlign="left"
                        >
                          <Typography>{item.quantity}</Typography>
                          <Typography fontWeight="bold">
                            {numberToCurrency(item.price)}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  ))}
                </CardContent>
              </Card>
              <Card
                sx={{
                  borderRadius: "20px",
                  boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                  textAlign: "left",
                }}
              >
                <CardHeader
                  title="Chọn hình thức giao hàng"
                  titleTypographyProps={{
                    fontWeight: "bold",
                    fontSize: "18px",
                  }}
                />
                <CardContent>
                  <FormControl>
                    <RadioGroup
                      value={shippingMethod}
                      onChange={handleChangeShippingMethod}
                    >
                      <Box gap={2} display="flex" flexDirection="column">
                        {shipping.map((item) => {
                          return (
                            <FormControlLabel
                              key={item.id}
                              control={<Radio color="success" />}
                              value={item.value}
                              label={
                                <Stack
                                  direction="row"
                                  alignItems="center"
                                  spacing={1.5}
                                >
                                  <Typography>{item.value}</Typography>
                                </Stack>
                              }
                            />
                          );
                        })}
                      </Box>
                    </RadioGroup>
                  </FormControl>
                </CardContent>
              </Card>
              <Card
                sx={{
                  borderRadius: "20px",
                  boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                  textAlign: "left",
                }}
              >
                <CardHeader
                  title="Chọn hình thức thanh toán"
                  titleTypographyProps={{
                    fontWeight: "bold",
                    fontSize: "18px",
                  }}
                />
                <CardContent>
                  <FormControl>
                    <RadioGroup value={paymentMethod} onChange={handleChange}>
                      <Box gap={2} display="flex" flexDirection="column">
                        {data.map((item) => {
                          return (
                            <FormControlLabel
                              key={item.id}
                              control={<Radio color="success" />}
                              value={item.value}
                              label={
                                <Stack
                                  direction="row"
                                  alignItems="center"
                                  spacing={1.5}
                                >
                                  <img src={item.img} width={35} />
                                  <Typography>{item.title}</Typography>
                                </Stack>
                              }
                            />
                          );
                        })}
                      </Box>
                    </RadioGroup>
                  </FormControl>
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
                  textAlign: "left",
                }}
              >
                <CardHeader
                  subheader={"Giao tới"}
                  action={
                    <ThemeProvider theme={buttonSelectedTheme}>
                      <Button
                        sx={{ textTransform: "none" }}
                        onClick={() => setIsDisabled(false)}
                      >
                        Thay đổi
                      </Button>
                    </ThemeProvider>
                  }
                />
                <Divider />
                <CardContent>
                  <FormInputInfo
                    disabled={isDisabled}
                    isMultiline={true}
                    height={100}
                    onChange={(event) => setShippingAddress(event.target.value)}
                    defaultValue={location.state.address}
                  />
                </CardContent>
              </Card>

              <Card
                sx={{
                  borderRadius: "20px",
                  boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                }}
              >
                <CardContent>
                  <Stack spacing={2}>
                    <Box display="flex" justifyContent="space-between">
                      <Typography>Tạm tính</Typography>
                      <Typography>{numberToCurrency(subTotal)}</Typography>
                    </Box>
                    <Box display="flex" justifyContent="space-between">
                      <Typography>Phí vận chuyển</Typography>
                      <Typography>{numberToCurrency(shippingFee)}</Typography>
                    </Box>
                    <Box display="flex" justifyContent="space-between">
                      <Typography>Giảm giá</Typography>
                      <Typography>{numberToCurrency(0)}</Typography>
                    </Box>
                    <Divider />
                    <Box display="flex" justifyContent="space-between">
                      <Typography fontWeight="bold">Tổng tiền</Typography>
                      <Typography fontWeight="bold" color={COLORS.mainColor}>
                        {numberToCurrency(subTotal + shippingFee)}
                      </Typography>
                    </Box>
                    <Button sx={buyButton} onClick={handleConfirmCart}>
                      Đặt hàng
                    </Button>
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

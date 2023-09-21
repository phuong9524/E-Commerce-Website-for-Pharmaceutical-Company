import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { buyButton } from "../../styles/Button";
import { BuyProductCartTable } from "../../components/buyProduct/buy-product-cart-table";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelection } from "../../hooks/UseSelection";
import { numberToCurrency } from "../../utils/currencyFormat";
import { COLORS } from "../../utils/Constants";
import { userRoute } from "../../routes/routes";
import { FormInputInfo } from "../../components/shared/FormInputInfo";

export const Cart = () => {
  const [cartItems, setcartItems] = useState([]);
  const [subTotal, setSubTotal] = useState();
  const [shippingAddress, setShippingAddress] = useState("");

  const navigate = useNavigate();

  const items = (items) => {
    setcartItems(items);
  };

  const useProductsIds = (items) => {
    return useMemo(() => {
      return items.map((item) => item.productId);
    }, [items]);
  };

  const productsIds = useProductsIds(cartItems);
  const productSelection = useSelection(productsIds);

  useEffect(() => {
    let filterItem = cartItems.filter((f) =>
      productSelection.selected.some((item) => item === f.productId)
    );

    setSubTotal(
      filterItem.reduce((acc, obj) => {
        return acc + obj.price;
      }, 0)
    );
  }, [productSelection, cartItems]);

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
              Giỏ hàng
            </Typography>
          </Grid>
          <Grid xs={12} sm={12} md={8} lg={8}>
            <Card
              sx={{
                borderRadius: "20px",
                boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
              }}
            >
              <CardContent>
                <BuyProductCartTable
                  items={items}
                  onDeselectAll={productSelection.handleDeselectAll}
                  onDeselectOne={productSelection.handleDeselectedOne}
                  onSelectAll={productSelection.handleSelectAll}
                  onSelectOne={productSelection.handleSelectOne}
                  selected={productSelection.selected}
                />
              </CardContent>
            </Card>
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
                <CardHeader subheader={"Giao tới"} />
                <Divider />
                <CardContent>
                  <FormInputInfo
                    placeholder={
                      "Nhập địa chỉ giao hàng và thông tin liên hệ..."
                    }
                    isMultiline={true}
                    height={100}
                    onChange={(event) => setShippingAddress(event.target.value)}
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
                      <Typography>Giảm giá</Typography>
                      <Typography>{numberToCurrency(0)}</Typography>
                    </Box>
                    <Divider />
                    <Box display="flex" justifyContent="space-between">
                      <Typography fontWeight="bold">Tổng tiền</Typography>
                      <Typography fontWeight="bold" color={COLORS.mainColor}>
                        {numberToCurrency(subTotal ? subTotal - 5000 : 0)}
                      </Typography>
                    </Box>
                    <Button
                      sx={buyButton}
                      onClick={() =>
                        navigate(`/${userRoute.checkout}`, {
                          state: {
                            items: cartItems.filter((f) =>
                              productSelection.selected.some(
                                (item) => item === f.productId
                              )
                            ),
                            price: subTotal,
                            address: shippingAddress,
                          },
                        })
                      }
                    >
                      Mua hàng
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

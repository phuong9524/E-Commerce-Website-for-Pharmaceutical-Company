import {
  Box,
  Button,
  Container,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import { userRoute } from "../../routes/routes";
import { useLocation, useNavigate } from "react-router-dom";
import { COLORS } from "../../utils/Constants";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

export const OrderSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth="md">
        <Grid
          container
          justifyContent="center"
          direction="column"
          alignContent="center"
        >
          <Stack
            gap={2}
            justifyContent={"center"}
            display={"flex"}
            alignItems={"center"}
          >
            <img
              src="https://htmlstream.com/front-dashboard/assets/svg/illustrations/oc-hi-five.svg"
              width="300"
              height="260"
            />
            <Typography fontWeight="bold" fontSize="20px">
              Cám ơn quý khách đã đặt hàng
            </Typography>
            <Typography color="#677788">
              Đơn hàng{" "}
              <Typography
                onClick={() =>
                  navigate(`/${userRoute.orderDetails}`, {
                    state: location.state,
                  })
                }
                fontWeight={"bold"}
                sx={{
                  cursor: "pointer",
                  ":hover": {
                    color: "black",
                  },
                }}
              >
                {location.state}
              </Typography>
            </Typography>

            <Button
              onClick={() => navigate(`/${userRoute.product}`)}
              startIcon={
                <SvgIcon fontSize="small">
                  <ShoppingCartCheckoutIcon />
                </SvgIcon>
              }
              variant="contained"
              sx={{
                boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                borderRadius: "11px",
                backgroundColor: COLORS.background,
                ":hover": {
                  backgroundColor: "#0E6637",
                },
              }}
            >
              Tiếp tục mua sắm
            </Button>
          </Stack>
        </Grid>
      </Container>
    </Box>
  );
};

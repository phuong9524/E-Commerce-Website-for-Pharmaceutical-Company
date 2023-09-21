import PropTypes from "prop-types";
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import {
  Avatar,
  Card,
  CardContent,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";

export const DashboardTotalProductSold = (props) => {
  const { value, sx } = props;

  return (
    <Card sx={sx}>
      <CardContent>
        <Stack
          alignItems="flex-start"
          direction="row"
          justifyContent="space-between"
          spacing={3}
        >
          <Stack spacing={1} textAlign="left">
            <Typography
              color="text.secondary"
              variant="overline"
              fontWeight="bold"
            >
              Số sản phẩm đã bán
            </Typography>
            <Typography variant="h4" fontWeight="bold" textAlign="left">
              {value}
            </Typography>
          </Stack>
          <Avatar
            sx={{
              backgroundColor: "#793FDF",
              height: 56,
              width: 56,
            }}
          >
            <SvgIcon>
              <ShoppingBasketIcon />
            </SvgIcon>
          </Avatar>
        </Stack>
      </CardContent>
    </Card>
  );
};

DashboardTotalProductSold.propTypes = {
  value: PropTypes.string,
  sx: PropTypes.object,
};

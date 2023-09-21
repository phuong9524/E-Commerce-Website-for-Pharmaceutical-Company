import PropTypes from "prop-types";
import {
  Avatar,
  Card,
  CardContent,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import CurrencyDollarIcon from "@heroicons/react/24/solid/CurrencyDollarIcon";
import ArrowDownIcon from "@heroicons/react/24/solid/ArrowDownIcon";
import ArrowUpIcon from "@heroicons/react/24/solid/ArrowUpIcon";
import { numberToCurrency } from "../../utils/currencyFormat";

export const DashboardBudget = (props) => {
  const { difference, positive = false, sx, value } = props;
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
              textAlign="left"
              fontWeight="bold"
            >
              Lợi nhuận
            </Typography>
            <Typography variant="h4" fontWeight="bold">
              {numberToCurrency(value)}
            </Typography>
          </Stack>
          <Avatar
            sx={{
              backgroundColor: "#F04438",
              height: 56,
              width: 56,
            }}
          >
            <SvgIcon>
              <CurrencyDollarIcon />
            </SvgIcon>
          </Avatar>
        </Stack>
        {difference && (
          <Stack alignItems="center" direction="row" spacing={2} sx={{ mt: 2 }}>
            <Stack alignItems="center" direction="row" spacing={0.5}>
              <SvgIcon color={positive ? "success" : "error"} fontSize="small">
                {positive ? <ArrowUpIcon /> : <ArrowDownIcon />}
              </SvgIcon>
              <Typography
                color={positive ? "success.main" : "#F04438"}
                variant="body2"
              >
                {isFinite(difference) ? difference : 0}%
              </Typography>
            </Stack>
            <Typography
              color="text.secondary"
              variant="caption"
              fontWeight="bold"
            >
              So với tháng trước
            </Typography>
          </Stack>
        )}
      </CardContent>
    </Card>
  );
};

DashboardBudget.propTypes = {
  difference: PropTypes.number,
  positive: PropTypes.bool,
  sx: PropTypes.object,
  value: PropTypes.string,
};

import PropTypes from "prop-types";
import ArrowDownIcon from "@heroicons/react/24/solid/ArrowDownIcon";
import ArrowUpIcon from "@heroicons/react/24/solid/ArrowUpIcon";
import UsersIcon from "@heroicons/react/24/solid/UsersIcon";
import {
  Avatar,
  Card,
  CardContent,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { getStatisticsCustomer } from "../../api/statictisApiService";

export const DashboardTotalCustomers = (props) => {
  const { sx } = props;
  const [data, setData] = useState();

  const difference = Math.abs(
    ((data?.totalCustomerThisMonth - data?.totalCustomerLastMonth) /
      data?.totalCustomerLastMonth) *
      100
  );
  const positive = difference >= 0;

  useEffect(() => {
    const fetchStatisticsCustomer = async () => {
      const response = await getStatisticsCustomer();
      if (response && response.status === 200) {
        setData(response.data.customer);
      }
    };
    fetchStatisticsCustomer();
  }, []);

  return (
    <Card sx={sx}>
      <CardContent>
        <Stack
          alignItems="flex-start"
          direction="row"
          justifyContent="space-between"
          spacing={3}
        >
          <Stack spacing={1}>
            <Typography
              color="text.secondary"
              variant="overline"
              fontWeight="bold"
            >
              Số lượng khách hàng
            </Typography>
            <Typography variant="h4" fontWeight="bold" textAlign="left">
              {data?.totalCustomer}
            </Typography>
          </Stack>
          <Avatar
            sx={{
              backgroundColor: "success.light",
              height: 56,
              width: 56,
            }}
          >
            <SvgIcon>
              <UsersIcon />
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
                color={positive ? "success.main" : "error.main"}
                variant="body2"
              >
                {Math.round(difference)}%
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

DashboardTotalCustomers.propTypes = {
  sx: PropTypes.object,
};

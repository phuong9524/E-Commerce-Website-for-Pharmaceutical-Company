import PropTypes from "prop-types";
import LibraryAddCheckIcon from "@mui/icons-material/LibraryAddCheck";
import {
  Avatar,
  Card,
  CardContent,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";

export const DashboardTotalProfit = (props) => {
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
              Số đơn hàng hoàn thành
            </Typography>
            <Typography variant="h4" fontWeight="bold" textAlign="left">
              {value}
            </Typography>
          </Stack>
          <Avatar
            sx={{
              backgroundColor: "#6366F1",
              height: 56,
              width: 56,
            }}
          >
            <SvgIcon>
              <LibraryAddCheckIcon />
            </SvgIcon>
          </Avatar>
        </Stack>
      </CardContent>
    </Card>
  );
};

DashboardTotalProfit.propTypes = {
  value: PropTypes.string,
  sx: PropTypes.object,
};

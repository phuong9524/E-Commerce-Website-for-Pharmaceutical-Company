import PropTypes from "prop-types";
import ComputerDesktopIcon from "@heroicons/react/24/solid/ComputerDesktopIcon";
import DeviceTabletIcon from "@heroicons/react/24/solid/DeviceTabletIcon";
import PhoneIcon from "@heroicons/react/24/solid/PhoneIcon";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Stack,
  SvgIcon,
  Typography,
  useTheme,
} from "@mui/material";
import { Chart } from "../shared/Chart";
import { COLORS } from "../../utils/Constants";
import { useNavigate } from "react-router-dom";
import { adminRoute } from "../../routes/routes";

const useChartOptions = (labels) => {
  const theme = useTheme();

  return {
    chart: {
      background: "transparent",
    },
    colors: ["#6366F1", theme.palette.success.light, "#FF8B13"],
    dataLabels: {
      enabled: false,
    },
    labels,
    legend: {
      show: false,
    },
    plotOptions: {
      pie: {
        expandOnClick: false,
      },
    },
    states: {
      active: {
        filter: {
          type: "none",
        },
      },
      hover: {
        filter: {
          type: "none",
        },
      },
    },
    stroke: {
      width: 0,
    },
    theme: {
      mode: theme.palette.mode,
    },
    tooltip: {
      fillSeriesColor: false,
    },
  };
};

export const DashboardBestSeller = (props) => {
  const navigate = useNavigate();
  const { chartSeries, sx } = props;
  const chartOptions = useChartOptions(
    chartSeries?.map((item) => item.nameProduct)
  );

  return (
    <Card sx={sx}>
      <CardHeader
        title="Sản Phẩm Bán Chạy"
        titleTypographyProps={{ fontWeight: "bold" }}
        sx={{ textAlign: "left" }}
      />
      <CardContent>
        <Chart
          height={300}
          options={chartOptions}
          series={chartSeries?.map((item) => item.totalSales) ?? []}
          type="donut"
          width="100%"
        />
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="center"
          spacing={2}
          sx={{ mt: 2 }}
        >
          {chartSeries?.map((item) => {
            return (
              <Box
                key={item.id}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{
                    my: 1,
                    cursor: "pointer",
                    ":hover": {
                      color: COLORS.background,
                    },
                  }}
                  variant="h7"
                  onClick={() =>
                    navigate(
                      `${adminRoute.productManagement}/${adminRoute.productEditing}`,
                      {
                        state: item.id,
                      }
                    )
                  }
                >
                  {item.nameProduct}
                </Typography>
                <Typography color="text.secondary" variant="subtitle2">
                  {item.totalSales} sản phẩm
                </Typography>
              </Box>
            );
          })}
        </Stack>
      </CardContent>
    </Card>
  );
};

DashboardBestSeller.propTypes = {
  chartSeries: PropTypes.array,
  labels: PropTypes.array,
  sx: PropTypes.object,
};

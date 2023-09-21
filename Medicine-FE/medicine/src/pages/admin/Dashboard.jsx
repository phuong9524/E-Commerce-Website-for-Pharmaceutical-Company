import { Box, Container } from "@mui/material";
import { subDays, subHours } from "date-fns";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

import { DashboardBudget } from "../../components/dashboard/dashboard-budget";
import { DashboardLastestOrder } from "../../components/dashboard/dashboard-latest-order";
import { DashboardSales } from "../../components/dashboard/dashboard-sales";
import { DashboardLatestProducts } from "../../components/dashboard/dashboard-latest-products";
import { DashboardTotalCustomers } from "../../components/dashboard/dashboard-total-customer";
import { DashboardTotalProfit } from "../../components/dashboard/dashboard-total-profit";
import { DashboardBestSeller } from "../../components/dashboard/dashboard-best-seller";
import { useEffect, useState } from "react";
import {
  getStatisticsOrder,
  getStatisticsProduct,
} from "../../api/statictisApiService";
import { DashboardTotalProductSold } from "../../components/dashboard/dashboard-total-product-sold";

const Dashboard = () => {
  const [orderData, setOrderData] = useState([]);
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    const fetchStatisticsOrder = async () => {
      const response = await getStatisticsOrder();
      if (response && response.status === 200) {
        setOrderData(response.data?.order);
      }
    };
    fetchStatisticsOrder();

    const fetchStatisticsProduct = async () => {
      const response = await getStatisticsProduct();
      if (response && response.status === 200) {
        setProductData(response.data?.product);
      }
    };

    fetchStatisticsProduct();
  }, []);

  const difference = Math.abs(
    ((orderData?.profitThisYear?.totalSum -
      orderData?.profitLastYear?.totalSum) /
      orderData?.profitLastYear?.totalSum) *
      100
  );

  const positive = difference >= 0;

  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Grid container spacing={3}>
            <Grid xs={12} sm={6} lg={3}>
              <DashboardBudget
                difference={Math.round(difference)}
                positive={positive}
                sx={{
                  height: "100%",
                  borderRadius: "20px",
                  boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                }}
                value={orderData?.totalSum}
              />
            </Grid>
            <Grid xs={12} sm={6} lg={3}>
              <DashboardTotalCustomers
                sx={{
                  height: "100%",
                  borderRadius: "20px",
                  boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                }}
              />
            </Grid>

            <Grid xs={12} sm={6} lg={3}>
              <DashboardTotalProfit
                sx={{
                  height: "100%",
                  boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                  borderRadius: "20px",
                }}
                value={orderData?.totalOrderSuccess}
              />
            </Grid>
            <Grid xs={12} sm={6} lg={3}>
              <DashboardTotalProductSold
                sx={{
                  height: "100%",
                  boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                  borderRadius: "20px",
                }}
                value={productData?.totalSales}
              />
            </Grid>
            <Grid xs={12} lg={8}>
              <DashboardSales
                chartSeries={[
                  {
                    name: "Năm nay",
                    data: Object.values(
                      orderData?.profitThisYear?.totalSumEachMonth ?? []
                    ),
                  },
                  {
                    name: "Năm ngoái",
                    data: Object.values(
                      orderData?.profitLastYear?.totalSumEachMonth ?? []
                    ),
                  },
                ]}
                sx={{
                  height: "100%",
                  borderRadius: "20px",
                  boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                }}
              />
            </Grid>
            <Grid xs={12} md={6} lg={4}>
              <DashboardBestSeller
                chartSeries={productData?.topProductSales}
                sx={{
                  height: "100%",
                  borderRadius: "20px",
                  boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                }}
              />
            </Grid>
            <Grid xs={12} md={6} lg={4}>
              <DashboardLatestProducts
                sx={{
                  height: "100%",
                  borderRadius: "20px",
                  boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                }}
              />
            </Grid>
            <Grid xs={12} md={12} lg={8}>
              <DashboardLastestOrder
                sx={{
                  height: "100%",
                  borderRadius: "20px",
                  boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Dashboard;

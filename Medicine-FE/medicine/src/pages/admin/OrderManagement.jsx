import TrashIcon from "@heroicons/react/24/solid/TrashIcon";
import ArrowUpOnSquareIcon from "@heroicons/react/24/solid/ArrowUpOnSquareIcon";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSelection } from "../../hooks/UseSelection";
import {
  Box,
  Button,
  Container,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import CachedIcon from "@mui/icons-material/Cached";
import { CustomersSearch } from "../../components/customer/customers-search";
import { OrderManagementTable } from "../../components/orderManagement/order-management-table";
import { getOrderWithFilter } from "../../api/orderApiService";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { COLORS } from "../../utils/Constants";

export const OrderManagement = () => {
  const [listOrder, setListOrder] = useState([]);
  const [checkUpdate, setCheckUpdate] = useState("");
  const [animationState, setAnimationState] = useState("paused");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowperPage] = useState(10);
  const [filterList, setFilterList] = useState({
    userId: null,
    orderId: null,
    status: "8",
  });

  const fetchOrders = async () => {
    const response = await getOrderWithFilter({
      userId: filterList.userId ?? null,
      orderId: filterList.orderId ?? null,
      status: 8,
      sortTypes: 0,
      pageIndex: page + 1,
      pageSize: rowsPerPage,
    });
    if (response && response.status === 200) {
      setListOrder(response.data);
      setAnimationState("paused");
    }
  };

  const statusId = (statusId) => {
    setCheckUpdate(statusId);
  };

  useEffect(() => {
    fetchOrders();
  }, [page, rowsPerPage, filterList.userId, checkUpdate]);

  const useCustomerIds = (orders) => {
    return useMemo(() => {
      return orders?.map((order) => order.id);
    }, [orders]);
  };

  const ordersIds = useCustomerIds(listOrder?.items);
  const orderSelection = useSelection(ordersIds);

  const onClickToUpdate = () => {
    setAnimationState("running");
    fetchOrders();
  };
  const handlePageChange = (event, page) => {
    setPage(page);
  };

  const handleRowPerPageChange = useCallback((event) => {
    setRowperPage(event.target.value);
  }, []);

  const searchKeys = (searchKeys) => {
    setFilterList({ ...filterList, userId: searchKeys });
  };

  return (
    <>
      <Box component="main" sx={{ flexGrow: 1, py: 8}}>
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Stack direction="row" spacing={2}>
                  <Typography variant="h5" fontWeight="bold">
                    Đơn hàng
                  </Typography>
                  <Button
                    sx={{ backgroundColor: "#E7E8EC", borderRadius: "8px" }}
                    disabled
                  >
                    <Typography fontSize="16px" fontWeight="bold" color="black">
                      100,234
                    </Typography>
                  </Button>
                </Stack>

                <Stack alignItems="center" direction="row" spacing={1}>
                  <Button
                    color="inherit"
                    startIcon={
                      <SvgIcon fontSize="small">
                        <ArrowUpOnSquareIcon />
                      </SvgIcon>
                    }
                  >
                    In
                  </Button>
                </Stack>
              </Stack>
            </Stack>
            {orderSelection.selected.length > 0 ? (
              <Stack direction="row" spacing={2} py={"0.61rem"}>
                <Button
                  startIcon={
                    <SvgIcon fontSize="small">
                      <TrashIcon />
                    </SvgIcon>
                  }
                  variant="contained"
                  sx={{
                    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                    borderRadius: "5px",
                    backgroundColor: "#fff",
                    outline: "1px solid",
                    textTransform: "none",
                    color: "#FF6464",
                    ":hover": {
                      backgroundColor: "#FF6464",
                      color: "#fff",
                      outline: "1px solid",
                      outlineColor: "#FF6464",
                    },
                  }}
                >
                  Xóa
                </Button>
                <Typography
                  justifyContent="left"
                  alignItems="center"
                  display="flex"
                  variant="body2"
                >
                  {orderSelection.selected.length} đơn được chọn
                </Typography>
              </Stack>
            ) : (
              <Grid container spacing={2} alignItems={"center"}>
                <Grid
                  xs={12}
                  sm={6}
                  md={6}
                  lg={6}
                  display={"flex"}
                  justifyContent={"flex-start"}
                >
                  <CustomersSearch
                    sx={{
                      borderRadius: "20px",
                      boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                      textAlign: "left",
                    }}
                    searchKeys={searchKeys}
                    placeholder="Tìm kiếm tên khách hàng"
                  />
                </Grid>
                <Grid
                  xs={8}
                  sm={6}
                  md={6}
                  lg={6}
                  display={"flex"}
                  justifyContent={"flex-end"}
                >
                  <Button
                    onClick={onClickToUpdate}
                    startIcon={
                      <SvgIcon
                        fontSize="small"
                        sx={{
                          animation: `spin 2s linear infinite ${animationState}`,
                          "@keyframes spin": {
                            "0%": {
                              transform: "rotate(360deg)",
                            },
                            "100%": {
                              transform: "rotate(0deg)",
                            },
                          },
                        }}
                      >
                        <CachedIcon />
                      </SvgIcon>
                    }
                    variant="contained"
                    sx={{
                      boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                      borderRadius: "5px",
                      backgroundColor: "#fff",
                      outline: "1px solid",
                      textTransform: "none",
                      color: COLORS.background,
                      ":hover": {
                        backgroundColor: COLORS.background,
                        color: "#fff",
                        outline: "1px solid",
                        outlineColor: COLORS.background,
                      },
                    }}
                  >
                    Cập nhật danh sách
                  </Button>
                </Grid>
              </Grid>
            )}

            <OrderManagementTable
              count={listOrder?.totalCount}
              items={listOrder?.items}
              onDeselectAll={orderSelection.handleDeselectAll}
              onDeselectOne={orderSelection.handleDeselectedOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowPerPageChange}
              onSelectAll={orderSelection.handleSelectAll}
              onSelectOne={orderSelection.handleSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={orderSelection.selected}
              statusId={statusId}
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

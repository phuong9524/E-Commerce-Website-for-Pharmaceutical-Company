import { subDays, subHours } from "date-fns";
import TrashIcon from "@heroicons/react/24/solid/TrashIcon";
import ArrowUpOnSquareIcon from "@heroicons/react/24/solid/ArrowUpOnSquareIcon";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import { useCallback, useEffect, useMemo, useState } from "react";
import { applyPagination } from "../../utils/ApplyPagination";

import { useSelection } from "../../hooks/UseSelection";
import {
  Box,
  Button,
  Container,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import { CustomersSearch } from "../../components/customer/customers-search";
import { CustomersTable } from "../../components/customer/customers-table";
import { COLORS } from "../../utils/Constants";
import { useNavigate } from "react-router-dom";
import { adminRoute } from "../../routes/routes";
import { getListCustomer } from "../../api/userApiService";

const Customers = () => {
  const navigate = useNavigate();
  const [data, setData] = useState();
  const [page, setPage] = useState(0);

  const [rowsPerPage, setRowperPage] = useState(10);

  useEffect(() => {
    const listCustomer = async () => {
      const response = await getListCustomer({
        pageIndex: page + 1,
        pageSize: rowsPerPage,
      });
      if (response && response.status === 200) {
        setData(response.data);
        console.log(response.data);
      }
    };  
    listCustomer();
  }, [page, rowsPerPage]);

  const useCustomerIds = (customers) => {
    return useMemo(() => {
      return customers?.map((customer) => customer.id);
    }, [customers]);
  };

  const customersIds = useCustomerIds(data?.items);
  const customerSelection = useSelection(customersIds);

  const handlePageChange = useCallback((event, value) => {
    setPage(value);
  }, []);

  const handleRowPerPageChange = useCallback((event) => {
    setRowperPage(event.target.value);
  }, []);

  return (
    <>
      <Box component="main" sx={{ flexGrow: 1, py: 8 }}>
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Stack direction="row" spacing={2}>
                  <Typography variant="h5" fontWeight="bold">
                    Khách hàng
                  </Typography>
                  <Button
                    sx={{ backgroundColor: "#E7E8EC", borderRadius: "8px" }}
                    disabled
                  >
                    <Typography fontSize="16px" fontWeight="bold" color="black">
                      23,500
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
              <div>
                <Button
                  onClick={() => navigate(adminRoute.customerCreation)}
                  startIcon={
                    <SvgIcon fontSize="small">
                      <PlusIcon />
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
                  Thêm khách hàng
                </Button>
              </div>
            </Stack>
            {customerSelection.selected.length > 0 ? (
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
                  {customerSelection.selected.length} người được chọn
                </Typography>
              </Stack>
            ) : (
               <CustomersSearch
              sx={{
                p: 2,
                borderRadius: "20px",
                boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                textAlign: "left",
              }}
              // searchKeys={searchKeys}
              placeholder="Tìm kiếm khách hàng" 
            />
            )}
           
            <CustomersTable
              count={data?.totalCount}
              items={data?.items}
              onDeselectAll={customerSelection.handleDeselectAll}
              onDeselectOne={customerSelection.handleDeselectedOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowPerPageChange}
              onSelectAll={customerSelection.handleSelectAll}
              onSelectOne={customerSelection.handleSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={customerSelection.selected}
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default Customers;

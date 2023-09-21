import TrashIcon from "@heroicons/react/24/solid/TrashIcon";
import ArrowUpOnSquareIcon from "@heroicons/react/24/solid/ArrowUpOnSquareIcon";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { EmployeeManagementTable } from "../../components/employeeManagement/employee-management-table";
import { getListEmployees } from "../../api/userApiService";
import { COLORS } from "../../utils/Constants";
import { adminRoute } from "../../routes/routes";

export const EmployeeManagement = () => {
  const [searchKey, setSearchKey] = useState("");
  const [listEmployee, setListEmployee] = useState([]);
  const [totalCount, setTotalCount] = useState();
  const [totalPage, setTotalPage] = useState();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowperPage] = useState(5);
  const navigate = useNavigate();

  const handlePageChange = useCallback((event, value) => {
    setPage(value);
  }, []);

  const handleRowPerPageChange = useCallback((event) => {
    setRowperPage(event.target.value);
  }, []);

  const fetchOrders = async () => {
    const response = await getListEmployees({
      role: null,
      sortTypes: 0,
      pageIndex: page + 1,
      pageSize: rowsPerPage,
    });
    if (response && response.status === 200) {
      setListEmployee(response.data.items);
      setTotalCount(response.data.totalCount);
      setTotalPage(response?.data?.totalPages);
      console.log(response.data);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [page, rowsPerPage, searchKey]);

  return (
    <>
      <Box component="main" sx={{ flexGrow: 1, py: 8 }}>
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Stack direction="row" spacing={2}>
                  <Typography variant="h5" fontWeight="bold">
                    Nhân viên
                  </Typography>
                  <Button
                    sx={{ backgroundColor: "#E7E8EC", borderRadius: "8px" }}
                    disabled
                  >
                    <Typography fontSize="16px" fontWeight="bold" color="black">
                      {totalCount}
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
                  onClick={() => navigate(adminRoute.employeeCreation)}
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
                  Thêm nhân viên
                </Button>
              </div>
            </Stack>
            {/* {employeeSelection.selected.length > 0 ? (
              <Stack direction="row-reverse" spacing={2}>
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
                  {employeeSelection.selected.length} đơn được chọn
                </Typography>
              </Stack>
            ) : (
              <></>
            )} */}
            {/* <CustomersSearch
              sx={{
                p: 2,
                borderRadius: "20px",
                boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                textAlign: "left",
              }}
              searchKeys={searchKeys}
              placeholder="Tìm kiếm nhân viên"
            /> */}
            <EmployeeManagementTable
              count={totalCount}
              items={listEmployee}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowPerPageChange}
              page={page}
              rowsPerPage={rowsPerPage}
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

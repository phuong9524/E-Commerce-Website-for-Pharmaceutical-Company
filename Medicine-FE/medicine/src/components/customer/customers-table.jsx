import PropTypes from "prop-types";
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { ScrollBar } from "../shared/ScrollBar";
import { getInitials } from "../../utils/GetInitials";
import { buttonSelectedTheme } from "../../styles/Theme";
import { COLORS } from "../../utils/Constants";
import { useNavigate } from "react-router-dom";
import { adminRoute } from "../../routes/routes";
import { formatToDate, formatToFulldatetime } from "../../utils/FormatTime";
import { numberToCurrency } from "../../utils/currencyFormat";

export const CustomersTable = (props) => {
  const {
    count = 0,
    items = [],
    onDeselectAll,
    onDeselectOne,
    onPageChange = () => {},
    onRowsPerPageChange,
    onSelectAll,
    onSelectOne,
    page = 0,
    rowsPerPage = 0,
    selected = [],
  } = props;
  const navigate = useNavigate();
  const selectedSome = selected.length > 0 && selected.length < items.length;
  const selectedAll = items.length > 0 && selected.length === items.length;

  return (
    <Card
      sx={{
        borderRadius: "20px",
        boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
      }}
    >
      <ScrollBar>
        <Box sx={{ minWidth: 1400 }}>
          <ThemeProvider theme={buttonSelectedTheme}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedAll}
                      indeterminate={selectedSome}
                      onChange={(event) => {
                        if (event.target.checked) {
                          onSelectAll?.();
                        } else {
                          onDeselectAll?.();
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Họ tên</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Email</TableCell>
                  {/* <TableCell sx={{ fontWeight: "bold" }}>Địa chỉ</TableCell> */}
                  <TableCell sx={{ fontWeight: "bold" }}>SĐT</TableCell>
                  {/* <TableCell sx={{ fontWeight: "bold" }}>Ngày tạo</TableCell> */}
                  <TableCell sx={{ fontWeight: "bold" }}>
                    Tổng đơn hàng
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    Tổng số tiền đã chi
                  </TableCell>
                  {/* <TableCell sx={{ fontWeight: "bold" }}>
                    Hoạt động lần cuối
                  </TableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {items.map((customer) => {
                  const isSelected = selected.includes(customer.id);

                  return (
                    <TableRow hover key={customer.id} selected={isSelected}>
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isSelected}
                          onChange={(event) => {
                            if (event.target.checked) {
                              onSelectOne?.(customer.id);
                            } else {
                              onDeselectOne?.(customer.id);
                            }
                          }}
                        />
                      </TableCell>
                      <TableCell
                        sx={{
                          cursor: "pointer",
                          ":hover": {
                            color: COLORS.mainColor,
                          },
                        }}
                        onClick={() =>
                          navigate(adminRoute.customersDetails, {
                            state: customer,
                          })
                        }
                      >
                        <Stack alignItems="center" direction="row" spacing={2}>
                          <Avatar src={customer.avatar}>
                            {getInitials(customer.fullName)}
                          </Avatar>
                          <Typography variant="subtitle2">
                            {customer.fullName}
                          </Typography>
                        </Stack>
                      </TableCell>
                      <TableCell>{customer.email}</TableCell>
                      {/* <TableCell >{customer.address}</TableCell> */}
                      <TableCell>{customer.phoneNumber}</TableCell>
                      {/* <TableCell>
                        {customer ? formatToDate(customer.createdAt) : ""}
                      </TableCell> */}
                      <TableCell>{customer.orders} đơn</TableCell>
                      <TableCell>
                        {numberToCurrency(customer.sumMoney)}
                      </TableCell>
                      {/* <TableCell>
                        {customer === null
                          ? formatToFulldatetime(customer.lastLogin)
                          : ""}
                      </TableCell> */}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </ThemeProvider>
        </Box>
      </ScrollBar>
      <TablePagination
        labelRowsPerPage="Số khách hàng hiển thị"
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

CustomersTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onDeselectAll: PropTypes.func,
  onDeselectOne: PropTypes.func,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onSelectAll: PropTypes.func,
  onSelectOne: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array,
};

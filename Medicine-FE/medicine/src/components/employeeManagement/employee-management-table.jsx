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
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";

import { buttonSelectedTheme } from "../../styles/Theme";
import { COLORS } from "../../utils/Constants";
import { adminRoute } from "../../routes/routes";
import { SeverityPill } from "../shared/SeverityPill";
import { ScrollBar } from "../shared/ScrollBar";
import { getInitials } from "../../utils/GetInitials";
import { formatToDate, formatToFulldatetime } from "../../utils/FormatTime";
import { mapRoles } from "../../utils/mappingData";

export const EmployeeManagementTable = (props) => {
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
                  {/* <TableCell padding="checkbox">
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
                  </TableCell> */}
                  <TableCell sx={{ fontWeight: "bold" }}>
                    Tên nhân viên
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Username</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>email</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>SĐT</TableCell>
                  {/* <TableCell sx={{ fontWeight: "bold" }}>Tình trạng</TableCell> */}
                  <TableCell sx={{ fontWeight: "bold" }}>Vai trò</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    Ngày tham gia
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    Hoạt động lần cuối
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {items?.map((employee) => {
                  const isSelected = selected.includes(employee?.id);
                  // const createdAt = format(order.createdAt, "dd/MM/yyyy");

                  return (
                    <TableRow hover key={employee?.id} selected={isSelected}>
                      {/* <TableCell padding="checkbox">
                        <Checkbox
                          checked={isSelected}
                          onChange={(event) => {
                            if (event.target.checked) {
                              onSelectOne?.(employee.id);
                            } else {
                              onDeselectOne?.(employee.id);
                            }
                          }}
                        />
                      </TableCell> */}
                      <TableCell
                        sx={{
                          cursor: "pointer",
                          ":hover": {
                            color: COLORS.mainColor,
                          },
                        }}
                        onClick={() =>
                          navigate(`${adminRoute.employeeDetails}`, {
                            state: employee.id,
                          })
                        }
                      >
                        <Stack alignItems="center" direction="row" spacing={2}>
                          <Avatar src={employee?.avatar}>
                            {getInitials(employee?.fullName)}
                          </Avatar>
                          <Typography variant="subtitle2">
                            {employee?.fullName}
                          </Typography>
                        </Stack>
                      </TableCell>
                      <TableCell>{employee?.userName}</TableCell>
                      <TableCell>{employee?.email}</TableCell>
                      <TableCell>{employee?.phoneNumber}</TableCell>
                      <TableCell>{mapRoles[employee?.roles]}</TableCell>
                      <TableCell>{formatToDate(employee?.createdAt)}</TableCell>
                      <TableCell>
                        {formatToFulldatetime(employee?.lastLogIn)}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </ThemeProvider>
        </Box>
      </ScrollBar>
      <TablePagination
        labelRowsPerPage="Số nhân viên hiển thị"
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

EmployeeManagementTable.propTypes = {
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

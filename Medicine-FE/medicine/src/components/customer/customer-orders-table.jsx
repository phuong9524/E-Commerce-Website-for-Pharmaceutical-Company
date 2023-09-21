import PropTypes from "prop-types";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  ThemeProvider,
  Typography,
} from "@mui/material";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";

import { ScrollBar } from "../shared/ScrollBar";
import { buttonSelectedTheme } from "../../styles/Theme";
import { SeverityPill } from "../shared/SeverityPill";
import { COLORS } from "../../utils/Constants";
import { useNavigate } from "react-router-dom";
import { adminRoute } from "../../routes/routes";
import { format } from "date-fns";

const statusMap = {
  pending: "warning",
  delivered: "success",
  refunded: "error",
  delivering: "info",
};

export const CustomerOrdersTable = (props) => {
  const {
    count = 0,
    items = [],
    onPageChange = () => {},
    onRowsPerPageChange,
    page = 0,
    rowsPerPage = 0,
    selected = [],
  } = props;

  const navigate = useNavigate();

  return (
    <>
      <ScrollBar>
        <Box sx={{ minWidth: 1000 }}>
          <ThemeProvider theme={buttonSelectedTheme}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>Đơn hàng</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Thời gian</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Tình trạng</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Tổng tiền</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Hóa đơn</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {items.map((order) => {
                  const isSelected = selected.includes(order.id);
                  const createdAt = format(order.createdAt, "dd/MM/yyyy");
                  return (
                    <TableRow key={order.id} selected={isSelected}>
                      <TableCell
                        sx={{
                          cursor: "pointer",
                          color: COLORS.mainColor,
                          // ":hover": {
                          //   color: COLORS.mainColor,
                          // },
                        }}
                        // onClick={() =>
                        //   navigate(adminRoute.productEditing, {
                        //     state: order.id,
                        //   })
                        // }
                      >
                        <Typography variant="subtitle2">{order.id}</Typography>
                      </TableCell>
                      <TableCell>{createdAt}</TableCell>
                      <TableCell>
                        <SeverityPill color={statusMap[order.status.name]}>
                          {order.status.description}
                        </SeverityPill>
                      </TableCell>
                      <TableCell>{order.total}</TableCell>
                      <TableCell>
                        <Button
                          sx={{ textTransform: "none" }}
                          startIcon={<ReceiptLongOutlinedIcon />}
                        >
                          Hóa đơn
                        </Button>
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
        labelRowsPerPage="Số sản phẩm hiển thị"
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </>
  );
};

CustomerOrdersTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array,
};

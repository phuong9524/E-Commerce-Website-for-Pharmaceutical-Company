import PropTypes from "prop-types";
import ArrowRightIcon from "@heroicons/react/24/solid/ArrowRightIcon";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { ScrollBar } from "../shared/ScrollBar";

import { SeverityPill } from "../shared/SeverityPill";
import { useNavigate } from "react-router-dom";
import { adminRoute } from "../../routes/routes";
import { useEffect, useState } from "react";
import { getOrderWithFilter } from "../../api/orderApiService";
import { formatToFulldatetime } from "../../utils/FormatTime";
import { orderStatuses, statusColor } from "../../utils/mappingData";

export const DashboardLastestOrder = (props) => {
  const [listOrder, setListOrder] = useState([]);
  useEffect(() => {
    const fetchOrders = async () => {
      const response = await getOrderWithFilter({
        userId: null,
        orderId: null,
        status: 8,
        sortTypes: 0,
        pageIndex: 1,
        pageSize: 8,
      });
      if (response && response.status === 200) {
        setListOrder(response.data.items);
      }
    };
    fetchOrders();
  }, []);

  const { sx } = props;
  const navigate = useNavigate();
  return (
    <Card sx={sx}>
      <CardHeader
        title="Đơn hàng mới nhất"
        titleTypographyProps={{ fontWeight: "bold" }}
        sx={{ textAlign: "left" }}
      />
      <ScrollBar sx={{ flexGrow: 1 }}>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Đơn hàng</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Khách hàng</TableCell>
                <TableCell sx={{ fontWeight: "bold" }} sortDirection="desc">
                  Thời gian
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Trạng thái</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {listOrder.map((order) => {
                return (
                  <TableRow hover key={order.id}>
                    <TableCell>{order.id}</TableCell>
                    <TableCell>{order.user.fullName}</TableCell>
                    <TableCell>
                      {formatToFulldatetime(
                        order?.statuses?.slice(-1)[0].createdAt
                      )}
                    </TableCell>
                    <TableCell>
                      <SeverityPill
                        color={statusColor[order?.statuses[0]?.status?.status]}
                      >
                        {orderStatuses[order?.statuses[0]?.status?.status]}
                      </SeverityPill>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </ScrollBar>
      <Divider />
      <CardActions sx={{ justifyContent: "flex-end" }}>
        <Button
          color="inherit"
          endIcon={
            <SvgIcon fontSize="small">
              <ArrowRightIcon />
            </SvgIcon>
          }
          size="small"
          variant="text"
          sx={{ textTransform: "none" }}
          onClick={() => navigate(adminRoute.orderManagement)}
        >
          <Typography fontSize="small" fontWeight="bold">
            Xem thêm
          </Typography>
        </Button>
      </CardActions>
    </Card>
  );
};

DashboardLastestOrder.propTypes = {
  orders: PropTypes.array,
  sx: PropTypes.object,
};

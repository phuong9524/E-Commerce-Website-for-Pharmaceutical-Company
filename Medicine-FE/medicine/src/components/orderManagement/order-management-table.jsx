import PropTypes from "prop-types";
import {
  Box,
  Button,
  Card,
  Dialog,
  DialogContent,
  IconButton,
  Slide,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  ThemeProvider,
  Tooltip,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import ReplyRoundedIcon from "@mui/icons-material/ReplyRounded";
import WrongLocationOutlinedIcon from "@mui/icons-material/WrongLocationOutlined";
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";
import { toast } from "react-toastify";

import { buttonSelectedTheme } from "../../styles/Theme";
import { COLORS } from "../../utils/Constants";
import { adminRoute } from "../../routes/routes";
import { SeverityPill } from "../shared/SeverityPill";
import { ScrollBar } from "../shared/ScrollBar";
import { orderStatuses, statusColor } from "../../utils/mappingData";
import { formatToFulldatetime } from "../../utils/FormatTime";
import { postUpdateStatus } from "../../api/orderApiService";
import { numberToCurrency } from "../../utils/currencyFormat";
import { forwardRef, useState } from "react";
import { Invoice } from "../shared/invoice";

const statuses = {
  "Pending for confirm": [
    { name: "Xác nhận đơn hàng", icon: <CheckCircleOutlineIcon />, value: 1 },
    { name: "Hủy đơn", icon: <HighlightOffIcon />, value: 6 },
  ],
  "Pending for preparation": [
    {
      name: "Chuẩn bị hàng và giao cho ĐVVC",
      icon: <ArchiveOutlinedIcon />,
      value: 2,
    },
  ],
  "Delivered to transporter": [
    {
      name: "Tiến hành giao hàng",
      icon: <LocalShippingOutlinedIcon />,
      value: 3,
    },
  ],
  "On delivering": [
    { name: "Trả hàng", icon: <ReplyRoundedIcon />, value: 4 },
    {
      name: "Giao hàng không thành công",
      icon: <WrongLocationOutlinedIcon />,
      value: 5,
    },
    { name: "Giao hàng thành công", icon: <TaskAltOutlinedIcon />, value: 7 },
  ],
};

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const OrderManagementTable = (props) => {
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
    statusId,
  } = props;

  const [open, setOpen] = useState(false);
  const [id, setId] = useState("");

  const handleClickOpen = (id) => {
    setId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onClickToUpdateStatus = async (status, productId) => {
    const response = await postUpdateStatus({
      id: productId,
      orderStatuses: status,
      cancelReason: "",
    });
    if (response && response.status === 201) {
      toast.success("Cập nhật thành công", { theme: "light", autoClose: 1000 });
      statusId(response.data.id);
    }
  };

  const navigate = useNavigate();
  const selectedSome = selected.length > 0 && selected.length < items.length;
  const selectedAll = items.length > 0 && selected.length === items.length;

  return (
    <>
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
                    <TableCell sx={{ fontWeight: "bold" }}>Đơn hàng</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>
                      Thời gian đặt hàng
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>
                      Khách hàng
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>
                      Trạng thái hiện tại
                    </TableCell>
                    {/* <TableCell sx={{ fontWeight: "bold" }}>
                    Hình thức thanh toán
                  </TableCell> */}
                    <TableCell sx={{ fontWeight: "bold" }}>Tổng tiền</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Hóa đơn</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>
                      Cập nhật trạng thái
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {items?.map((order) => {
                    const isSelected = selected.includes(order.id);

                    return (
                      <TableRow hover key={order.id} selected={isSelected}>
                        {/* <TableCell padding="checkbox">
                        <Checkbox
                          checked={isSelected}
                          onChange={(event) => {
                            if (event.target.checked) {
                              onSelectOne?.(order?.id);
                            } else {
                              onDeselectOne?.(order?.id);
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
                            navigate(adminRoute.orderManagementDetails, {
                              state: order.id,
                            })
                          }
                        >
                          <Stack
                            alignItems="center"
                            direction="row"
                            spacing={2}
                          >
                            <Typography variant="subtitle2">
                              {order.id}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell>
                          {formatToFulldatetime(
                            order?.statuses?.slice(-1)[0].createdAt
                          )}
                        </TableCell>
                        <TableCell
                          sx={{
                            cursor: "pointer",
                            ":hover": {
                              color: COLORS.mainColor,
                            },
                          }}
                          onClick={() =>
                            navigate(
                              `/${adminRoute.home}/${adminRoute.customers}/${adminRoute.customersDetails}`,
                              {
                                state: order.user.id,
                              }
                            )
                          }
                        >
                          {order?.user?.fullName}
                        </TableCell>
                        <TableCell>
                          <SeverityPill
                            color={
                              statusColor[order?.statuses[0]?.status?.status]
                            }
                          >
                            {orderStatuses[order?.statuses[0]?.status?.status]}
                          </SeverityPill>
                        </TableCell>
                        {/* <TableCell>{order.method}</TableCell> */}
                        <TableCell>{numberToCurrency(order?.sum)}</TableCell>
                        <TableCell>
                          <Button
                            onClick={() => handleClickOpen(order.id)}
                            sx={{ textTransform: "none" }}
                            startIcon={<ReceiptLongOutlinedIcon />}
                          >
                            Hóa đơn
                          </Button>
                        </TableCell>
                        <TableCell>
                          <Stack direction={"row"} justifyContent={"center"}>
                            {statuses[order?.statuses[0]?.status?.status]?.map(
                              (item) => {
                                return (
                                  <Tooltip title={item.name} key={item.name}>
                                    <IconButton
                                      onClick={() =>
                                        onClickToUpdateStatus(
                                          item.value,
                                          order?.id
                                        )
                                      }
                                    >
                                      {item.icon}
                                    </IconButton>
                                  </Tooltip>
                                );
                              }
                            )}
                          </Stack>
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
          labelRowsPerPage="Số đơn hàng hiển thị"
          component="div"
          count={count}
          onPageChange={onPageChange}
          onRowsPerPageChange={onRowsPerPageChange}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </Card>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
      >
        <DialogContent>
          <Invoice id={id} />
        </DialogContent>
      </Dialog>
    </>
  );
};

OrderManagementTable.propTypes = {
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
  statusId: PropTypes.func,
};

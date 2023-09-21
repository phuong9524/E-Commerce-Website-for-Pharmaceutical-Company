import PropTypes from "prop-types";

import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { COLORS } from "../../utils/Constants";
import { numberToCurrency } from "../../utils/currencyFormat";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import FacebookIcon from "@mui/icons-material/Facebook";
import { useEffect, useState } from "react";
import { getOrderDetails } from "../../api/orderApiService";
import { formatToDate } from "../../utils/FormatTime";
import { shippingFee } from "../../utils/mappingData";

export const Invoice = ({ id }) => {
  const [orderInfo, setOrderInfo] = useState([]);

  useEffect(() => {
    const OrderDetails = async () => {
      const response = await getOrderDetails(id);
      if (response && response.status === 200) {
        setOrderInfo(response?.data);
      }
    };
    OrderDetails();
  }, [id]);

  return (
    <Card sx={{ border: "none", boxShadow: "none" }}>
      <CardHeader
        title="INVOICE"
        titleTypographyProps={{
          textAlign: "right",
          pr: 1,
          color: COLORS.mainColor,
          variant: "h6",
        }}
        avatar={
          <img
            src="https://res.cloudinary.com/dwsae4gmt/image/upload/v1687323197/logo_tek9mx.ico"
            width={80}
          />
        }
      />

      <CardContent sx={{ pt: "0" }}>
        <Stack gap={2}>
          <Divider sx={{ borderBottomWidth: 3 }} />
          <Grid container justifyContent={"space-between"}>
            <Grid
              xs={6}
              sm={6}
              md={6}
              lg={5}
              display={"flex"}
              flexDirection={"column"}
            >
              <Typography variant="body2">Nhà cung cấp:</Typography>
              <Typography pb={2} variant="h7" color={COLORS.mainColor}>
                Dược phẩm Phương Phát
              </Typography>
              <Typography variant="body2">187A Lê Văn Lương</Typography>
              <Typography variant="body2">Phước Kiển Nhà Bè</Typography>
              <Typography variant="body2">TP HCM</Typography>
            </Grid>
            <Grid xs={6} sm={6} md={6} lg={2} />
            <Grid
              xs={6}
              sm={6}
              md={6}
              lg={5}
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"right"}
              alignItems={"right"}
            >
              <Typography variant="body2">Khách hàng:</Typography>
              <Typography pb={2} variant="h7" color={COLORS.mainColor}>
                {orderInfo?.user?.fullName}
              </Typography>
              <Typography variant="body2">{orderInfo?.destination}</Typography>
            </Grid>
          </Grid>
          <Divider sx={{ borderBottomWidth: 2 }} />
          <Grid container display={"flex"} justifyContent={"space-between"}>
            <Grid xs={6} sm={6} md={6} lg={5}>
              <Typography variant="body2">
                Phương thức thanh toán: {orderInfo?.paymentMethod}
              </Typography>
            </Grid>
            <Grid xs={6} sm={6} md={6} lg={2} />
            <Grid
              xs={6}
              sm={6}
              md={6}
              lg={5}
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"right"}
              alignItems={"right"}
            >
              <Typography variant="body2">
                Ngày tạo đơn:{" "}
                {formatToDate(orderInfo?.statuses?.slice(-1)[0].createdAt ?? 0)}
              </Typography>
            </Grid>
            <Grid lg={12}>
              <Typography variant="body2">Mã đơn hàng: {id}</Typography>
            </Grid>
          </Grid>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Tên sản phẩm</TableCell>
                <TableCell>Số lượng</TableCell>
                <TableCell>Thành tiền</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orderInfo?.product?.map((item) => {
                return (
                  <TableRow key={item.id}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell align="right">
                      {numberToCurrency(item.price)}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>

          <Stack spacing={2} pl={2} pr={2}>
            <Box display="flex" justifyContent="space-between">
              <Typography variant="body2">Tạm tính</Typography>
              <Typography variant="body2">
                {numberToCurrency(orderInfo?.sum)}
              </Typography>
            </Box>
            <Box display="flex" justifyContent="space-between">
              <Typography variant="body2">Phí vận chuyển</Typography>
              <Typography variant="body2">
                {numberToCurrency(shippingFee[orderInfo?.description] ?? 0)}
              </Typography>
            </Box>
            <Divider />
            <Box display="flex" justifyContent="space-between">
              <Typography fontWeight="bold" variant="body2">
                Tổng tiền
              </Typography>
              <Typography
                fontWeight="bold"
                color={COLORS.mainColor}
                variant="body2"
              >
                {numberToCurrency(
                  orderInfo?.sum + (shippingFee[orderInfo?.description] ?? 0)
                )}
              </Typography>
            </Box>
          </Stack>

          <Box justifyContent={"center"} display={"flex"}>
            <Typography color={COLORS.mainColor} variant="h6">
              Cám ơn quý khách
            </Typography>
          </Box>
          <Divider>www.duocphamphuongphat.com.vn</Divider>
          <List
            sx={{
              width: "100%",
              bgcolor: "background.paper",
              padding: 0,
              display: "flex",
              gap: 2,
            }}
          >
            <ListItem disableGutters sx={{ padding: 0 }}>
              <ListItemIcon sx={{ minWidth: 30 }}>
                <LocalPhoneIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText
                primary="0913243534"
                primaryTypographyProps={{ variant: "body2" }}
              />
            </ListItem>
            <ListItem disableGutters sx={{ padding: 0 }}>
              <ListItemIcon sx={{ minWidth: 30 }}>
                <MailOutlineIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText
                primary="phuongphat@gmail.com"
                primaryTypographyProps={{ variant: "body2" }}
              />
            </ListItem>
            <ListItem disableGutters sx={{ padding: 0 }}>
              <ListItemIcon sx={{ minWidth: 30 }} s>
                <FacebookIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText
                primary="www.facebook.com/phuongdotdt/"
                primaryTypographyProps={{ variant: "body2" }}
              />
            </ListItem>
          </List>
        </Stack>
      </CardContent>
    </Card>
  );
};

Invoice.propTypes = {
  id: PropTypes.string,
};

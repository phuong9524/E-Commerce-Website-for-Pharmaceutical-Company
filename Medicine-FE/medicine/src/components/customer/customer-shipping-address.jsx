import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
} from "@mui/material";
import { FormInputInfo } from "../shared/FormInputInfo";

export const CustomerShippingAddress = () => {
  return (
    <>
      <Card
        sx={{
          borderRadius: "20px",
          boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
        }}
      >
        <CardHeader
          title="Địa chỉ 1"
          sx={{
            textAlign: "left",
          }}
          titleTypographyProps={{
            fontSize: "15.75px",
            fontWeight: "bold",
          }}
        />
        <Divider />
        <CardContent
          sx={{ textAlign: "left", color: "#677788", fontSize: "14px" }}
        >
          <Typography fontWeight="bold">Người nhận: Nguyễn Văn A</Typography>
          <Typography>SĐT: 0917429189</Typography>
          <Typography>178A Lê Văn Lương</Typography>
          <Typography>Phường Tân Phong, Quận 7, TP HCM</Typography>
        </CardContent>
      </Card>
    </>
  );
};

import PropTypes from "prop-types";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
} from "@mui/material";

import { FormInputInfo } from "../shared/FormInputInfo";
import { COLORS } from "../../utils/Constants";
import { useEffect, useState } from "react";
import { patchModifyInfo } from "../../api/userApiService";
import { toast } from "react-toastify";

export const PersonalAccountBasicInfo = ({ info }) => {
  const [information, setInformation] = useState({
    fullName: "",
    username: "",
    email: "",
    phoneNumber: "",
    address: "",
  });

  useEffect(() => {
    setInformation({
      fullName: info?.fullName,
      username: info?.userName,
      email: info?.email,
      phoneNumber: info?.phoneNumber,
      address: info?.address,
    });
  }, [info]);

  const onClickToChangeInfo = async () => {
    const resposne = await patchModifyInfo({
      id: info.id,
      userName: information.username,
      fullName: information.fullName,
      phoneNumber: information.phoneNumber,
      address: information.address,
    });
    if (resposne && resposne.status === 200) {
      toast.success("Cập nhật thành công");
    }
  };

  return (
    <Card
      sx={{
        borderRadius: "20px",
        boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
      }}
    >
      <CardHeader
        title="Thông tin tài khoản"
        titleTypographyProps={{
          textAlign: "left",
          fontSize: "18px",
          fontWeight: "bold",
        }}
      />
      <Divider />
      <CardContent>
        <FormInputInfo
          label="Họ và tên"
          value={information?.fullName}
          onChange={(event) => {
            setInformation({ ...information, fullName: event.target.value });
          }}
        />
        <FormInputInfo
          label="Tên tài khoản"
          value={information?.username}
          onChange={(event) => {
            setInformation({ ...information, username: event.target.value });
          }}
        />
        <FormInputInfo label="Email" value={information?.email} disabled />
        <FormInputInfo
          label="SĐT"
          value={information?.phoneNumber}
          onChange={(event) => {
            setInformation({ ...information, phoneNumber: event.target.value });
          }}
        />
        <FormInputInfo
          label="Địa chỉ"
          value={information?.address}
          onChange={(event) => {
            setInformation({ ...information, address: event.target.value });
          }}
        />
      </CardContent>
      <CardActions sx={{ justifyContent: "right" }}>
        <Button
          onClick={onClickToChangeInfo}
          variant="contained"
          sx={{
            boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
            borderRadius: "6px",
            backgroundColor: COLORS.background,
            ":hover": {
              backgroundColor: "#0E6637",
            },
          }}
        >
          Lưu thay đổi
        </Button>
      </CardActions>
    </Card>
  );
};

PersonalAccountBasicInfo.propTypes = {
  info: PropTypes.any,
};

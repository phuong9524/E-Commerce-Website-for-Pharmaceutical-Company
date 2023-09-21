import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
} from "@mui/material";

import { COLORS } from "../../utils/Constants";
import { FormInputInfo } from "../shared/FormInputInfo";
import { useSelector } from "react-redux";
import { patchChangePassword } from "../../api/userApiService";
import { useState } from "react";
import { toast } from "react-toastify";

export const PersonalAccountChangePassword = () => {
  const user = useSelector((state) => state.user.user);

  const [type, setType] = useState({
    oldPassword: "password",
    newPassword: "password",
    confirmPassword: "password",
  });

  const [passwordInfo, setPasswordInfo] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [isPasswordMatch, setIsPasswordMatch] = useState(false);
  const [isWrongpPassword, setIsWrongPassword] = useState(false);

  const handleChangePassword = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const response = await patchChangePassword({
      id: user.id,
      oldPassword: data.get("oldPassword"),
      newPassword: data.get("newPassword"),
    });
    if (response && response.status === 200) {
      setIsWrongPassword(false);
      toast.success("Thay đổi mật khẩu thành công");
      setPasswordInfo({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } else {
      setIsWrongPassword(true);
    }
  };

  const comparePassword = (password) => {
    setPasswordInfo({ ...passwordInfo, confirmPassword: password });
    if (password !== passwordInfo.newPassword) {
      setIsPasswordMatch(true);
    } else {
      setIsPasswordMatch(false);
    }
  };

  const isShowOldPassword = (isShowPassword) => {
    setType({ ...type, oldPassword: isShowPassword });
  };
  const isShowNewPassword = (isShowPassword) => {
    setType({ ...type, newPassword: isShowPassword });
  };
  const isShowConfirmPassword = (isShowPassword) => {
    setType({ ...type, confirmPassword: isShowPassword });
  };

  return (
    <Card
      component="form"
      onSubmit={handleChangePassword}
      sx={{
        borderRadius: "20px",
        boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
      }}
    >
      <CardHeader
        title="Đổi mật khẩu"
        titleTypographyProps={{
          textAlign: "left",
          fontSize: "18px",
          fontWeight: "bold",
        }}
      />
      <Divider />
      <CardContent>
        <FormInputInfo
          type={type.oldPassword}
          isIconActive
          isShowPassword={isShowOldPassword}
          value={passwordInfo.oldPassword}
          require
          name="oldPassword"
          label="Mật khẩu hiện tại"
          onChange={(event) =>
            setPasswordInfo({
              ...passwordInfo,
              oldPassword: event.target.value,
            })
          }
          isError={isWrongpPassword}
          errorContent={"Sai mật khẩu. Hãy nhập lại mật khẩu tại đây."}
        />
        <FormInputInfo
          type={type.newPassword}
          isIconActive
          isShowPassword={isShowNewPassword}
          require
          name="newPassword"
          label="Mật khẩu mới"
          value={passwordInfo.newPassword}
          onChange={(event) =>
            setPasswordInfo({
              ...passwordInfo,
              newPassword: event.target.value,
            })
          }
        />
        <FormInputInfo
          type={type.confirmPassword}
          isIconActive
          isShowPassword={isShowConfirmPassword}
          require
          label="Nhập lại mật khẩu mới"
          isError={isPasswordMatch}
          value={passwordInfo.confirmPassword}
          onChange={(event) => comparePassword(event.target.value)}
          errorContent={
            "Mật khẩu mới không khớp. Hãy nhập lại mật khẩu mới tại đây."
          }
        />
      </CardContent>
      <CardActions sx={{ justifyContent: "right" }}>
        <Button
          type="submit"
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

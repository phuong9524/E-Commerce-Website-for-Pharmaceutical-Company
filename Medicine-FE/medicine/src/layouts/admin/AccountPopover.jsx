import {
  Box,
  Divider,
  MenuItem,
  MenuList,
  Popover,
  Typography,
} from "@mui/material";

import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { removeDataUserLogout } from "../../redux/silce/userSlice";
import { useNavigate } from "react-router-dom";
import { auth, userRoute } from "../../routes/routes";
import { mapRoles } from "../../utils/mappingData";

export const AccountPopover = (props) => {
  const user = useSelector((state) => state.user.user);
  console.log(user.role)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { anchorEl, onClose, open } = props;

  const handleSignOut = () => {
    dispatch(removeDataUserLogout());
    navigate("/auth");
  };

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: "left",
        vertical: "bottom",
      }}
      onClose={onClose}
      open={open}
      slotProps={{ sx: { width: 200 } }}
    >
      <Box
        sx={{
          py: 1.5,
          px: 2,
        }}
      >
        <Typography variant="overline">
          {user.role ? "Tài khoản" + " " + mapRoles[user.role] : ""}
        </Typography>
        <Typography color="text.secondary" variant="body2">
          {user.username}
        </Typography>
      </Box>
      <Divider />
      <MenuList
        disablePadding
        dense
        sx={{
          p: "8px",
          "& > *": {
            borderRadius: 1,
          },
        }}
      >
        <MenuItem onClick={() => navigate(auth.account, { id: "test" })}>
          Thông tin tài khoản
        </MenuItem>
        {user.role === "" ? (
          <MenuItem onClick={() => navigate(userRoute.historyOrder)}>
            Đơn hàng của tôi
          </MenuItem>
        ) : (
          <></>
        )}
        <MenuItem onClick={handleSignOut}>Đăng xuất</MenuItem>
      </MenuList>
    </Popover>
  );
};

AccountPopover.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
};

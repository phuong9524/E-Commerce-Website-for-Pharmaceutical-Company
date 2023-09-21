import {
  Box,
  Divider,
  Drawer,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { NavLink, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

import { ScrollBar } from "../../components/shared/ScrollBar";
import { Items } from "./Config";
import { SideNavItem } from "./SideNavItem";
import { COLORS } from "../../utils/Constants";
import { useSelector } from "react-redux";

export const SideNav = (props) => {
  const user = useSelector((state) => state.user.user);
  console.log(user.role)
  const filterItem = Items.filter((item) => item.roles.includes(user.role));
  const theme = useTheme();
  const { open, onClose } = props;
  const location = useLocation();
  const lgUp = useMediaQuery(theme.breakpoints.up("lg"));

  const content = (
    <ScrollBar
      sx={{
        height: "100%",
        "& .simplebar-content": {
          height: "100%",
        },
        "& .simplebar-scrollbar:before": {
          background: "neutral.400",
        },
        backgroundColor: COLORS.background,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <Box sx={{ p: 3 }}>
          <Box
            component={NavLink}
            to="/admin"
            sx={{
              display: "inline-flex",
              height: 64,
              width: 80,
            }}
          >
            <img src="https://res.cloudinary.com/dwsae4gmt/image/upload/v1687323197/logo_tek9mx.ico" />
          </Box>
          <Box
            sx={{
              alignItems: "center",
              backgroundColor: "rgb(255, 255, 255, 0.04)",
              borderRadius: 1,
              cursor: "pointer",
              display: "flex",
              justifyContent: "space-between",
              mt: 2,
              p: "12px",
            }}
          >
            <div>
              <Typography color="inherit" variant="subtitle1">
                Dược phẩm Phương Phát
              </Typography>
              <Typography color="neutral.400" variant="body1">
                Trang quản lý
              </Typography>
            </div>
          </Box>
        </Box>
        <Divider sx={{ borderColor: "neutral.700" }} />
        <Box
          component="nav"
          sx={{
            flexGrow: 1,
            px: 2,
            py: 3,
          }}
        >
          <Stack
            component="ul"
            spacing={0.5}
            sx={{
              listStyle: "none",
              p: 0,
              m: 0,
            }}
          >
            {filterItem?.map((item) => {
              const active = item.path
                ? location.pathname === item.path
                : false;

              return (
                <SideNavItem
                  active={active}
                  disabled={item.disabled}
                  external={item.external}
                  icon={item.icon}
                  key={item.title}
                  path={item.path}
                  title={item.title}
                />
              );
            })}
          </Stack>
        </Box>
        {/* <Divider sx={{ borderColor: "neutral.700" }} />
        <Box sx={{px: 2, py: 3}}>
            <Typography color="neutral.100" variant="subtitle2">
                ssss
            </Typography>
        </Box> */}
      </Box>
    </ScrollBar>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: "neutral.800",
            color: "common.white",
            width: 280,
          },
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: "neutral.800",
          color: "common.white",
          width: 280,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

SideNav.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};

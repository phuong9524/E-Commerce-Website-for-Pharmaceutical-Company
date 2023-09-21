import { useState, useCallback, useEffect } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Badge,
  ThemeProvider,
  Button,
  Drawer,
  Avatar,
  Fade,
} from "@mui/material";
import { useSelector } from "react-redux";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { useNavigate } from "react-router-dom";

import "./../Layout.scss";
import { underlineButton } from "../../styles/Button";
import SideBar from "./SideBar";
import { colorTheme } from "../../styles/Theme";
import { userRoute } from "../../routes/routes";
import { getCartItems } from "../../api/cartApiService";
import { getInitials } from "../../utils/GetInitials";
import { AccountPopover } from "../admin/AccountPopover";
import { usePopover } from "../../hooks/UsePopover";
import { green } from "@mui/material/colors";
import { getInfoUser } from "../../api/userApiService";

const pages = [
  { name: "Trang chủ", link: "/" },
  { name: "Giới thiệu", link: userRoute.introduction },
  { name: "Sản phẩm", link: userRoute.product },
  // { name: "Điểm bán", link: userRoute.store },
  { name: "Tin tức sự kiện", link: userRoute.news },
];

const Header = () => {
  const itemLength = useSelector((state) => state.cart.isChange);
  const user = useSelector((state) => state.user.user);
  const [items, setItems] = useState(0);
  const [showMenu, setShowMenu] = useState(false);
  const [showSideBar, setShowSideBar] = useState(false);
  const navigate = useNavigate();
  const accountPopover = usePopover();

  const [avatar, setAvatar] = useState();
  useEffect(() => {
    const fetchInfo = async () => {
      const response = await getInfoUser({ id: user.id });
      if (response && response.status === 200) {
        setAvatar(response.data.avatar);
      }
    };
    fetchInfo();
  });

  useEffect(() => {
    showCartItemQuantity();
  }, [itemLength]);

  const showCartItemQuantity = async () => {
    const response = await getCartItems();
    if (response && response.status === 200) {
      setItems(response.data.totalCount);
    } else {
      console.log(response);
    }
  };

  function notificationsLabel(count) {
    if (count === 0) {
      return "no notifications";
    }
    if (count > 99) {
      return "more than 99 notifications";
    }
    return `${count} notifications`;
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        component={"nav"}
        // position={"sticky"}
        // className="app-bar"
        // elevation={useScrollTrigger() ? 24 : 0}
        style={{
          backgroundColor: "#17B554",
          fill: "#ffffff",
          color: "#ffffff",
          // position: useScrollTrigger() ? "fixed" : "",
        }}
      >
        {/* <Collapse in={showMenu} collapsedSize={65}> */}
        <Toolbar>
          <img
            src="https://res.cloudinary.com/dwsae4gmt/image/upload/v1687323197/logo_tek9mx.ico"
            width={60}
            height={60}
          />

          <Box
            sx={{
              display: { flexGrow: 1 },
            }}
          >
            {pages.map((item) => (
              <Button
                variant="underline"
                sx={underlineButton}
                key={item.name}
                onClick={() => navigate(item.link)}
              >
                {/* <Fade in={showMenu} timeout={1000}> */}
                <p>{item.name}</p>
                {/* </Fade> */}
              </Button>
            ))}
          </Box>
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton aria-label={notificationsLabel(100)} color="inherit">
              <ThemeProvider theme={colorTheme}>
                <Badge badgeContent={0} overlap="circular" color="error">
                  <NotificationsNoneOutlinedIcon />
                </Badge>
              </ThemeProvider>
            </IconButton>

            <IconButton
              aria-label={notificationsLabel(100)}
              onClick={() => navigate(userRoute.cart)}
              color="inherit"
            >
              <ThemeProvider theme={colorTheme}>
                <Badge badgeContent={items} overlap="circular" color="error">
                  <ShoppingCartOutlinedIcon />
                </Badge>
              </ThemeProvider>
            </IconButton>
            {user.username === "" ? (
              <IconButton onClick={() => navigate("auth")} color="inherit">
                <AccountCircleOutlinedIcon />
              </IconButton>
            ) : (
              <IconButton>
                <Avatar
                  onClick={accountPopover.handleOpen}
                  ref={accountPopover.anchorRef}
                  sx={{
                    cursor: "pointer",
                    width: 32,
                    height: 32,
                    bgcolor: green[300],
                  }}
                  src={avatar}
                >
                  {getInitials(user.username)}
                </Avatar>
              </IconButton>
            )}
          </Box>

          <AccountPopover
            anchorEl={accountPopover.anchorRef.current}
            open={accountPopover.open}
            onClose={accountPopover.handleClose}
          />
        </Toolbar>

        {/* </Collapse> */}
      </AppBar>
      {/* <ClickAwayListener
        mouseEvent="onMouseDown"
        touchEvent="onTouchStart"
        onClickAway={() => showSideBar && handleClickAway()}
      > */}
      <Drawer
        anchor="right"
        open={showSideBar}
        variant="persistent"
        onClose={(_, reason) => reason === "backdropClick"}
        transitionDuration={450}
        sx={{
          "& .MuiDrawer-paper": {
            borderWidth: 0,
          },
        }}
      >
        <SideBar />
      </Drawer>
      {/* </ClickAwayListener> */}
    </Box>
  );
};

export default Header;

import {
  Box,
  Button,
  Container,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import Link from "@mui/material/Link";
import { Facebook, Instagram, Twitter } from "@mui/icons-material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { COLORS } from "../../utils/Constants";
import { userRoute } from "../../routes/routes";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProductCategories } from "../../api/categoryApiService";

const pages = [
  { name: "Trang chủ", link: "/" },
  { name: "Giới thiệu", link: userRoute.introduction },
  { name: "Sản phẩm", link: userRoute.product },
  // { name: "Điểm bán", link: userRoute.store },
  { name: "Tin tức sự kiện", link: userRoute.news },
];

const Footer = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchCategory = async () => {
      const response = await getProductCategories();
      if (response && response.status === 200) {
        setCategories(response.data);
      }
    };
    fetchCategory();
  }, []);

  return (
    <>
      <Box
        component="footer"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[200]
              : theme.palette.grey[800],
          p: 5,
          backgroundImage:
            "url('https://res.cloudinary.com/dwsae4gmt/image/upload/v1694080663/Dark-Wood-Seamless-Background-Texture-15-copy_aoazoo.webp')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundBlendMode: "hard-light",
          color: "white",
        }}
      >
        <Container>
          <Stack gap={2}>
            <Grid container textAlign={"left"}>
              <Grid xs={5} sm={4} md={4} lg={3}>
                <Typography variant="h5" pb={2} d>
                  Về Phương Phát
                </Typography>
                <Stack gap={2} textAlign={"left"}>
                  {pages?.map((item) => (
                    <Typography
                      variant="underline"
                      key={item.name}
                      onClick={() => navigate(item.link)}
                      sx={{ cursor: "pointer" }}
                    >
                      {item.name}
                    </Typography>
                  ))}
                </Stack>
              </Grid>
              <Grid xs={5} sm={4} md={4} lg={3}>
                <Typography variant="h6" fontWeight={"bold"} pb={2}>
                  DANH MỤC
                </Typography>
                <Stack gap={2} textAlign={"left"}>
                  {categories?.map((item) => (
                    <Typography
                      variant="underline"
                      key={item.name}
                      onClick={() => navigate(item.link)}
                      sx={{ cursor: "pointer" }}
                    >
                      {item.name}
                    </Typography>
                  ))}
                </Stack>
              </Grid>
              <Grid xs={12} sm={3} md={3} lg={3}>
                <Typography variant="h6" fontWeight={"bold"} pb={2}>
                  LIÊN HỆ
                </Typography>
                <Stack gap={2}>
                  <Typography variant="underline">
                    Địa chỉ: 187A Lê Văn Lương, Phước Kiển, Nhà Bè, Thành phố Hồ
                    Chí Minh
                  </Typography>
                  <Typography variant="body2">
                    Email: duocphamphuongphat@gmail.com
                  </Typography>
                  <Typography variant="body2">
                    Điện thoại: +84 0917429189
                  </Typography>
                </Stack>
              </Grid>
              <Grid xs={12} sm={4} md={12} lg={3}>
                <Typography variant="h6" fontWeight={"bold"} pb={2}>
                  THEO DÕI CHÚNG TÔI
                </Typography>
                <Stack gap={2} direction={"column"}>
                  <Link
                    href="https://www.facebook.com/"
                    color="inherit"
                    alignItems={"center"}
                    display={"flex"}
                  >
                    <Facebook /> <Box pl={1}>Facebook</Box>
                  </Link>
                  <Link
                    href="https://www.instagram.com/"
                    color="inherit"
                    alignItems={"center"}
                    display={"flex"}
                  >
                    <Instagram /> <Box pl={1}>instagram</Box>
                  </Link>
                  <Link
                    href="https://www.twitter.com/"
                    color="inherit"
                    alignItems={"center"}
                    display={"flex"}
                  >
                    <Twitter /> <Box pl={1}>Twitter</Box>
                  </Link>
                </Stack>
              </Grid>
            </Grid>
            <Divider sx={{ bgcolor: "white" }} />
            <Stack
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              flexDirection={"row"}
            >
              <Typography variant="body3" align="center" color={"white"}>
                {"Copyright © "}
                Công ty Dược phẩm Phương Phát {new Date().getFullYear()}
                {"."}
              </Typography>
            </Stack>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default Footer;

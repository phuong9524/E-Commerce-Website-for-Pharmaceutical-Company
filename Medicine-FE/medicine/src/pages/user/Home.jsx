import { Typography, Container, Button } from "@mui/material";

import CustomCarousel from "../../components/shared/Carousel";
import CustomCardItem from "../../components/shared/CardItem";
import CustomNewsCard from "../../components/shared/NewsCard";
import { useEffect, useState } from "react";
import { getListProducts } from "../../api/productApiService";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { getNewsfeed } from "../../api/newsfeedApiService";

const Home = () => {
  let items = [
    {
      image:
        "https://res.cloudinary.com/dwsae4gmt/image/upload/v1687323175/background_zg830m.png",
    },
  ];
  const [productList, setProductList] = useState([]);
  const [newsList, setNewsList] = useState();

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await getListProducts({
        pageIndex: 1,
        pageSize: 6,
        keyword: "",
        type: "",
        sort: 1,
      });
      if (response && response.status === 200) {
        setProductList(response?.data.items);
      }
    };
    fetchProducts();

    const Newsfeed = async () => {
      const response = await getNewsfeed({
        keyword: "",
        pageIndex: 1,
        pageSize: 3,
      });
      if (response && response.status === 200) {
        setNewsList(response.data.items);
      }
    };
    Newsfeed();
  }, []);

  return (
    <Grid container spacing={3}>
      <Grid xs={12} sm={12} md={12} lg={12}>
        <CustomCarousel {...items} />
      </Grid>

      <Container maxWidth="xl">
        <Grid xs={12} sm={12} md={12} lg={12}>
          <Typography
            sx={{ fontWeight: "bold" }}
            variant="h4"
            gutterBottom
            align="left"
          >
            Sản Phẩm Bán Chạy
          </Typography>
          <Grid container spacing={2}>
            <CustomCardItem item={productList} />
          </Grid>
        </Grid>

        <Grid xs={12} sm={12} md={12} lg={12}>
          <Typography
            sx={{ fontWeight: "bold" }}
            variant="h4"
            gutterBottom
            align="left"
          >
            Tin mới nhất
          </Typography>
          <CustomNewsCard items={newsList} />
        </Grid>
        <Grid xs={12} sm={12} md={12} lg={12}></Grid>
      </Container>
    </Grid>
  );
};

export default Home;

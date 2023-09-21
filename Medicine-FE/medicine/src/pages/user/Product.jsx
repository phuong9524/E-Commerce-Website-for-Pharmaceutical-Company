import { Container, Typography } from "@mui/material";
import SidebarCategory from "../../components/product/SidebarCategory";
import ProductListView from "../../components/product/ProductListView";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { useState } from "react";

const Product = () => {
  const [filterData, setFilterData] = useState({
    type: "",
    sort: 0,
  });

  const type = (type) => {
    setFilterData({ ...filterData, type: type });
  };

  const sort = (sort) => {
    setFilterData({ ...filterData, sort: sort });
  };

  return (
    <Container maxWidth="xl">
      <Grid container spacing={3}>
        <Grid xs={12} sm={12} md={12} lg={12}>
          <Typography
            sx={{ fontWeight: "bold", marginBottom: "5rem" }}
            variant="h4"
            gutterBottom
            align="center"
            pt={3}
          >
            Danh mục sản phẩm
          </Typography>
        </Grid>

        <Grid xs={12} sm={5} md={3} lg={3}>
          <SidebarCategory type={type} sort={sort} />
        </Grid>
        <Grid xs={12} sm md lg>
          <ProductListView type={filterData.type} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Product;

import { useLocation } from "react-router-dom";
import ImageSlider from "../../components/productDetails/ImageSlider";
import { Box, Container, Paper, styled } from "@mui/material";
import Details from "../../components/productDetails/Details";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import ProductInformation from "../../components/productDetails/ProductInformation";
import ProductReviews from "../../components/productDetails/ProductReviews";
import { getProductDetails } from "../../api/productApiService";
import { useEffect, useState } from "react";
import { getAveragePoint, getComment } from "../../api/commentApiService";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
  borderRadius: 3,
}));

const ProductDetails = () => {
  const [productDetails, setProductDetails] = useState([]);
  const location = useLocation();
  const [page, setPage] = useState(0);
  const [listReview, setListReview] = useState([]);
  const [avgPoint, setAvgPoint] = useState(0);

  const handleChangePage = (_event, newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    const fetchProductDetails = async () => {
      const response = await getProductDetails(location.state["id"]);
      if (response && response.status === 200) {
        setProductDetails(response?.data);
      }
    };
    fetchProductDetails();

    const fetchReview = async () => {
      const reviewResponse = await getComment({
        productId: location.state["id"],
        pageIndex: page + 1,
        pageSize: 10,
      });
      if (reviewResponse && reviewResponse.status === 200) {
        setListReview(reviewResponse.data);
      }
    };
    fetchReview();

    const fetchAveragePoint = async () => {
      const avgResponse = await getAveragePoint({
        productId: location.state["id"],
      });
      if (avgResponse && avgResponse.status === 200) {
        setAvgPoint(avgResponse.data);
      }
    };
    fetchAveragePoint();
  }, []);

  return (
    <Box component="main" sx={{ flexGrow: 1, py: 8 }}>
      <Container>
        <Grid container spacing={2} marginTop={2}>
          <Grid xs={12} md={4}>
            <Item>
              <ImageSlider images={productDetails.images} />
            </Item>
          </Grid>
          <Grid xs={12} md={8} justifyContent="left">
            <Details details={productDetails} avgPoint={avgPoint} />
          </Grid>
          <Grid xs={12} md={12}>
            <Item>
              <ProductInformation info={productDetails} />
            </Item>
          </Grid>
          <Grid xs={12} md={12}>
            <Item>
              <ProductReviews
                page={page}
                reviews={listReview?.items}
                count={listReview.totalPages}
                onPageChange={handleChangePage}
                avgPoint={avgPoint}
              />
            </Item>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ProductDetails;

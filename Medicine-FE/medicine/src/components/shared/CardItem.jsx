import {
  Typography,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Box,
  Rating,
  CardActionArea,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

import { buyButton } from "../../styles/Button";
import { COLORS } from "../../utils/Constants";
import { useNavigate } from "react-router-dom";
import { userRoute } from "../../routes/routes";
import { postAddtoCart } from "../../api/cartApiService";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/silce/cartSlice";
import { numberToCurrency } from "../../utils/currencyFormat";

const CustomCardItem = (props) => {
  const { item = [] } = props;
  const naviagte = useNavigate();
  const dispatch = useDispatch();

  const onClickItem = (event) => {
    naviagte(`/${userRoute.productDetails}`, { state: { id: event } });
  };

  const addItem = async (id) => {
    const response = await postAddtoCart({ productId: id, quantity: 1 });
    if (response && response.status === 201) {
      dispatch(addToCart());
    }
  };

  return item.map((product) => (
    <Grid xs={12} sm={6} md={6} lg={4} key={product.id}>
      <Card
        sx={{
          boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
          borderRadius: 3,
          ":hover": {
            border: `solid 2px ${COLORS.mainColor}`,
            boxShadow: "none",
            cursor: "pointer",
          },
        }}
      >
        <CardActionArea
          disableRipple={true}
          onClick={() => onClickItem(product.id)}
        >
          <CardHeader sx={{ textAlign: "left", color: "red" }} />
          <CardMedia
            component="img"
            sx={{ height: 200 }}
            image={product.images[0]}
          />
          <CardContent>
            <Typography
              gutterBottom
              sx={{
                fontSize: 16,
                fontWeight: "bold",
                display: "-webkit-box",
                WebkitLineClamp: "1",
                WebkitBoxOrient: "vertical",
              }}
              textOverflow="ellipsis"
              overflow="hidden"
            >
              {product.name}
            </Typography>
            {/* <Typography
              gutterBottom
              variant="h6"
              color="#B4BCC8"
              sx={{ textDecoration: "line-through" }}
            >
              60.000 đ{item.discount}
            </Typography> */}
            <Typography gutterBottom variant="h6" color={COLORS.mainColor}>
              {numberToCurrency(product.price)}
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
              gap={1}
            >
              <Rating value={4.5} readOnly precision={0.5} />

              <Typography paddingTop={0.3}>Đã bán 1000</Typography>
            </Box>
          </CardContent>
        </CardActionArea>
        <CardActions sx={{ justifyContent: "center" }}>
          <Button sx={buyButton} onClick={() => addItem(product.id)}>
            Thêm vào giỏ
          </Button>
        </CardActions>
      </Card>
    </Grid>
  ));
};

export default CustomCardItem;

import PropTypes from "prop-types";
import {
  Box,
  Rating,
  Typography,
  Divider,
  Button,
  ButtonGroup,
} from "@mui/material";

import AddShoppingCartSharpIcon from "@mui/icons-material/AddShoppingCartSharp";
import AddBusinessOutlinedIcon from "@mui/icons-material/AddBusinessOutlined";
import { COLORS } from "../../utils/Constants";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { addToCartButton, buyButton } from "../../styles/Button";
import { numberToCurrency } from "../../utils/currencyFormat";
import { postAddtoCart } from "../../api/cartApiService";
import { addToCart } from "../../redux/silce/cartSlice";
import { useDispatch } from "react-redux";

const Details = (props) => {
  const { details = [], avgPoint = 0 } = props;
  const dispatch = useDispatch();
  const [itemQuantity, setItemQuantity] = useState(1);
  const [limitQuantity, setLimitQuantity] = useState(false);

  const handleIncrement = () => {
    setItemQuantity(itemQuantity + 1);
    setLimitQuantity(false);
  };

  const handleDecrement = () => {
    itemQuantity < 2
      ? setLimitQuantity(true)
      : setItemQuantity(itemQuantity - 1);
  };

  const addItem = async () => {
    const response = await postAddtoCart({
      productId: details.id,
      quantity: itemQuantity,
    });
    if (response && response.status === 201) {
      dispatch(addToCart());
    }
  };

  return (
    <Box display="flex" flexDirection="column" textAlign="left" mx={3}>
      <Typography sx={{ fontWeight: "bold" }} variant="h6">
        {details.name}
      </Typography>

      <Box display="flex" my={1} gap="0.5rem">
        <Typography display="flex" justifyContent="center" alignItems="center">
          {avgPoint}
        </Typography>
        <Rating precision={0.1} readOnly value={avgPoint} />
        <Divider orientation="vertical" flexItem />
        <Typography>245</Typography>
        <Typography>Đánh giá</Typography>
        <Divider orientation="vertical" flexItem />
        <Typography>245</Typography>
        <Typography>Đã bán</Typography>
      </Box>

      <Typography
        my={2}
        marginBottom={2}
        fontSize={30}
        fontWeight="bold"
        sx={{ color: COLORS.mainColor }}
      >
        {numberToCurrency(details.price)}
      </Typography>

      <Box display="flex" gap={1} marginBottom={1}>
        <Button
          disableRipple
          color="success"
          sx={{ justifyContent: "left", width: "37%" }}
        >
          <AddBusinessOutlinedIcon color="success" fontSize="small" />{" "}
          <Typography fontSize={12} color="success">
            Xem các nhà thuốc còn hàng
          </Typography>
        </Button>
      </Box>

      <ButtonGroup size="small" aria-label="small outlined button group">
        <Button
          onClick={handleDecrement}
          disabled={limitQuantity}
          disableRipple
        >
          <RemoveIcon />
        </Button>
        <Button disabled sx={{ width: "50px" }}>
          <Typography color="black">{itemQuantity}</Typography>
        </Button>
        <Button onClick={handleIncrement} disableRipple>
          <AddIcon />
        </Button>
      </ButtonGroup>

      <Box display="flex" gap={2} marginTop={2}>
        <Button
          sx={addToCartButton}
          startIcon={<AddShoppingCartSharpIcon />}
          onClick={addItem}
        >
          Thêm vào giỏ hàng
        </Button>
        <Button sx={buyButton}>Mua Ngay</Button>
      </Box>
    </Box>
  );
};

export default Details;

Details.propTypes = {
  details: PropTypes.any,
  avgPoint: PropTypes.number,
};

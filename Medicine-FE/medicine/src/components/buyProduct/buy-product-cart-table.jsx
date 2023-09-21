import PropTypes from "prop-types";
import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Checkbox,
  Stack,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  ThemeProvider,
  Typography,
} from "@mui/material";
import TrashIcon from "@heroicons/react/24/solid/TrashIcon";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { ScrollBar } from "../shared/ScrollBar";
import { getInitials } from "../../utils/GetInitials";
import { buttonSelectedTheme } from "../../styles/Theme";
import { COLORS } from "../../utils/Constants";
import { userRoute } from "../../routes/routes";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  deleteCart,
  getCartItems,
  postModifyCart,
} from "../../api/cartApiService";
import { numberToCurrency } from "../../utils/currencyFormat";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/silce/cartSlice";

export const BuyProductCartTable = (props) => {
  const {
    items = [],
    onDeselectAll,
    onDeselectOne,
    onSelectAll,
    onSelectOne,
    selected = [],
  } = props;

  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [cartItems, setcartItems] = useState([]);

  const modifyQuantity = async (productId, quantity, id) => {
    const response = await postModifyCart({ productId, quantity, id });
    if (response.status === 200) {
      console.log("chinh sua thanh cong");
    }
  };

  const fetchCartItems = async () => {
    const response = await getCartItems();
    if (response && response.status === 200) {
      setcartItems(response?.data.items);
      items(response?.data.items);
    }
  };

  const selectedSome = selected.length > 0 && selected.length < items.length;
  const selectedAll =
    cartItems.length > 0 && selected.length === cartItems.length;

  const handleIncrement = async (productId, id, quantity) => {
    await modifyQuantity(productId, quantity + 1, id);
    fetchCartItems();
  };

  const handleDecrement = async (productId, id, quantity) => {
    if (quantity === 1) {
      deleteItem();
      fetchCartItems();
    } else {
      await modifyQuantity(productId, quantity - 1, id);
      fetchCartItems();
    }
  };

  const deleteItem = async (id) => {
    const response = await deleteCart({ cartId: id });
    console.log(response);
    if (response.status === 204) {
      fetchCartItems();
      dispatch(addToCart());
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  return (
    <ScrollBar>
      <Box sx={{ minWidth: 800 }}>
        <ThemeProvider theme={buttonSelectedTheme}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedAll}
                    indeterminate={selectedSome}
                    onChange={(event) => {
                      if (event.target.checked) {
                        onSelectAll?.();
                      } else {
                        onDeselectAll?.();
                      }
                    }}
                  />
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Chọn tất cả</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Đơn giá</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Số lượng</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Thành tiền</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cartItems?.map((item) => {
                const isSelected = selected.includes(item.productId);

                return (
                  <TableRow hover key={item.productId} selected={isSelected}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onChange={(event) => {
                          if (event.target.checked) {
                            onSelectOne?.(item.productId);
                          } else {
                            onDeselectOne?.(item.productId);
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell
                      sx={{
                        cursor: "pointer",
                        ":hover": {
                          color: COLORS.mainColor,
                        },
                      }}
                      onClick={() =>
                        navigate(`/${userRoute.productDetails}`, {
                          state: { id: item.productId },
                        })
                      }
                    >
                      <Stack alignItems="center" direction="row" spacing={2}>
                        <Avatar src={item.images["0"]}>
                          {getInitials(item?.productName)}
                        </Avatar>
                        <Typography variant="subtitle2">
                          {item?.productName}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Typography>{numberToCurrency(item?.price)}</Typography>
                    </TableCell>
                    <TableCell>
                      <ButtonGroup
                        size="small"
                        aria-label="small outlined button group"
                      >
                        <Button
                          onClick={() =>
                            handleDecrement(
                              item.productId,
                              item.id,
                              item.quantity
                            )
                          }
                          disableRipple
                        >
                          <RemoveIcon />
                        </Button>
                        <Button disabled sx={{ width: "50px" }}>
                          <Typography color="black">
                            {item?.quantity}
                          </Typography>
                        </Button>
                        <Button
                          onClick={() =>
                            handleIncrement(
                              item.productId,
                              item.id,
                              item.quantity
                            )
                          }
                          disableRipple
                        >
                          <AddIcon />
                        </Button>
                      </ButtonGroup>
                    </TableCell>
                    <TableCell>
                      <Typography color={COLORS.mainColor}>
                        {numberToCurrency(item?.price)}
                      </Typography>{" "}
                    </TableCell>
                    <TableCell>
                      <Button
                        sx={{ textTransform: "none" }}
                        onClick={() => deleteItem(item.id)}
                        startIcon={
                          <SvgIcon>
                            <TrashIcon />
                          </SvgIcon>
                        }
                      ></Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </ThemeProvider>
      </Box>
    </ScrollBar>
  );
};

BuyProductCartTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.func,
  onDeselectAll: PropTypes.func,
  onDeselectOne: PropTypes.func,
  onSelectAll: PropTypes.func,
  onSelectOne: PropTypes.func,
  selected: PropTypes.array,
};

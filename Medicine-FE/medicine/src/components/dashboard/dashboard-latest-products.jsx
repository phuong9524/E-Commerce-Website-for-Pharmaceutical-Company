import { formatDistanceToNow } from "date-fns";
import PropTypes from "prop-types";
import ArrowRightIcon from "@heroicons/react/24/solid/ArrowRightIcon";
import EllipsisVerticalIcon from "@heroicons/react/24/solid/EllipsisVerticalIcon";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  SvgIcon,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { adminRoute } from "../../routes/routes";
import { useEffect, useState } from "react";
import { getListProducts } from "../../api/productApiService";

export const DashboardLatestProducts = (props) => {
  const [latesttProduct, setlatestProducts] = useState([]);
  const navigate = useNavigate();
  const { sx } = props;
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await getListProducts({
        pageIndex: 1,
        pageSize: 5,
        keyword: "",
        type: "",
        sort: 1,
      });
      if (response && response.status === 200) {
        setlatestProducts(response?.data.items);
      }
    };
    fetchProducts();
  }, []);

  return (
    <Card sx={sx}>
      <CardHeader
        sx={{ textAlign: "left" }}
        titleTypographyProps={{ fontWeight: "bold" }}
        title="Sản Phẩm Mới Nhất"
      />
      <List>
        {latesttProduct.map((product, index) => {
          const hasDivider = index < latesttProduct.length - 1;
          // const ago = formatDistanceToNow(product?.updatedAt ?? 0);
          const ago = "2 tiếng";

          return (
            <ListItem divider={hasDivider} key={product.id}>
              <ListItemAvatar>
                {product.images ? (
                  <Box
                    component="img"
                    src={product.images[0]}
                    sx={{
                      borderRadius: 1,
                      height: 48,
                      width: 48,
                    }}
                  />
                ) : (
                  <Box
                    sx={{
                      borderRadius: 1,
                      backgroundColor: "neutral.200",
                      height: 48,
                      width: 48,
                    }}
                  />
                )}
              </ListItemAvatar>
              <ListItemText
                primary={product.name}
                primaryTypographyProps={{ variant: "subtitle1" }}
                secondary={`Cập nhật ${ago} trước`}
                secondaryTypographyProps={{ variant: "body2" }}
              />
              <IconButton edge="end">
                <SvgIcon>
                  <EllipsisVerticalIcon />
                </SvgIcon>
              </IconButton>
            </ListItem>
          );
        })}
      </List>
      <Divider />
      <CardActions sx={{ justifyContent: "flex-end" }}>
        <Button
          color="inherit"
          endIcon={
            <SvgIcon fontSize="small">
              <ArrowRightIcon />
            </SvgIcon>
          }
          size="small"
          variant="text"
          sx={{ textTransform: "none" }}
          onClick={() => navigate(adminRoute.productManagement)}
        >
          <Typography fontSize="small" fontWeight="bold">
            Xem thêm
          </Typography>
        </Button>
      </CardActions>
    </Card>
  );
};

DashboardLatestProducts.propTypes = {
  products: PropTypes.array,
  sx: PropTypes.object,
};

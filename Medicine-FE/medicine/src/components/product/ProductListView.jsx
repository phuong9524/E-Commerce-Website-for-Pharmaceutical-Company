import {
  Box,
  Pagination,
  Stack,
  ThemeProvider,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  createTheme,
} from "@mui/material";
import CustomCardItem from "../shared/CardItem";
import { useEffect, useState } from "react";
import { COLORS } from "../../utils/Constants";
import { buttonSelectedTheme } from "../../styles/Theme";
import { getListProducts } from "../../api/productApiService";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { CustomersSearch } from "../customer/customers-search";

const theme = createTheme({
  status: {
    danger: COLORS.mainColor,
  },
});

const ProductListView = (props) => {
  const { type, sort } = props;
  const [page, setPage] = useState(1);

  const [keyword, setKeyword] = useState("");
  const [productList, setProductList] = useState([]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const searchKeys = (searchKeys) => {
    setKeyword(searchKeys);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await getListProducts({
        pageIndex: page,
        pageSize: 9,
        keyword,
        type: type ?? "",
        sort: 1,
      });
      if (response && response.status === 200) {
        setProductList(response?.data);
      }
    };
    fetchProducts();
  }, [keyword, page, sort, type]);

  return (
    <Stack gap={2}>
      <ThemeProvider theme={buttonSelectedTheme}>
        <Box display="flex" justifyContent="space-between">
          <CustomersSearch
            placeholder={"Tìm kiếm tên sản phẩm"}
            searchKeys={searchKeys}
          />

          <Typography justifyContent="left" alignItems="center" display="flex">
            Tìm thấy {productList.totalCount} sản phẩm
          </Typography>
        </Box>
      </ThemeProvider>
      <Grid container spacing={2}>
        <CustomCardItem item={productList.items} />
      </Grid>

      <Box my={4} display="flex" justifyContent="center">
        <Pagination
          onChange={handlePageChange}
          count={productList.totalPages}
          variant="outlined"
          shape="rounded"
          sx={{ alignItems: "center" }}
        />
      </Box>
    </Stack>
  );
};

export default ProductListView;

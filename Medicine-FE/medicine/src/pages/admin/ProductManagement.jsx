import TrashIcon from "@heroicons/react/24/solid/TrashIcon";
import ArrowUpOnSquareIcon from "@heroicons/react/24/solid/ArrowUpOnSquareIcon";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSelection } from "../../hooks/UseSelection";
import {
  Box,
  Button,
  Container,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import { CustomersSearch } from "../../components/customer/customers-search";
import { COLORS } from "../../utils/Constants";
import { normalText } from "../../utils/normalText";
import { ProductManagementTable } from "../../components/productManagement/product-management-table";
import { useNavigate } from "react-router-dom";
import { adminRoute } from "../../routes/routes";
import { deleteProduct, getListProducts } from "../../api/productApiService";

const ProductManagement = () => {
  const [listProducts, setListProducts] = useState([]);
  const [data, setData] = useState();
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowperPage] = useState(10);

  const fetchProducts = async () => {
    const response = await getListProducts({
      pageIndex: page + 1,
      pageSize: rowsPerPage,
      keyword: keyword,
      type: "",
      sort: 1,
    });

    if (response && response.status === 200) {
      setListProducts(response?.data.items);
      setData(response?.data);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page, rowsPerPage, keyword]);

  const navigate = useNavigate();

  const handleAddProduct = () => {
    navigate(adminRoute.productCreation);
  };

  const searchKeys = (searchKeys) => {
    setKeyword(searchKeys);
  };

  const useProductsIds = (products) => {
    return useMemo(() => {
      return products.map((product) => product.id);
    }, [products]);
  };

  const productsIds = useProductsIds(listProducts);
  const productSelection = useSelection(productsIds);

  const handlePageChange = useCallback((event, page) => {
    setPage(page);
  }, []);

  const handleRowPerPageChange = useCallback((event) => {
    setRowperPage(event.target.value);
  }, []);

  const deleteProductById = async (id) => {
    await deleteProduct(id);
  };

  const onClickToDeleteProduct = (productId) => {
    productId.map((item) => {
      deleteProductById(item);
    });
  };
  return (
    <>
      <Box component="main" sx={{ flexGrow: 1, py: 8 }}>
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Stack direction="row" spacing={2}>
                  <Typography variant="h5" fontWeight="bold">
                    Sản phẩm
                  </Typography>
                  <Button
                    sx={{ backgroundColor: "#E7E8EC", borderRadius: "8px" }}
                    disabled
                  >
                    <Typography fontSize="16px" fontWeight="bold" color="black">
                      50,000
                    </Typography>
                  </Button>
                </Stack>

                <Stack alignItems="center" direction="row" spacing={1}>
                  <Button
                    color="inherit"
                    startIcon={
                      <SvgIcon fontSize="small">
                        <ArrowUpOnSquareIcon />
                      </SvgIcon>
                    }
                  >
                    In
                  </Button>
                </Stack>
              </Stack>
              <div>
                <Button
                  onClick={() => handleAddProduct()}
                  startIcon={
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  }
                  variant="contained"
                  sx={{
                    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                    borderRadius: "11px",
                    backgroundColor: COLORS.background,
                    ":hover": {
                      backgroundColor: "#0E6637",
                    },
                  }}
                >
                  Thêm sản phẩm
                </Button>
              </div>
            </Stack>
            {productSelection.selected.length > 0 ? (
              <Stack direction="row" spacing={2} py={"0.61rem"}>
                <Button
                  onClick={() =>
                    onClickToDeleteProduct(productSelection.selected)
                  }
                  startIcon={
                    <SvgIcon fontSize="small">
                      <TrashIcon />
                    </SvgIcon>
                  }
                  variant="contained"
                  sx={{
                    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                    borderRadius: "5px",
                    backgroundColor: "#fff",
                    outline: "1px solid",
                    textTransform: "none",
                    color: "#FF6464",
                    ":hover": {
                      backgroundColor: "#FF6464",
                      color: "#fff",
                      outline: "1px solid",
                      outlineColor: "#FF6464",
                    },
                  }}
                >
                  Xóa
                </Button>
                <Typography
                  justifyContent="left"
                  alignItems="center"
                  display="flex"
                  variant="body2"
                >
                  {productSelection.selected.length} sản phẩm được chọn
                </Typography>
              </Stack>
            ) : (
              <CustomersSearch
                searchKeys={searchKeys}
                placeholder="Tìm kiếm sản phẩm"
                sx={{
                  p: 2,
                  borderRadius: "20px",
                  boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                  textAlign: "left",
                }}
              />
            )}

            <ProductManagementTable
              count={data?.totalCount}
              items={listProducts}
              onDeselectAll={productSelection.handleDeselectAll}
              onDeselectOne={productSelection.handleDeselectedOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowPerPageChange}
              onSelectAll={productSelection.handleSelectAll}
              onSelectOne={productSelection.handleSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={productSelection.selected}
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default ProductManagement;

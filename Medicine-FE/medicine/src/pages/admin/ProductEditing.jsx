import {
  AppBar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Divider,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { FormInputInfo } from "../../components/shared/FormInputInfo";
import { ProductManagementImageSlider } from "../../components/productManagement/product-management-image-slider";
import { FormInputCategory } from "../../components/shared/FormInputCategory";

import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getProductDetails,
  patchUpdateProductDetails,
} from "../../api/productApiService";
import { getProductCategories } from "../../api/categoryApiService";
import { toast } from "react-toastify";
import { adminRoute } from "../../routes/routes";

export const ProductEditing = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [category, setCategories] = useState([]);

  const [productDetails, setProductDetails] = useState({
    id: "",
    name: "",
    quantity: "",
    type: "",
    typeId: "",
    userObject: "",
    userGuide: "",
    use: "",
    description: "",
    price: "",
    storage: "",
    materials: "",
    images: [],
  });

  const images = (images) => {
    const imageList = [];
    images.map((item) => imageList.push(item.secure_url));
    setProductDetails({ ...productDetails, images: imageList });
  };

  useEffect(() => {
    const fetchProductDetails = async () => {
      const response = await getProductDetails(location.state);
      if (response && response.status === 200) {
        setProductDetails({
          id: response.data.id,
          name: response.data.name,
          quantity: response.data.quantity,
          type: response.data.type,
          userObject: response.data.userObject,
          userGuide: response.data.userGuide,
          use: response.data.use,
          description: response.data.description,
          price: response.data.price,
          materials: response.data.materials[0],
          images: response.data.images,
          storage: "1",
        });
      }
    };

    const fetchCategorises = async () => {
      const response = await getProductCategories();
      if (response && response.status === 200) {
        setCategories(response?.data);
      }
    };

    fetchCategorises();
    fetchProductDetails();
  }, [location]);

  const updateProduct = async (getId) => {
    const response = await patchUpdateProductDetails({
      name: productDetails.name,
      description: productDetails.description,
      quantity: productDetails.quantity,
      price: productDetails.price,
      images: productDetails.images,
      userObject: productDetails.userObject,
      userGuide: productDetails.userGuide,
      storage: productDetails.storage,
      use: productDetails.use,
      materials: [productDetails.materials],
      typeId: productDetails.typeId ?? getId,
      id: productDetails.id,
    });

    if (response && response.status === 201) {
      toast.success("cập nhật thành công");
      navigate(`/${adminRoute.home}/${adminRoute.productManagement}`);
    }
  };

  const handleChangeCategory = (value) => {
    const getId = category.filter((item) => item.name === value);
    setProductDetails({
      ...productDetails,
      type: value,
      typeId: getId[0].id,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const getId = category.filter((item) => item.name === data.get("category"));
    updateProduct(getId[0].id);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        py: 8,
      }}
      component="form"
      onSubmit={handleSubmit}
    >
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid xs={12} sm={12} md={12} lg={12}>
            <Typography fontWeight="bold" fontSize="22.575px" textAlign="left">
              {productDetails.name}
            </Typography>
          </Grid>

          <Grid xs={12} sm={12} md={8} lg={8}>
            <Stack spacing={3}>
              <Card
                sx={{
                  borderRadius: "20px",
                  boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                }}
              >
                <CardHeader
                  title="Thông tin sản phẩm"
                  sx={{
                    textAlign: "left",
                  }}
                  titleTypographyProps={{
                    fontSize: "15.75px",
                    fontWeight: "bold",
                  }}
                />
                <Divider />
                <CardContent>
                  <Box display="flex" flexWrap="wrap">
                    <Grid xs={12} sm={12} md={12} lg={12}>
                      <FormInputInfo
                        label="Tên sản phẩm"
                        name="name"
                        value={productDetails.name}
                        onChange={(event) => {
                          setProductDetails({
                            ...productDetails,
                            name: event.target.value,
                          });
                        }}
                      />
                    </Grid>

                    <Grid xs={12} sm={12} md={6} lg={6}>
                      <FormInputInfo
                        label="Quy cách đóng gói"
                        name="amount"
                        placeholder="Hộp 60 viên..."
                      />
                    </Grid>
                    <Grid xs={12} sm={12} md={6} lg={6}>
                      <FormInputInfo
                        label="Số lượng"
                        name="quantity"
                        value={productDetails.quantity.toString()}
                        onChange={(event) => {
                          setProductDetails({
                            ...productDetails,
                            quantity: event.target.value,
                          });
                        }}
                      />
                    </Grid>
                    <Grid xs={12} sm={12} md={6} lg={6}>
                      <FormInputInfo
                        label="Tồn kho"
                        name="storage"
                        value={productDetails.storage}
                        onChange={(event) => {
                          setProductDetails({
                            ...productDetails,
                            storage: event.target.value,
                          });
                        }}
                      />
                    </Grid>
                    <Grid xs={12} sm={12} md={6} lg={6}>
                      <FormInputCategory
                        label="Phân loại"
                        name="category"
                        data={category}
                        value={productDetails.type}
                        onChange={(event) =>
                          handleChangeCategory(event.target.value)
                        }
                      />
                    </Grid>
                    <Grid xs={12} sm={12} md={12} lg={12}>
                      <FormInputInfo
                        label="Đối tượng sử dụng"
                        name="userObject"
                        value={productDetails.userObject}
                        onChange={(event) => {
                          setProductDetails({
                            ...productDetails,
                            userObject: event.target.value,
                          });
                        }}
                      />
                    </Grid>
                    <Grid xs={12} sm={12} md={12} lg={12}>
                      <FormInputInfo
                        label="Hướng dẫn bảo quản"
                        name="storing"
                      />
                    </Grid>
                    <Grid xs={12} sm={12} md={12} lg={12}>
                      <FormInputInfo
                        label="Mô tả"
                        name="description"
                        isMultiline={true}
                        height="100px"
                        value={productDetails.description}
                        onChange={(event) => {
                          setProductDetails({
                            ...productDetails,
                            description: event.target.value,
                          });
                        }}
                      />
                    </Grid>
                    <Grid xs={12} sm={12} md={12} lg={12}>
                      <FormInputInfo
                        label="Nguyên liệu thành phần"
                        name="materials"
                        isMultiline={true}
                        height="100px"
                        value={productDetails.materials}
                        onChange={(event) => {
                          setProductDetails({
                            ...productDetails,
                            materials: event.target.value,
                          });
                        }}
                      />
                    </Grid>
                    <Grid xs={12} sm={12} md={12} lg={12}>
                      <FormInputInfo
                        label="Công dụng"
                        name="uses"
                        isMultiline={true}
                        height="100px"
                        value={productDetails.use}
                        onChange={(event) => {
                          setProductDetails({
                            ...productDetails,
                            use: event.target.value,
                          });
                        }}
                      />
                    </Grid>
                    <Grid xs={12} sm={12} md={12} lg={12}>
                      <FormInputInfo
                        label="Hướng dẫn sử dụng"
                        name="userManual"
                        isMultiline={true}
                        height="100px"
                        value={productDetails.userGuide}
                        onChange={(event) => {
                          setProductDetails({
                            ...productDetails,
                            userGuide: event.target.value,
                          });
                        }}
                      />
                    </Grid>
                  </Box>
                </CardContent>
              </Card>
              <Card
                sx={{
                  borderRadius: "20px",
                  boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                }}
              >
                <CardHeader
                  title="Hình ảnh sản phẩm"
                  sx={{
                    textAlign: "left",
                  }}
                  titleTypographyProps={{
                    fontSize: "15.75px",
                    fontWeight: "bold",
                  }}
                />
                <Divider />
                <CardContent>
                  <ProductManagementImageSlider
                    defaultImages={productDetails?.images}
                    images={images}
                  />
                </CardContent>
              </Card>
            </Stack>
          </Grid>
          <Grid xs sm md lg>
            <Stack spacing={3}>
              <Card
                sx={{
                  borderRadius: "20px",
                  boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                }}
              >
                <CardHeader
                  title="Giá sản phẩm"
                  sx={{
                    textAlign: "left",
                  }}
                  titleTypographyProps={{
                    fontSize: "15.75px",
                    fontWeight: "bold",
                  }}
                />
                <Divider />
                <CardContent>
                  <Grid xs={12} sm={12} md={12} lg={12}>
                    <FormInputInfo
                      label="Giá"
                      name="price"
                      placeholder="0.0"
                      unit="VND"
                      value={productDetails.price.toString()}
                      onChange={(event) => {
                        setProductDetails({
                          ...productDetails,
                          price: event.target.value,
                        });
                      }}
                    />
                  </Grid>
                  <Grid xs={12} sm={12} md={12} lg={12}>
                    <FormInputInfo
                      label="Giảm giá"
                      name="discount"
                      placeholder="0"
                      unit="%"
                    />
                  </Grid>
                </CardContent>
              </Card>
            </Stack>
          </Grid>
        </Grid>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar
            position="fixed"
            sx={{
              top: "auto",
              bottom: 0,
              alignItems: "center",
              backgroundColor: "transparent",
              boxShadow: "none",
            }}
          >
            <Toolbar
              sx={{
                justifyContent: "space-around",

                width: 520,
                borderRadius: 3,
              }}
            >
              <Button
                variant="contained"
                onClick={() =>
                  navigate(
                    `/${adminRoute.home}/${adminRoute.productManagement}`
                  )
                }
                color="error"
                sx={{
                  textTransform: "none",
                  borderRadius: 10,
                  boxShadow: "none",
                }}
              >
                Hủy
              </Button>

              <Box display="flex" gap={2}>
                {/* <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    textTransform: "none",
                    color: "red",
                    backgroundColor: "transparent",
                    boxShadow: "none",
                  }}
                >
                  Xóa
                </Button> */}
                <Button
                  type="submit"
                  variant="contained"
                  color="success"
                  sx={{
                    textTransform: "none",
                    borderRadius: 10,
                    boxShadow: "none",
                  }}
                >
                  Lưu
                </Button>
              </Box>
            </Toolbar>
          </AppBar>
        </Box>
      </Container>
    </Box>
  );
};

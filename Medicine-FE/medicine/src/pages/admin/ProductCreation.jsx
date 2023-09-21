import {
  AppBar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Divider,
  ImageList,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { FormInputInfo } from "../../components/shared/FormInputInfo";
import { ProductManagementImageSlider } from "../../components/productManagement/product-management-image-slider";
import { FormInputCategory } from "../../components/shared/FormInputCategory";
import MTable from "../../components/productManagement/product-management-ingredients-table";
import { useEffect, useState } from "react";
import { postCreateProduct } from "../../api/productApiService";
import { useNavigate } from "react-router-dom";
import { adminRoute } from "../../routes/routes";
import { getProductCategories } from "../../api/categoryApiService";

export const ProductCreation = () => {
  // const [ingredients, setIngredients] = useState([]);
  const [imageList, setImageList] = useState([]);
  const [category, setCategories] = useState([]);

  const navigate = useNavigate();

  const images = (images) => {
    const list = [];
    images.map((item) => list.push(item.secure_url));
    setImageList(list);
  };
  // const ingredientData = (ingredientData) => {
  //   setIngredients(ingredientData);
  // };

  useEffect(() => {
    const fetchCategorises = async () => {
      const response = await getProductCategories();
      if (response && response.status === 200) {
        setCategories(response?.data);
      }
    };

    fetchCategorises();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const getId = category.filter((item) => item.name === data.get("category"));

    const response = await postCreateProduct({
      name: data.get("name"),
      description: data.get("description"),
      quantity: data.get("quantity"),
      price: data.get("price"),
      images: imageList,
      userGuide: data.get("userGuide"),
      userObject: data.get("userObject"),
      storage: "100",
      materials: [data.get("ingredients")],
      use: data.get("use"),
      typeId: getId[0].id,
    });

    if (response && response.status === 201) {
      navigate(`/admin/${adminRoute.productManagement}`);
    }
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
              Thêm sản phẩm
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
                      <FormInputInfo label="Tên sản phẩm" name="name" />
                    </Grid>

                    <Grid xs={12} sm={12} md={6} lg={6}>
                      <FormInputInfo
                        label="Quy cách đóng gói"
                        name="amount"
                        placeholder="Hộp 60 viên..."
                      />
                    </Grid>
                    <Grid xs={12} sm={12} md={6} lg={6}>
                      <FormInputInfo label="Số lượng" name="quantity" />
                    </Grid>
                    <Grid xs={12} sm={12} md={6} lg={6}>
                      <FormInputCategory
                        label="Phân loại"
                        name="category"
                        placeholder="Thực phẩm chức năng..."
                        data={category}
                      />
                    </Grid>
                    <Grid xs={12} sm={12} md={12} lg={12}>
                      <FormInputInfo
                        label="Đối tượng sử dụng"
                        name="userObject"
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
                      />
                    </Grid>
                    <Grid xs={12} sm={12} md={12} lg={12}>
                      <FormInputInfo
                        label="Nguyên liệu thành phần"
                        name="ingredients"
                        isMultiline={true}
                        height="100px"
                      />
                    </Grid>
                    <Grid xs={12} sm={12} md={12} lg={12}>
                      <FormInputInfo
                        label="Công dụng"
                        name="use"
                        isMultiline={true}
                        height="100px"
                      />
                    </Grid>
                    <Grid xs={12} sm={12} md={12} lg={12}>
                      <FormInputInfo
                        label="Hướng dẫn sử dụng"
                        name="userGuide"
                        isMultiline={true}
                        height="100px"
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
                  <ProductManagementImageSlider images={images} />
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
                    <FormInputInfo label="Giá" name="price" placeholder="0" />
                  </Grid>
                  <Grid xs={12} sm={12} md={12} lg={12}>
                    <FormInputInfo
                      label="Giảm giá"
                      name="discount"
                      placeholder="0"
                    />
                  </Grid>
                </CardContent>
              </Card>
              {/* <Card
                sx={{
                  borderRadius: "20px",
                  boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                }}
              >
                <CardHeader
                  title="Nguyên liệu thành phần"
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
                  <MTable ingredientData={ingredientData} />
                </CardContent>
              </Card> */}
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
                color="error"
                onClick={() =>
                  navigate(
                    `/${adminRoute.home}/${adminRoute.productManagement}`
                  )
                }
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

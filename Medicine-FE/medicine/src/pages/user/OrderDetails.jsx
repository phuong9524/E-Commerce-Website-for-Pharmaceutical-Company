import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  List,
  ListItem,
  ListItemText,
  Rating,
  Stack,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { useEffect, useState } from "react";
import { COLORS } from "../../utils/Constants";
import { OrderTimeLine } from "../../components/shared/OrderTimeLine";
import { useLocation } from "react-router-dom";
import { getOrderDetails } from "../../api/orderApiService";
import { shippingFee } from "../../utils/mappingData";
import { numberToCurrency } from "../../utils/currencyFormat";
import { ReviewUploadImages } from "../../components/reviewManagement/review-upload-images";
import { postComment } from "../../api/commentApiService";
import { toast } from "react-toastify";

const labels = {
  0.5: "Rất không hài lòng",
  1: "Không hài lòng",
  1.5: "Khá không hài lòng",
  2: "Có chút không hài lòng",
  2.5: "Khá bình thường",
  3: "Bình thường",
  3.5: "Có chút hài lòng",
  4: "khá hài lòng",
  4.5: "Hài lòng",
  5: "Cực kì hài lòng",
};

export const OrderDetails = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState(-1);
  const [details, setDetais] = useState();

  const [commentInfo, setCommentInfo] = useState({
    productName: "",
    productImage: "",
    productId: "",
    content: "",
    point: 0,
    commentImages: [],
  });

  const handleClickOpen = (item) => {
    setCommentInfo({
      ...commentInfo,
      productName: item.name,
      productImage: item.images[0],
      productId: item.id,
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const imageData = (imageData) => {
    setCommentInfo({ ...commentInfo, commentImages: imageData });
  };

  useEffect(() => {
    const orderDetails = async () => {
      const response = await getOrderDetails(location.state);
      if (response && response.status === 200) {
        setDetais(response.data);
      }
    };
    orderDetails();
  }, []);

  const listFee = [
    { name: "Tổng giá trị sản phẩm", value: numberToCurrency(details?.sum) },
    {
      name: "Chi phí vận chuyển",
      value: numberToCurrency(shippingFee[details?.description]),
    },
    { name: "Giảm giá", value: numberToCurrency(0) },
    {
      name: "Tổng giá trị đơn hàng",
      value: numberToCurrency(
        (
          Number(details?.sum) + Number(shippingFee[details?.description])
        ).toString()
      ),
    },
  ];

  const handleCompleteRating = async () => {
    const response = await postComment({
      productId: commentInfo.productId,
      content: commentInfo.content,
      points: commentInfo.point,
      images: commentInfo.commentImages,
    });

    if (response && response.status === 201) {
      toast.success("Đánh giá thành công", { theme: "light", autoClose: 1000 });
      setOpen(false);

    }
  };
  return (
    <Box
      sx={{
        flexGrow: 1,
        py: 8,
        backgroundColor: "#F5F5F5",
      }}
    >
      <Container maxWidth="md">
        <Grid container spacing={2}>
          <Grid xs={12} sm={12} md={12} lg={12}>
            <Typography fontWeight="bold" fontSize="22.575px" textAlign="left">
              Chi tiết đơn hàng {location.state}
            </Typography>
          </Grid>
          <Grid xs={12} sm={12} md={12} lg={12} container spacing={2}>
            <Grid xs={12} sm={12} md={6} lg={6}>
              <OrderTimeLine timeline={details?.statuses} />
            </Grid>
            <Grid
              xs={12}
              sm={12}
              md={6}
              lg={6}
              display={"flex"}
              flexDirection="column"
              gap={2}
            >
              <Card
                sx={{
                  boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                  borderRadius: "8px",
                  textAlign: "left",
                  height: 200,
                }}
              >
                <CardHeader subheader={"Địa chỉ thông tin người nhận"} />
                <Divider />
                <CardContent>{details?.destination}</CardContent>
              </Card>
              <Card
                sx={{
                  boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                  borderRadius: "8px",
                  textAlign: "left",
                  height: 200,
                }}
              >
                <CardHeader subheader={"Hình thức giao hàng"} />
                <Divider />
                <CardContent>
                  <Stack gap={1}>
                    <Typography>{details?.description}</Typography>
                    <Typography>
                      Phí vận chuyển:{" "}
                      {numberToCurrency(shippingFee[details?.description])}
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>

              <Card
                sx={{
                  boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                  borderRadius: "8px",
                  textAlign: "left",
                  height: 200,
                }}
              >
                <CardHeader subheader={"Hình thức thanh toán"} />
                <Divider />
                <CardContent>{details?.paymentMethod}</CardContent>
              </Card>
            </Grid>
          </Grid>
          <Grid xs={12} sm={12} md={12} lg={12}>
            <Card
              sx={{
                boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                borderRadius: "8px",
              }}
            >
              <CardContent>
                <Stack textAlign="left" gap={2}>
                  {details?.product.map((item) => {
                    return (
                      <>
                        <Grid
                          key={item.id}
                          container
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <Grid
                            xs={7}
                            sm={7}
                            md={9}
                            lg={9}
                            display={"flex"}
                            direction={"row"}
                            gap={2}
                          >
                            <img
                              src={item.images[0]}
                              width={82}
                              height={82}
                              style={{ border: "1px solid #EEEEEE" }}
                            />
                            <List sx={{ minWidth: "260px" }}>
                              <ListItem sx={{ p: 0 }}>
                                <ListItemText
                                  primary={
                                    <Typography sx={{ wordWrap: "break-word" }}>
                                      {item.name}
                                    </Typography>
                                  }
                                  secondary={`x${item.quantity}`}
                                >
                                  {/* <ListItemButton>asdad</ListItemButton> */}
                                </ListItemText>
                              </ListItem>
                              <ListItem sx={{ p: 0 }}>
                                {item.canComment === true ? (
                                  <Button
                                    onClick={() => handleClickOpen(item)}
                                    variant="contained"
                                    sx={{
                                      fontSize: "12px",
                                      width: "100px",
                                      height: "25px",
                                      boxShadow:
                                        "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                                      borderRadius: "6px",
                                      backgroundColor: "#ffffff",
                                      color: COLORS.background,
                                      ":hover": {
                                        backgroundColor: COLORS.background,
                                        color: "#ffffff",
                                      },
                                    }}
                                  >
                                    Đánh giá
                                  </Button>
                                ) : (
                                  <></>
                                )}
                              </ListItem>
                            </List>
                          </Grid>
                          <Grid xs={3} sm={4} md={3} lg={3} textAlign="right">
                            <Typography>
                              {numberToCurrency(item.price)}
                            </Typography>
                          </Grid>
                        </Grid>

                        <Divider />
                      </>
                    );
                  })}
                </Stack>
                <List>
                  {listFee.map((item) => (
                    <ListItem
                      key={item.name}
                      secondaryAction={
                        <Typography fontWeight="bold">{item.value}</Typography>
                      }
                    >
                      <ListItemText
                        sx={{ textAlign: "left" }}
                        primary={item.name}
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
              <CardContent></CardContent>
            </Card>
          </Grid>
        </Grid>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
          sx={{
            "& .MuiDialog-container": {
              "& .MuiPaper-root": {
                width: "100%",
              },
            },
          }}
        >
          <DialogTitle id="responsive-dialog-title">
            <Stack
              flexDirection={"row"}
              gap={2}
              display={"flex"}
              alignItems="center"
            >
              <img src={commentInfo.productImage} width={40} height={40} />
              <Typography>{commentInfo.productName}</Typography>
            </Stack>
          </DialogTitle>
          <DialogContent>
            <Stack display="flex" alignItems="center" gap={2}>
              <Typography variant="h6">
                {commentInfo.point === 0
                  ? "Vui lòng đánh giá"
                  : labels[hover !== -1 ? hover : commentInfo.point]}
              </Typography>
              <Rating
                size="large"
                precision={0.5}
                value={commentInfo.point}
                onChange={(_event, newValue) => {
                  setCommentInfo({ ...commentInfo, point: newValue });
                }}
                onChangeActive={(_event, newHover) => {
                  setHover(newHover);
                }}
              />
              <TextareaAutosize
                minRows={8}
                maxRows={8}
                onChange={(event) =>
                  setCommentInfo({
                    ...commentInfo,
                    content: event.target.value,
                  })
                }
                placeholder="Hãy chia sẻ cảm nhận, đánh giá của bạn về sản phẩm này nhé ..."
                style={{
                  width: "100%",
                  borderRadius: "5px",
                  fontFamily: "sans-serif",
                  border: "2px solid #F6F6F6",
                  fontSize: "15px",
                  overflow: "auto",
                }}
              />

              <ReviewUploadImages imageData={imageData} />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleClose}
              variant="contained"
              sx={{
                boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                borderRadius: "6px",
                backgroundColor: "#ffffff",
                color: "black",
                ":hover": {
                  backgroundColor: "#F8F8F8",
                },
              }}
            >
              Hủy bỏ
            </Button>
            <Button
              autoFocus
              disabled={commentInfo.point === 0}
              onClick={handleCompleteRating}
              variant="contained"
              sx={{
                boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                borderRadius: "6px",
                backgroundColor: COLORS.background,
                ":hover": {
                  backgroundColor: "#0E6637",
                },
              }}
            >
              Hoàn thành
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

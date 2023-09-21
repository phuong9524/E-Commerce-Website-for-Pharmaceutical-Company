import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
  Stack,
  CardHeader,
} from "@mui/material";
import TrendingFlatOutlinedIcon from "@mui/icons-material/TrendingFlatOutlined";
import { formatToDate } from "../../utils/FormatTime";
import { useNavigate } from "react-router-dom";
import { userRoute } from "../../routes/routes";
import { COLORS } from "../../utils/Constants";
import { buyButton } from "../../styles/Button";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

const CustomNewsCard = ({ items = [] }) => {
  const navigate = useNavigate();
  const onClickToDetails = (id) => {
    navigate(`${userRoute.news}/${userRoute.newsDetails}`, { state: id });
  };
  return (
    <>
      <Grid container gap={2}>
        {items?.map((item) => {
          return (
            <Grid key={item.id} xs={12} sm={4} md={5.8} lg={3.9}>
              <Card sx={{ border: "none", boxShadow: "none" }}>
                <CardMedia
                  onClick={() => onClickToDetails(item.id)}
                  sx={{ cursor: "pointer", width: 500, height: 250 }}
                  component="img"
                  image={item.image}
                />
                <CardHeader
                  title={item.title}
                  onClick={() => onClickToDetails(item.id)}
                  sx={{ cursor: "pointer", paddingLeft: 0 }}
                  titleTypographyProps={{
                    variant: "h6",
                    fontWeight: "bold",
                    color: COLORS.mainColor,
                    textAlign: "left",
                  }}
                />
                <CardContent
                  sx={{
                    paddingLeft: 0,
                  }}
                >
                  <Stack textAlign={"left"} gap={1}>
                    <Typography>{formatToDate(item.createdAt)}</Typography>
                    {/* <Typography
                    sx={{
                      display: "inline-block",
                      width: 350,
                      whiteSpace: "nowrap",
                      overflow: "hidden !important",
                      textOverflow: "ellipsis",
                    }}
                  >
                    Bệnh xương khớp thường xuyên xảy ra ở người già, nhất là
                    những người hay vận dộng nhiều
                  </Typography> */}
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
      <Box
        m={1}
        //margin
        display="flex"
        justifyContent="flex-end"
        alignItems="flex-end"
      >
        <Button
          color="primary"
          onClick={() => navigate(`${userRoute.news}`)}
          endIcon={<TrendingFlatOutlinedIcon />}
          sx={{
            boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
            borderRadius: "5px",
            backgroundColor: "#fff",
            outline: "1px solid",
            textTransform: "none",
            color: COLORS.background,
            ":hover": {
              backgroundColor: COLORS.background,
              color: "#fff",
              outline: "1px solid",
              outlineColor: COLORS.background,
            },
          }}
        >
          Xem thêm
        </Button>
      </Box>
    </>
  );
};

export default CustomNewsCard;

import {
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
  Pagination,
  Stack,
  ThemeProvider, 
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { COLORS } from "../../utils/Constants";
import { buttonSelectedTheme } from "../../styles/Theme";
import { useNavigate } from "react-router-dom";
import { userRoute } from "../../routes/routes";
import { useEffect, useState } from "react";
import { getNewsfeed } from "../../api/newsfeedApiService";
import { formatToDate } from "../../utils/FormatTime";

const News = () => {
  const navigate = useNavigate();
  const onClickToDetails = (id) => {
    navigate(userRoute.newsDetails, { state: id });
  };

  const [page, setPage] = useState(1);
  const [newsList, setNewsList] = useState();

  const handleChangePage = (_event, newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    const Newsfeed = async () => {
      const response = await getNewsfeed({
        keyword: "",
        pageIndex: page,
        pageSize: 7,
      });
      if (response && response.status === 200) {
        setNewsList(response.data);
      }
    };
    Newsfeed();
  }, [page]);

  return (
    <Box
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid xs={12} sm={12} md={12} lg={12}>
            <Typography fontWeight="bold" fontSize="22.575px" textAlign="left">
              Góc thông tin
            </Typography>
          </Grid>
          <Grid xs={12} sm={12} md={12} lg={12} container spacing={2}>
            <Grid xs={12} sm={12} md={6} lg={6}>
              <Card sx={{ border: "none", boxShadow: "none" }}>
                <CardMedia
                  sx={{ cursor: "pointer" }}
                  component="img"
                  image={newsList?.items[0]?.image}
                />
                <CardHeader
                  title={newsList?.items[0]?.title}
                  onClick={() => onClickToDetails(newsList?.items[0].id)}
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
                    <Typography>
                      {newsList
                        ? formatToDate(newsList?.items[0]?.createdAt)
                        : "0"}
                    </Typography>
                    <Typography
                      sx={{
                        display: "inline-block",
                        width: 550,
                        whiteSpace: "nowrap",
                        overflow: "hidden !important",
                        textOverflow: "ellipsis",
                      }}
                    >
                      Bệnh xương khớp thường xuyên xảy ra ở người già, nhất là
                      những người hay vận dộng nhiều
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
            <Grid xs={12} sm={12} md={6} lg={6}>
              <Stack gap={2}>
                {newsList?.items.slice(1, 4).map((item) => {
                  return (
                    <Card
                      key={item.id}
                      sx={{
                        display: "flex",
                        border: "none",
                        boxShadow: "none",
                      }}
                    >
                      <CardMedia
                        onClick={() => onClickToDetails(item.id)}
                        sx={{ width: 151, cursor: "pointer" }}
                        component="img"
                        image={item.image}
                      />

                      <CardContent sx={{ textAlign: "left", pt: 0 }}>
                        <Typography
                          onClick={() => onClickToDetails(item.id)}
                          sx={{ cursor: "pointer" }}
                          color={COLORS.mainColor}
                          fontWeight={"bold"}
                        >
                          {item.title}
                        </Typography>
                        <Typography>{formatToDate(item.createdAt)}</Typography>
                      </CardContent>
                    </Card>
                  );
                })}
              </Stack>
            </Grid>
            <Grid xs={12} sm={12} md={12} lg={12}>
              <Stack
                display="flex"
                gap={2}
                direction={{ lg: "row", md: "row" }}
              >
                {newsList?.items.slice(4, 7).map((item) => {
                  return (
                    <Card
                      key={item.id}
                      sx={{ border: "none", boxShadow: "none" }}
                    >
                      <CardMedia
                        onClick={() => onClickToDetails(item.id)}
                        sx={{ cursor: "pointer", width: 350, height: 200 }}
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
                          <Typography>
                            {formatToDate(item.createdAt)}
                          </Typography>
                          <Typography
                            sx={{
                              display: "inline-block",
                              width: 350,
                              whiteSpace: "nowrap",
                              overflow: "hidden !important",
                              textOverflow: "ellipsis",
                            }}
                          >
                            Bệnh xương khớp thường xuyên xảy ra ở người già,
                            nhất là những người hay vận dộng nhiều
                          </Typography>
                        </Stack>
                      </CardContent>
                    </Card>
                  );
                })}
              </Stack>
            </Grid>
            <Grid
              xs={12}
              sm={12}
              md={12}
              lg={12}
              justifyContent={"center"}
              display={"flex"}
            >
              <ThemeProvider theme={buttonSelectedTheme}>
                <Pagination
                  variant="outlined"
                  color="primary"
                  count={newsList?.totalPages}
                  onChange={handleChangePage}
                />
              </ThemeProvider>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default News;

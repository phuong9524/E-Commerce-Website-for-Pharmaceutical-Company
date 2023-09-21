import {
  AppBar,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Fab,
  Pagination,
  Stack,
  SvgIcon,
  Typography,
  styled,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { CustomersSearch } from "../../components/customer/customers-search";
import { adminRoute } from "../../routes/routes";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import { COLORS } from "../../utils/Constants";
import { useNavigate } from "react-router-dom";
import { NewsManagementCard } from "../../components/newsManagement/news-management-card";
import { useEffect, useState } from "react";
import { getNewsfeed } from "../../api/newsfeedApiService";

const StyledFab = styled(Fab)({
  position: "absolute",
  zIndex: 1,
  top: -70,
  left: "85%",
  right: 0,
  margin: "0 auto",
});
export const NewsManagement = () => {
  const theme = useTheme();
  const xsUp = useMediaQuery(theme.breakpoints.up("md"));
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const [isDelete, setIsDelete] = useState();
  const searchKeys = (searchKeys) => {
    setKeyword(searchKeys);
  };
  const [page, setPage] = useState(1);

  const [newsList, setNewsList] = useState();
  
  const handleChangePage = (_event, newPage) => {
    setPage(newPage);
  };

  const deleteEvent = (deleteEvent) => {
    setIsDelete(deleteEvent);
  };

  useEffect(() => {
    const Newsfeed = async () => {
      const response = await getNewsfeed({
        keyword: keyword,
        pageIndex: page,
        pageSize: 5,
      });
      if (response && response.status === 200) {
        setNewsList(response.data);
        console.log(response.data);
      }
    };
    Newsfeed();
  }, [page, keyword, isDelete]);

  return (
    <Box
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid xs={12} sm={12} md={12} lg={12}>
            <Typography fontWeight="bold" fontSize="22.575px" textAlign="left">
              Tin tức
            </Typography>
          </Grid>
          <Grid xs={12} sm={12} md={12} lg={12}>
            <Stack
              direction={xsUp ? "row" : undefined}
              justifyContent="space-between"
              alignItems="center"
            >
              <CustomersSearch
                searchKeys={searchKeys}
                placeholder="Tìm kiếm tên bài viết"
              />
              {xsUp ? (
                <Button
                  onClick={() => navigate(adminRoute.newsCreation)}
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
                  Thêm bài viết mới
                </Button>
              ) : (
                <AppBar
                  position="fixed"
                  color="primary"
                  sx={{ top: "auto", bottom: 0 }}
                >
                  <StyledFab
                    color="success"
                    aria-label="add"
                    onClick={() => navigate(adminRoute.newsCreation)}
                  >
                    <AddIcon />
                  </StyledFab>
                </AppBar>
              )}
            </Stack>
          </Grid>
          <Grid xs={12} sm={12} md={12} lg={12}>
            <Card
              sx={{
                boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                borderRadius: "10px",
              }}
            >
              <CardContent>
                <Stack spacing={2}>
                  {newsList?.items.map((item) => {
                    return (
                      <NewsManagementCard
                        data={item}
                        key={item.id}
                        deleteEvent={deleteEvent}
                      />
                    );
                  })}
                </Stack>
                <Box display="flex" justifyContent="center">
                  <Pagination
                    count={newsList?.totalPages}
                    page={page}
                    onChange={handleChangePage}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

import {
  Container,
  Box,
  Typography,
  ListItem,
  ListItemText,
  CardContent,
  Card,
  Stack,
  styled,
  LinearProgress,
  linearProgressClasses,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { ReviewManagementTable } from "../../components/reviewManagement/review-management-table";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === "light" ? "#17B554" : "#308fe8",
  },
}));

const rating = ["5 sao", "4 sao", "3 sao", "2 sao", "1 sao"];
export const ReviewManagement = () => {
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
              Đánh giá
            </Typography>
          </Grid>
          <Grid xs={12} sm={12} md={12} lg={12}>
            <Card
              sx={{
                borderRadius: "20px",
                boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
              }}
            >
              <CardContent>
                <Grid container>
                  <Grid xs={12} lg={2.5} display="flex">
                    <img
                      src="https://res.cloudinary.com/dwsae4gmt/image/upload/v1692036088/oc-review_on0ed5.svg"
                      width={100}
                      height={100}
                    />
                    <ListItem>
                      <ListItemText
                        primary={
                          <Typography fontSize={50} fontWeight="bold">
                            4.84
                          </Typography>
                        }
                        secondary=" — trên 7 lượt đánh giá"
                      />
                    </ListItem>
                  </Grid>
                  <Grid xs={12} lg={9.5}>
                    <Stack gap={1}>
                      {rating.map((item) => {
                        return (
                          <Stack
                            display={"flex"}
                            flexDirection={"row"}
                            alignItems="center"
                            gap={2}
                            key={item}
                          >
                            <Typography>{item}</Typography>
                            <BorderLinearProgress
                              variant="determinate"
                              value={Math.random() * 60}
                              sx={{ flexGrow: 1 }}
                            />
                            <Typography>70</Typography>
                          </Stack>
                        );
                      })}
                    </Stack>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid xs={12} sm={12} md={12} lg={12}>
            <ReviewManagementTable />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

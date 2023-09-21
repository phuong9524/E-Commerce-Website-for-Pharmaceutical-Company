import {
  Card,
  CardContent,
  CardMedia,
  Container,
  FormControlLabel,
  IconButton,
  Stack,
  Switch,
  Typography,
} from "@mui/material";

import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import { adminRoute } from "../../routes/routes";
import { deleteNews } from "../../api/newsfeedApiService";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { formatToDate } from "../../utils/FormatTime";

export const NewsManagementCard = ({ data, deleteEvent }) => {
  const navigate = useNavigate();

  const onClickToDelete = async (id) => {
    const response = await deleteNews({ newsId: id });
    if (response && response.status === 204) {
      deleteEvent++;
    }
  };
  return (
    <Card sx={{ border: "none", boxShadow: "none" }}>
      <Container maxWidth="xl">
        <Grid container>
          <Grid lg={10} display={"flex"}>
            <CardMedia
              component="img"
              sx={{ width: 200, height: 200 }}
              image={data?.image}
            />
            <CardContent sx={{ textAlign: "left" }}>
              <Typography component="div" variant="h5">
                {data?.title}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                Ngày đăng: {formatToDate(data?.createdAt)}
              </Typography>

              <Stack display="flex" flexDirection="row" gap={1.5}>
                <RemoveRedEyeOutlinedIcon sx={{ color: "#BDBDBD" }} />

                <Typography color="#BDBDBD">230 lượt xem</Typography>
              </Stack>
              <Stack direction="row" pt={2}>
                {/* <IconButton
                  size="small"
                  onClick={() =>
                    navigate(`${adminRoute.newsEditing}`, {
                      props: `${data?.id}`,
                    })
                  }
                >
                  <EditIcon fontSize="inherit" />
                </IconButton> */}
                <IconButton
                  size="small"
                  onClick={() => onClickToDelete(data?.id)}
                >
                  <DeleteIcon fontSize="inherit" />
                </IconButton>
              </Stack>
            </CardContent>
          </Grid>
          {/* <Grid lg={4}>
          <CardContent>
            <Box
              sx={{
                display: "-webkit-box",
                boxOrient: "vertical",
                lineClamp: 2,
                wordBreak: "break-all",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            ></Box>
          </CardContent>
        </Grid> */}
          <Grid lg={2} display={"flex"} alignItems={"center"}>
            <CardContent>
              <FormControlLabel
                control={<Switch defaultChecked color="success" />}
                label="Công khai"
              />
            </CardContent>
          </Grid>
        </Grid>
      </Container>
    </Card>
  );
};

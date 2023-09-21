import {
  Avatar,
  Box,
  Divider,
  ImageList,
  ImageListItem,
  Pagination,
  Rating,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { useState } from "react";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import { optionsButton } from "../../styles/Button";
import { getInitials } from "../../utils/GetInitials";
import { formatToFulldatetime } from "../../utils/FormatTime";

const listOptions = [
  { name: "lastest", content: "Mới nhất" },
  { name: "five", content: "5 Sao" },
  { name: "four", content: "4 Sao" },
  { name: "three", content: "3 Sao" },
  { name: "two", content: "2 Sao" },
  { name: "one", content: "1 Sao" },
];

const ProductReviews = (props) => {
  const {
    reviews = [],
    page = 0,
    onPageChange = () => {},
    count,
    avgPoint,
  } = props;

  const [options, setOptions] = useState(["lastest"]);
  const handleOptions = (event, newOptions) => {
    setOptions(newOptions);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      textAlign="left"
      rowGap={2}
      padding={2}
    >
      <Typography variant="h6" marginBottom={2}>
        ĐÁNH GIÁ SẢN PHẨM
      </Typography>
      <Box
        sx={{ backgroundColor: "#FFFBF8", border: "solid 1px #F9EDE5" }}
        padding={4}
      >
        <Grid container>
          <Grid xs={12} md={2} marginBottom={1}>
            <Box display="flex" gap={1}>
              <Typography variant="h5" fontWeight="bold">
                {avgPoint}
              </Typography>
              <Typography display="flex" marginTop={0.7} fontWeight="bold">
                trên 5
              </Typography>
            </Box>
            <Rating
              name="read-only"
              value={avgPoint}
              precision={0.1}
              readOnly
            />
          </Grid>
          <Grid xs={12} md={10}>
            <ToggleButtonGroup
              value={options}
              onChange={handleOptions}
              aria-label="options"
              size="small"
              sx={{
                gap: 2,
                display: "grid",
                gridTemplateColumns: "auto auto auto auto",
                border: "none",
              }}
            >
              {listOptions.map((item) => (
                <ToggleButton
                  value={item.name}
                  aria-label={item.name}
                  key={item.name}
                  disableRipple
                  sx={optionsButton}
                >
                  {options.includes(item.name) ? (
                    <CheckRoundedIcon
                      sx={{ marginRight: 2 }}
                      fontSize="small"
                    />
                  ) : (
                    <></>
                  )}
                  <Typography variant="body2">{item.content}</Typography>
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </Grid>
        </Grid>
      </Box>
      <Box>
        {reviews?.map((item) => {
          console.log(item);
          return (
            <div key={item?.id}>
              <Box display="flex" marginTop={1}>
                <Grid>
                  <Avatar src={item?.avatar}>
                    {getInitials(item?.user?.fullName)}
                  </Avatar>
                </Grid>
                <Grid xs={11}>
                  <Typography fontSize="12px" fontWeight="bold">
                    {item?.user?.fullName}
                  </Typography>
                  <Rating
                    size="small"
                    name="read-only"
                    value={item?.points}
                    precision={0.5}
                    readOnly
                  />
                  <Typography fontSize="12px" marginBottom={2}>
                    {formatToFulldatetime(item?.createdAt)}
                  </Typography>
                  <Typography marginBottom={2} color="black">
                    {item?.content}
                  </Typography>
                  {item?.images?.length !== 0 ? (
                    <ImageList
                      sx={{ width: 500, height: 200 }}
                      cols={5}
                      rowHeight={164}
                    >
                      {item?.images?.map((item) => (
                        <ImageListItem key={item.img}>
                          <img
                            src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                            srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                            alt={item.title}
                            loading="lazy"
                          />
                        </ImageListItem>
                      ))}
                    </ImageList>
                  ) : (
                    <></>
                  )}

                  {/* <Box sx={{ backgroundColor: "#F5F5F5", padding: "10px" }}>
                    <Typography fontWeight="bold">
                      Phản Hồi Của Người Bán
                    </Typography>
                    <Typography>
                      Cám ơn bạn đã ủng hộ các sản phẩm của công ty, những nhận
                      xét của bạn sẽ giúp công ty ngày càng hoàn thiện và nâng
                      cao chất lượng phục vụ khách hàng.
                    </Typography>
                  </Box> */}
                </Grid>
              </Box>
              <Divider />
            </div>
          );
        })}
        <Box my={4} display="flex" justifyContent="center">
          <Pagination
            page={page}
            onChange={onPageChange}
            count={count}
            variant="outlined"
            shape="rounded"
            sx={{ alignItems: "center" }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default ProductReviews;

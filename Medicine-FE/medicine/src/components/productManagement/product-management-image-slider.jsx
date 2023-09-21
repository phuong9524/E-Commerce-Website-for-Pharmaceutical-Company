import {
  Box,
  Card,
  CardActions,
  CardMedia,
  Divider,
  IconButton,
  SvgIcon,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import EyeIcon from "@heroicons/react/24/solid/EyeIcon";
import TrashIcon from "@heroicons/react/24/solid/TrashIcon";
import { useEffect, useState } from "react";

import Upload from "../shared/UploadImage";

export const ProductManagementImageSlider = (props) => {
  const { defaultImages = [], images = [] } = props;
  const [imageData, setImageData] = useState(defaultImages);

  const imageList = (imageList) => {
    setImageData(imageList);
    images(imageList);
  };

  const handleClickRemove = (item) => {
    setImageData(imageData.filter((data) => data.public_id !== item));
    images(imageData.filter((data) => data.public_id !== item));
  };

  return (
    <>
      <Grid xs={12} sm={12} md={12} lg={12}>
        <Box display="flex" flexWrap="wrap" gap={2.5} justifyContent="center">
          {imageData.map((item, index) => (
            <Card
              key={item.public_id ?? index}
              id="1"
              sx={{
                borderRadius: "20px",
                boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
              }}
            >
              <CardMedia
                component="img"
                sx={{ width: "14em", height: "15em" }}
                image={item.secure_url ?? item}
              />
              <Divider />
              <CardActions sx={{ justifyContent: "space-around" }}>
                <IconButton>
                  <SvgIcon sx={{ height: 16, width: 16 }}>
                    <EyeIcon />
                  </SvgIcon>
                </IconButton>
                <IconButton onClick={() => handleClickRemove(item.public_id)}>
                  <SvgIcon sx={{ height: 16, width: 16, color: "red" }}>
                    <TrashIcon />
                  </SvgIcon>
                </IconButton>
              </CardActions>
            </Card>
          ))}
        </Box>
      </Grid>

      <Grid xs sm md lg height="430px">
        <Upload imageList={imageList} />
      </Grid>

      {/* <Dialog
        open={open}
        style={{
          backgroundColor: "transparent",
        }}
      >
        <IconButton
          edge="start"
          color="inherit"
          onClick={handleClose}
          aria-label="close"
        >
          <CloseIcon />
        </IconButton>
        <Grid>
          <Box
            sx={{
              backgroundColor: "transparent",
              width: "1000px",
              height: "1000px",
            }}
          >
            <Typography>2</Typography>
          </Box>
        </Grid>
      </Dialog> */}
    </>
  );
};

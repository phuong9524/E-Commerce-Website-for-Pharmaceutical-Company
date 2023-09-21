import {
  Button,
  CardContent,
  CardActions,
  CardMedia,
  Card,
  Typography,
} from "@mui/material";

import Carousel from "react-material-ui-carousel";

import { NextIcon, PrevIcon } from "../../assets/CustomIcon";
import { carouselButton } from "../../styles/Button";

const CustomCarousel = (items) => {
  return (
    <Carousel
      NextIcon={<NextIcon />}
      PrevIcon={<PrevIcon />}
      indicators={false}
      className="carousel"
      autoPlay={false}
      height="1000px"
      navButtonsAlwaysVisible={false}
      navButtonsProps={{
        style: {
          backgroundColor: "inherit",
          fill: "#fff",
        },
      }}
    >
      {Object.values(items).map((item) => (
        <Card
          key={item.image}
          sx={{
            position: "relative",
            maxHeight: 1000,
            height: "inherit",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CardMedia
            image={item.image}
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
              height: "100%",
              width: "100%",
            }}
          />
          <CardContent
            sx={{
              position: "relative",
              backgroundColor: "transparent",
              color: "black",
              marginBottom: 2,
              "&": {
                color: "#fff",
              },
            }}
          >
            <Typography
              gutterBottom
              variant="h4"
              component="h2"
              sx={{
                marginBottom: 4,
              }}
            >
              {item.name}
            </Typography>
            <Typography
              variant="body2"
              component="p"
              sx={{
                color: "#fff",
                fontSize: "15px",
                lineHeight: "1.25em",
              }}
            >
              {item.description}
            </Typography>
          </CardContent>
          <CardActions
            sx={{
              position: "relative",
              backgroundColor: "transparent",
              "&": {
                color: "#fff",
              },
            }}
          >
            <Button
              size="large"
              color="inherit"
              variant="outlined"
              sx={carouselButton}
            >
              {item.button}
            </Button>
          </CardActions>
        </Card>
      ))}
    </Carousel>
  );
};

export default CustomCarousel;

import PropTypes from "prop-types";
import Slider from "react-slick";
import "./ImageSlider.scss";
import { useState } from "react";

const ImageSlider = (props) => {
  const { images = [] } = props;

  const slideImage = {
    slidesToShow: 3,
    slidesToScroll: 1,
    asNavFor: ".slider-for",
    dots: true,
    centerMode: true,
    focusOnSelect: true,
    background: "blue",
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: "40px",
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: "40px",
          slidesToShow: 1,
        },
      },
    ],
  };

  const mainImage = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
  };

  const [nav1, setNav1] = useState();
  const [nav2, setNav2] = useState();
  return (
    <>
      <Slider {...mainImage} asNavFor={nav1} ref={(c) => setNav2(c)}>
        {images.map((image, i) => (
          <img key={i} id={image} src={image} alt="image" />
        ))}
      </Slider>

      <Slider {...slideImage} asNavFor={nav2} ref={(c) => setNav1(c)}>
        {images.map((image, i) => (
          <img key={i} id={image} src={image} alt="image" />
        ))}
      </Slider>
    </>
  );
};

export default ImageSlider;

ImageSlider.propTypes = {
  images: PropTypes.array,
};

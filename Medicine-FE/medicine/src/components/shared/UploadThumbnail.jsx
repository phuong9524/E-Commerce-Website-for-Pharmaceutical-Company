import axios from "axios";
import PropTypes from "prop-types";
import "/Medicine-FE/medicine/src/styles/UploadImage.scss";
import { Box, Typography } from "@mui/material";
import { createRef, useState } from "react";

function UploadThumbnail({ thumbnail }) {
  const [img, setImg] = useState();
  const fileRef = createRef();

  const onFileInputChange = (e) => {
    handleUpload(e.target?.files?.[0]);
  };

  const handleUpload = async (e) => {
    const formData = new FormData();
    formData.append("file", e);
    formData.append("upload_preset", "dweeibvh");
    return await axios
      .post("https://api.cloudinary.com/v1_1/dwsae4gmt/image/upload", formData)
      .then((response) => {
        setImg(response.data.url);
        thumbnail(response.data.url);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignContent="center"
      justifyContent="flex-start"
      mb={2}
    >
      <Box display="flex" flexDirection="column" justifyContent="flex-start">
        <Typography pb={1} textAlign="left" fontSize="15px">
          Chọn hình đại diện cho bài viết
        </Typography>
        <img
          src={
            img ??
            "https://res.cloudinary.com/dwsae4gmt/image/upload/v1692284870/360_F_565224180_QNRiRQkf9Fw0dKRoZGwUknmmfk51SuSS_zjgmkm.jpg"
          }
          width="200"
          height="200"
          onClick={() => fileRef.current?.click()}
          style={{ cursor: "pointer" }}
        />

        <input
          type="file"
          style={{ display: "none" }}
          ref={fileRef}
          onChange={onFileInputChange}
          accept="image/png,image/jpeg,image/gif"
        />
        {/* <Button onClick={() => fileRef.current?.click()} color="success">
          Chọn
        </Button> */}
      </Box>
    </Box>
  );
}
export default UploadThumbnail;

UploadThumbnail.propTypes = {
  thumbnail: PropTypes.func,
};

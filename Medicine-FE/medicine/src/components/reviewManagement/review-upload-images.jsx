import {
  Button,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  ThemeProvider,
} from "@mui/material";
import { createRef, useState } from "react";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import axios from "axios";

import { authTheme } from "../../styles/Theme";
export const ReviewUploadImages = ({ imageData }) => {
  const [images, setImages] = useState([]);
  const folder = [];
  const fileRef = createRef();

  const onFileInputChange = (e) => {
    const maxAllowedImages = 4;

    const uploaders = Array.from(e.target.files)
      .slice(0, maxAllowedImages)
      .map((file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "dweeibvh");
        return axios
          .post(
            "https://api.cloudinary.com/v1_1/dwsae4gmt/image/upload",
            formData
          )
          .then((response) => {
            folder.push(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      });
    axios.all(uploaders).then(() => {
      setImages(images.concat(folder));
      imageData(images.concat(folder).map((item) => item.secure_url));
    });
  };

  const onClickToRemoveImage = (id) => {
    setImages(images.filter((item) => item.public_id !== id));
  };

  return (
    <div>
      {images.length !== 0 ? (
        <ImageList sx={{ width: 400, height: 80 }} cols={5} rowHeight={80}>
          {images?.map((item) => (
            <ImageListItem key={item}>
              <img
                src={`${item.secure_url}?w=80&h=80&fit=crop&auto=format`}
                srcSet={`${item.secure_url}?w=80&h=80&fit=crop&auto=format&dpr=2 2x`}
                alt={item.title}
                loading="lazy"
              />
              <ImageListItemBar
                sx={{
                  background:
                    "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
                    "rgba(0,0,0,0.3) 50%, rgba(0,0,0,0) 100%)",
                }}
                position="top"
                actionIcon={
                  <IconButton
                    onClick={() => onClickToRemoveImage(item.public_id)}
                    sx={{ color: "white" }}
                    aria-label={`star ${item.title}`}
                  >
                    <HighlightOffIcon />
                  </IconButton>
                }
              />
            </ImageListItem>
          ))}
          <ImageListItem sx={{ justifyContent: "center", display: "flex" }}>
            <input
              id="file-input"
              type="file"
              style={{ display: "none" }}
              ref={fileRef}
              multiple
              onChange={onFileInputChange}
              accept="image/png,image/jpeg,image/gif,image/webp"
            />
            <img
              loading="lazy"
              onClick={() => fileRef.current?.click()}
              style={{ cursor: "pointer" }}
              src="https://res.cloudinary.com/dwsae4gmt/image/upload/v1693563463/1200px-Plus_symbol.svg_ml8t27.png"
            />
          </ImageListItem>
        </ImageList>
      ) : (
        <>
          <input
            id="file-input"
            type="file"
            style={{ display: "none" }}
            ref={fileRef}
            multiple
            onChange={onFileInputChange}
            accept="image/png,image/jpeg,image/gif,image/webp"
          />
          <ThemeProvider theme={authTheme}>
            <Button onClick={() => fileRef.current?.click()}>Thêm ảnh</Button>
          </ThemeProvider>
        </>
      )}
    </div>
  );
};

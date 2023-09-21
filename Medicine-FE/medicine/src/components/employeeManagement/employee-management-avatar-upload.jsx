import axios from "axios";

import "/Medicine-FE/medicine/src/styles/UploadImage.scss";
import { Box, Button } from "@mui/material";
import { createRef } from "react";

function EmployeeManagementAvatarUpload({ image }) {
  const fileRef = createRef();

  const onFileInputChange = (e) => {
    handleUpload(e.target?.files?.[0]);
  };

  const handleUpload = (e) => {
    const formData = new FormData();
    formData.append("file", e);
    formData.append("upload_preset", "dweeibvh");
    return axios
      .post("https://api.cloudinary.com/v1_1/dwsae4gmt/image/upload", formData)
      .then((response) => {
        image(response.data.url);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Box display="flex" justifyContent="center">
      <input
        type="file"
        style={{ display: "none" }}
        ref={fileRef}
        onChange={onFileInputChange}
        accept="image/png,image/jpeg,image/gif"
      />
      <Button color="success" onClick={() => fileRef.current?.click()}>
        Cập nhật ảnh dại diện
      </Button>
    </Box>
  );
}
export default EmployeeManagementAvatarUpload;

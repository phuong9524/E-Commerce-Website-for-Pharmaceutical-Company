import axios from "axios";
import PropTypes from "prop-types";
import "/Medicine-FE/medicine/src/styles/UploadImage.scss";
import { Avatar, Box } from "@mui/material";
import { createRef, useState } from "react";
import { patchModifyInfo } from "../../api/userApiService";
import { toast } from "react-toastify";
import { ButtonAnimation } from "./ButtonAnimation";
import CachedIcon from "@mui/icons-material/Cached";

export const UploadAvatar = ({
  defaultAvatar,
  id,
  width,
  height,
  image,
  isPersonal,
}) => {
  const [avatar, setAvatar] = useState();
  const [animationState, setAnimationState] = useState();
  const fileRef = createRef();

  const onFileInputChange = (e) => {
    handleUpload(e.target?.files?.[0]);
  };

  const handleUpload = async (e) => {
    setAnimationState("running");
    const formData = new FormData();
    formData.append("file", e);
    formData.append("upload_preset", "dweeibvh");
    await axios
      .post("https://api.cloudinary.com/v1_1/dwsae4gmt/image/upload", formData)
      .then((response) => {
        setAvatar(response.data.url);

        if (isPersonal === true) {
          ChangeAvatar(response.data.url);
        } else {
          image(response.data.url);
          setAnimationState("paused");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const ChangeAvatar = async (avt) => {
    const response = await patchModifyInfo({ id, avatar: avt });
    if (response && response.status === 200) {
      setAnimationState("paused");
      toast.success("Cập nhật ảnh thành công");
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      flexDirection={"column"}
      alignItems={"center"}
      gap={2}
    >
      <Avatar
        sx={{ width: width, height: height }}
        src={avatar ?? defaultAvatar}
      />

      <input
        type="file"
        style={{ display: "none" }}
        ref={fileRef}
        onChange={onFileInputChange}
        accept="image/png,image/jpeg,image/gif"
      />

      <ButtonAnimation
        onClick={() => fileRef.current?.click()}
        animationState={animationState}
        animationIcon={<CachedIcon />}
        title={"Cập nhật avatar"}
      />
    </Box>
  );
};

UploadAvatar.propTypes = {
  isPersonal: PropTypes.bool,
  image: PropTypes.func,
  defaultAvatar: PropTypes.string,
  id: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
};

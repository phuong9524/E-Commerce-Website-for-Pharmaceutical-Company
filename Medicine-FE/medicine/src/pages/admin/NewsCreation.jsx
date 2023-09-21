import { Box, Button, Container, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { Editor } from "@tinymce/tinymce-react";
import { useRef, useState } from "react";
import { FormInputInfo } from "../../components/shared/FormInputInfo";
import UploadThumbnail from "../../components/shared/UploadThumbnail";
import { useNavigate } from "react-router-dom";
import { adminRoute } from "../../routes/routes";
import { postNews } from "../../api/newsfeedApiService";

export const NewsCreation = () => {
  const navigate = useNavigate();
  const editorRef = useRef(null);
  const [news, setNews] = useState({
    title: "",
    intro: "",
    thumbnail: "",
  });

  const thumbnail = (thumbnail) => {
    setNews({ ...news, thumbnail: thumbnail });
  };
  const onCLickToCreate = async () => {

    const response = await postNews({
      title: news.title,
      content: editorRef.current.getContent(),
      image: news.thumbnail,
    });
    if (response && response.status === 201) {
      navigate(`/admin/${adminRoute.newsManagement}`);
    }
  };
  return (
    <Box
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={2}>
          <Grid xs={12} sm={12} md={12} lg={12}>
            <Typography fontWeight="bold" fontSize="22.575px" textAlign="left">
              Tạo bài viết
            </Typography>
          </Grid>
          <Grid xs={12} sm={10} md={5} lg={5}>
            <FormInputInfo
              label="Tiêu đề"
              value={news.title}
              onChange={(event) => {
                setNews({
                  ...news,
                  title: event.target.value,
                });
              }}
            />
            <FormInputInfo
              label="Mô tả (không quá 100 từ) "
              isMultiline={true}
              height={100}
              value={news.intro}
              onChange={(event) => {
                setNews({
                  ...news,
                  intro: event.target.value,
                });
              }}
            />
          </Grid>
          <Grid
            xs={12}
            sm={10}
            md={7}
            lg={7}
            display="flex"
            justifyContent="center"
          >
            <UploadThumbnail thumbnail={thumbnail} />
          </Grid>
          <Grid xs={12} sm={12} md={12} lg={12}>
            <Editor
              apiKey="xanhsczdfg13tdoudnr975pb62ttq0g3uiwsw0rteaf9cd7t"
              onInit={(evt, editor) => (editorRef.current = editor)}
              init={{
                branding: false,
                height: 500,
                menubar: true,
                plugins:
                  "preview searchreplace autolink directionality visualblocks visualchars fullscreen image link media codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount",
                toolbar:
                  "formatselect | bold italic underline strikethrough | forecolor backcolor blockquote | link image media | alignleft aligncenter alignright alignjustify | numlist bullist outdent indent | removeformat",
                image_advtab: true,
                content_style:
                  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              }}
            />
            <Box
              sx={{ display: "flex", justifyContent: "space-evenly" }}
              pt={2}
            >
              <Button
                type="submit"
                variant="contained"
                color="error"
                sx={{
                  textTransform: "none",
                  borderRadius: 2,
                  boxShadow: "none",
                  width: 100,
                }}
                onClick={() => navigate(`/admin/${adminRoute.newsManagement}`)}
              >
                Hủy
              </Button>

              <Button
                onClick={onCLickToCreate}
                type="submit"
                variant="contained"
                color="success"
                sx={{
                  textTransform: "none",
                  borderRadius: 2,
                  boxShadow: "none",
                  width: 100,
                }}
              >
                Lưu
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

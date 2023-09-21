import { Box, Container } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getNewsDetails } from "../../api/newsfeedApiService";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

export const NewsDetails = () => {
  const location = useLocation();
  console.log(location.state);
  const [postContent, setPostContent] = useState();

  useEffect(() => {
    const getDetails = async () => {
      const response = await getNewsDetails(location.state);
      if (response && response.status === 200) {
        setPostContent(`${response.data.content}`);
        console.log(response.data);
      }
    };
    getDetails();
  }, [location]);

  return (
    <Box
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth="lg">
        <Grid container>
          <div dangerouslySetInnerHTML={{ __html: postContent }} />
        </Grid>
      </Container>
    </Box>
  );
};

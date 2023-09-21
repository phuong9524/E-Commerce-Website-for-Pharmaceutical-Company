import { Box, Card, CardContent, Container, Stack } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { PersonalAccountBasicInfo } from "../../components/personalAccount/personal-account-basic-info";
import { PersonalAccountChangePassword } from "../../components/personalAccount/personal-account-change-password";
import { UploadAvatar } from "../../components/shared/UploadAvatar";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getInfoUser } from "../../api/userApiService";

export const PersonalInfoCustomer = () => {
  const user = useSelector((state) => state.user.user);
  const [info, setInfo] = useState([]);

  useEffect(() => {
    const fetchInfo = async () => {
      const response = await getInfoUser({ id: user.id });
      if (response && response.status === 200) {
        setInfo(response.data);
      }
    };
    fetchInfo();
  }, []);
  

  return (
    <Box
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid xs={12} sm={12} md={12} lg={4}>
            <Card
              sx={{
                borderRadius: "20px",
                boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
              }}
            >
              <CardContent>
                <UploadAvatar defaultAvatar={info?.avatar} id={info?.id} width={300} height={300} isPersonal/>
              </CardContent>
            </Card>
          </Grid>
          <Grid xs={12} sm={12} md={12} lg={8}>
            <Stack gap={4}>
              <PersonalAccountBasicInfo info={info} />
              <PersonalAccountChangePassword />
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

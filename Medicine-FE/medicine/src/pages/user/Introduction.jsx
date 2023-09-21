import {
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
  Grow,
  List,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { useState } from "react";

const Introduction = () => {
  const [checked, setChecked] = useState(true);

  return (
    <Container maxWidth="lg" sx={{ textAlign: "left" }}>
      <Grid container pt={2}>
        <Grid xs={12}>
          <Grow in={checked} timeout={2000}>
            <Card sx={{ border: "none", boxShadow: "none" }}>
              <CardHeader
                title={"LỜI CHÀO TỪ PHƯƠNG PHÁT"}
                titleTypographyProps={{ variant: "h4", fontWeight: "bold" }}
              />

              <CardContent>
                <Typography
                  sx={{ fontWeight: "bold", textAlign: "left" }}
                  variant="subtitle1"
                  gutterBottom
                >
                  Xin chào quý khách hàng, đối tác, bạn bè của Dược phẩm Phương
                  Phát!
                </Typography>
                <Typography sx={{ marginBottom: "16px" }}>
                  Chúng tôi chào đón các bạn đến với trang web của Dược phẩm
                  Phương Phát, để hiểu hơn và đồng hành ủng hộ chúng tôi trong
                  chặng đường phát triển sắp tới.
                </Typography>
                <Typography sx={{ marginBottom: "16px" }}>
                  Dược phẩm Phương Phát được thành lập năm 2023 từ truyền thống
                  gia đình và niềm đam mê với lĩnh vực Dược học, Y học của những
                  người sáng lập. Ngay từ khi thành lập, chúng tôi đã xác định
                  mục tiêu của doanh nghiệp là tạo ra những sản phẩm dược phẩm,
                  thực phẩm và mỹ phẩm chăm sóc sức khỏe tốt nhất, nâng cao chất
                  lượng cuộc sống cho người dân.
                </Typography>
                <Typography sx={{ marginBottom: "16px" }}>
                  Chúng tôi hiểu rằng, một doanh nghiệp muốn phát triển bền vững
                  thì phải cung cấp những sản phẩm chất lượng, giữ được uy tín
                  với khách hàng. Khách hàng chính là những vị giám khảo công
                  bằng nhất, quyết định sự tồn tại và phát triển của mỗi doanh
                  nghiệp. Vì vậy, mỗi thành viên Phương Phát phải nỗ lực không
                  ngừng, cẩn trọng, tỉ mỉ, chu đáo đối với từng việc nhỏ nhất,
                  để sản phẩm, dịch vụ của công ty luôn làm hài lòng khách hàng.
                </Typography>
                <Typography sx={{ marginBottom: "16px" }}>
                  Website của Phương Phát được thiết kế để bạn hiểu hơn về chúng
                  tôi bằng những hình ảnh trực quan sinh động, những thông tin
                  được đưa ra có hệ thống, bao gồm: những câu chuyện về các sản
                  phẩm của Phương Phát, những tin tức sự kiện chúng tôi tổ chức
                  hoặc đồng hành, những giải thưởng uy tín mà Phương Phát đạt
                  được… Đặc biệt nhất là những hoạt động cộng đồng đã gắn bó
                  chúng tôi với người dân trên mọi miền đất nước.
                </Typography>
                <Typography
                  sx={{ fontWeight: "bold", textAlign: "left" }}
                  variant="subtitle1"
                  gutterBottom
                >
                  Trân trọng cảm ơn!
                </Typography>
              </CardContent>
            </Card>
          </Grow>
        </Grid>

        <Grid xs={12}>
          <Grow in={checked} timeout={2000}>
            <Card sx={{ border: "none", boxShadow: "none" }}>
              <CardHeader
                title={"GIỚI THIỆU CHUNG"}
                titleTypographyProps={{ variant: "h4", fontWeight: "bold" }}
              />
              <CardContent>
                <Typography sx={{ marginBottom: "16px" }} component="div">
                  Công ty TNHH Dược phẩm Phương Phát được thành lập từ năm 2023
                  bởi những người thầy thuốc (những dược sỹ và bác sỹ), là doanh
                  nghiệp trực tiếp sản xuất, kinh doanh dược phẩm, thực phẩm, mỹ
                  phẩm chăm sóc sức khỏe.
                </Typography>
                <Typography sx={{ marginBottom: "16px" }} component="div">
                  Phương Phát liên tục đầu tư cơ sở vật chất và nguồn nhân lực
                  để trở thành một Công ty Dược phẩm hàng đầu, phục vụ khách
                  hàng thông qua việc nghiên cứu, phát triển các giải pháp mới,
                  các sản phẩm ưu việt để chăm sóc, bảo vệ, cải thiện sức khỏe
                  cộng đồng, góp phần mang lại một cuộc sống khỏe mạnh và hạnh
                  phúc hơn cho mỗi gia đình Việt.
                </Typography>
                <Typography sx={{ marginBottom: "16px" }} component="div">
                  Vì Phương Phát là một công ty chuyên sản xuất các sản phẩm từ
                  dược liệu, nên công ty rất coi trọng nguồn cung nguyên vật
                  liệu đầu vào. Công ty hợp tác với những nhà cung cấp dược liệu
                  uy tín, đưa ra tiêu chuẩn và tham gia giám sát chặt chẽ để đảm
                  bảo dược liệu luôn tốt, sạch, giá thành hợp lý.
                </Typography>
              </CardContent>
            </Card>
          </Grow>
        </Grid>
        <Grid xs={12}>
          <Grow in={checked} timeout={2000}>
            <Card sx={{ border: "none", boxShadow: "none" }}>
              <CardHeader
                title={"TẦM NHÌN"}
                titleTypographyProps={{ variant: "h4", fontWeight: "bold" }}
              />
              <CardContent>
                <List>
                  <ListItemText sx={{ marginBottom: "16px" }} component="div">
                    Công ty TNHH Dược phẩm Phương Phát xác định mục tiêu trở
                    thành một trong những công ty Dược phẩm hàng đầu của Việt
                    Nam trong việc:
                  </ListItemText>
                  <ListItemText component="div">
                    - Cung cấp những sản phẩm chất lượng cao, dịch vụ tốt.
                  </ListItemText>
                  <ListItemText component="div">
                    - Nỗ lực phát triển tập trung vào các sản phẩm riêng của
                    Phương Phát, luôn hướng tới vị trí dẫn đầu trong dòng sản
                    phẩm đó.
                  </ListItemText>
                  <ListItemText component="div">
                    - Mở rộng và nâng cao hệ thống phân phối, cung ứng trên toàn
                    quốc.
                  </ListItemText>
                  <ListItemText component="div">
                    - Xây dựng một môi trường làm việc chuyện nghiệp, đào tạo
                    đội ngũ cán bộ có chuyên môn giỏi, nhiệt tình và có trách
                    nhiệm.
                  </ListItemText>
                </List>
              </CardContent>
              <CardMedia
                component="img"
                sx={{ width: "100%", marginBottom: "40px" }}
                image="https://acabiz.vn/backend/images/blog_images/1799989833.png"
              />
            </Card>
          </Grow>
        </Grid>
        <Grid xs={12}>
          <Grow in={checked} timeout={1000}>
            <Card sx={{ border: "none", boxShadow: "none" }}>
              <CardHeader
                title={"SỨ MỆNH"}
                titleTypographyProps={{ variant: "h4", fontWeight: "bold" }}
              />
              <CardContent>
                <Stack gap={2}>
                  <Typography>
                    <Box component="span" fontWeight={"bold"}>
                      - Với khách hàng:
                    </Box>{" "}
                    Tạo ra những sản phẩm chất lượng tốt nhất, góp phần chăm sóc
                    sức khỏe và nâng cao chất lượng cuộc sống.
                  </Typography>

                  <Typography>
                    <Box component="span" fontWeight={"bold"}>
                      - Với Quốc gia:
                    </Box>{" "}
                    Góp phần xây dựng Thương hiệu Quốc gia, nâng cao chất lượng
                    và uy tín Thương hiệu sản phẩm Việt Nam.
                  </Typography>

                  <Typography>
                    <Box component="span" fontWeight={"bold"}>
                      - Với nhân viên:
                    </Box>{" "}
                    Tạo môi trường làm việc thân thiện, gắn bó, gần gũi như gia
                    đình. Giúp nhân viên phát triển bản thân, có thu nhập ổn
                    định và tăng dần.
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          </Grow>
        </Grid>
        <Grid xs={12}>
          <Grow in={checked} timeout={1000}>
            <Card sx={{ border: "none", boxShadow: "none" }}>
              <CardHeader
                title={"GIÁ TRỊ CỐT LÕI"}
                titleTypographyProps={{ variant: "h4", fontWeight: "bold" }}
              />
              <CardContent sx={{ flex: "1 0 auto" }}>
                <Stack gap={2}>
                  <Typography>
                    <Box component="span" fontWeight={"bold"}>
                      - Chuyên môn vững vàng:
                    </Box>{" "}
                    Tích cực trau dồi chuyên môn trong lĩnh vực công việc của
                    mình.
                  </Typography>

                  <Typography>
                    <Box component="span" fontWeight={"bold"}>
                      - Tư duy sáng tạo:
                    </Box>{" "}
                    Khích lệ sáng tạo nhằm tạo ra giá trị mới và sự tiến bộ.
                  </Typography>

                  <Typography>
                    <Box component="span" fontWeight={"bold"}>
                      - Ứng dụng khoa học:
                    </Box>{" "}
                    Áp dụng công nghệ, khoa học kỹ thuật tiên tiến nhất.
                  </Typography>

                  <Typography>
                    <Box component="span" fontWeight={"bold"}>
                      - Ý thức trách nhiệm:
                    </Box>{" "}
                    Nỗ lực hoàn thành công việc với kết quả tốt nhất, đảm bảo
                    tính cam kết cao, sẵn sàng chịu trách nhiệm, không đổ lỗi.
                  </Typography>

                  <Typography>
                    <Box component="span" fontWeight={"bold"}>
                      - Không ngừng cải tiến:
                    </Box>{" "}
                    Luôn tư duy tìm cách cải tiến để tạo ra sản phẩm, dịch vụ
                    tốt hơn hiện tại.
                  </Typography>

                  <Typography>
                    <Box component="span" fontWeight={"bold"}>
                      - Uy tín chất lượng:
                    </Box>{" "}
                    Chăm sóc chất lượng sản phẩm, dịch vụ một cách cẩn trọng,
                    xây dựng uy tín doanh nghiệp một cách chân thành.
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          </Grow>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Introduction;

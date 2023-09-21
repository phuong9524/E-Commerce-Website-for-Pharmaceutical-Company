import { Box, Typography } from "@mui/material";

const ProductInformation = (props) => {
  const { info = [] } = props;

  return (
    <Box
      display="flex"
      flexDirection="column"
      textAlign="left"
      rowGap={2}
      padding={2}
    >
      <Typography variant="h6" marginBottom={2}>
        THÔNG TIN SẢN PHẨM
      </Typography>
      <Box>
        <Typography variant="subtitle1" fontWeight="bold">
          Mô tả
        </Typography>
        <Typography variant="body1">{info?.description}</Typography>
      </Box>
      <Box>
        <Typography variant="subtitle1" fontWeight="bold">
          Công dụng
        </Typography>
        <Typography variant="body1">{info?.use}</Typography>
      </Box>

      <Box>
        <Typography variant="subtitle1" fontWeight="bold">
          Thành phần
        </Typography>
        <Typography variant="body1">{info?.materials?.join(", ")}</Typography>
      </Box>
      <Box>
        <Typography variant="subtitle1" fontWeight="bold">
          Đối tượng sử dụng
        </Typography>
        <Typography variant="body1">{info?.userObject}</Typography>
      </Box>
      <Box>
        <Typography variant="subtitle1" fontWeight="bold">
          Cách dùng
        </Typography>
        <Typography variant="body1">{info?.userGuide}</Typography>
      </Box>
      <Box>
        <Typography variant="subtitle1" fontWeight="bold">
          Bảo quản
        </Typography>
        <Typography variant="body1">{info?.storage}</Typography>
      </Box>
    </Box>
  );
};

export default ProductInformation;

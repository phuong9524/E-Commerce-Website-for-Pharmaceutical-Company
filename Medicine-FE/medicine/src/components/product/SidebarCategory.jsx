import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  Rating,
  Slider,
  Stack,
  Typography,
} from "@mui/material";
import { carouselButton } from "../../styles/Button";
import { styled } from "@mui/material/styles";
import { COLORS } from "../../utils/Constants";
import { checkBox } from "../../styles/CheckBox";
import { useEffect, useState } from "react";
import { getProductCategories } from "../../api/categoryApiService";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { CustomersSearch } from "../customer/customers-search";
import { FormInputCategory } from "../shared/FormInputCategory";

const PrettoSlider = styled(Slider)({
  color: COLORS.mainColor,
  height: 10,
  width: "100%",
  "& .MuiSlider-track": {
    border: "none",
  },
  "& .MuiSlider-thumb": {
    height: 16,
    width: 16,
    backgroundColor: COLORS.mainColor,
    color: "white",
    border: "2px solid currentColor",
    "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
      boxShadow: "inherit",
    },
    "&:before": {
      display: "none",
    },
  },
  "& .MuiSlider-valueLabel": {
    lineHeight: 1.2,
    fontSize: 12,
    background: "unset",
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: "50% 50% 50% 0",
    backgroundColor: COLORS.mainColor,
    transformOrigin: "bottom left",
    transform: "translate(50%, -100%) rotate(-45deg) scale(0)",
    "&:before": { display: "none" },
    "&.MuiSlider-valueLabelOpen": {
      transform: "translate(50%, -100%) rotate(-45deg) scale(1)",
    },
    "& > *": {
      transform: "rotate(45deg)",
    },
  },
});

const sortTypes = [
  { id: 1, name: "Mới nhất" },
  { id: 2, name: "Bán chạy" },
  { id: 3, name: "Phổ biến" },
];

const SidebarCategory = (props) => {
  const { sort, type } = props;

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategorises = async () => {
      const response = await getProductCategories();
      if (response && response.status === 200) {
        setCategories(response?.data);
      }
    };
    fetchCategorises();
  }, []);

  return (
    <Card
      sx={{
        bgcolor: "backgroudn.paper",

        boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
        borderRadius: 3,
      }}
    >
      <CardContent>
        <Stack gap={1}>
          <Box
            display={"flex"}
            justifyContent="space-between"
            alignItems={"center"}
          >
            <Typography sx={{ fontWeight: "bold" }}>Bộ lọc</Typography>
            {/* <Button sx={carouselButton} component="div">
              <Typography sx={{ color: "black" }} textTransform="none">
                Reset
              </Typography>
            </Button> */}
          </Box>
          <Divider />
          <FormInputCategory
            label={"Danh mục"}
            data={categories}
            onChange={(event) => type(event.target.value)}
          />

          <FormInputCategory
            label={"Sắp xếp"}
            data={sortTypes}
            onChange={(event) => sort(event.target.value)}
          />
        </Stack>
      </CardContent>
    </Card>
  );
};

export default SidebarCategory;

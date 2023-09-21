import { styled } from "@mui/material/styles";
import Checkbox from "@mui/material/Checkbox";

import { COLORS } from "../../utils/Constants";

const BpIcon = styled("span")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: 0,
  width: 13,
  height: 13,
  border: "1px solid" + COLORS.text,
  //   boxShadow:
  //     theme.palette.mode === "dark"
  //       ? "0 0 0 1px rgb(16 22 26 / 40%)"
  //       : "inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)",
  backgroundColor: theme.palette.mode === "dark" ? "red" : COLORS.background,
  // backgroundImage:
  //   theme.palette.mode === "dark"
  //     ?
  //     "linear-gradient(180deg,hsla(0,0%,100%,.05),hsla(0,0%,100%,0))"
  //     : "linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))",
  // ".Mui-focusVisible &": {
  //   outline: "2px auto rgba(19,124,189,.6)",
  //   outlineOffset: 2,
  // },
  "input:hover ~ &": {
    backgroundColor: theme.palette.mode === "dark" ? "#30404d" : "#ebf1f5",
  },
  "input:disabled ~ &": {
    boxShadow: "none",
    background:
      theme.palette.mode === "dark"
        ? "rgba(57,75,89,.5)"
        : "rgba(206,217,224,.5)",
  },
}));

const BpCheckedIcon = styled(BpIcon)({
  backgroundImage:
    "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
  "&:before": {
    display: "flex",
    width: 5,
    height: 5,
    fontSize: 1,
    borderRadius: "50%",
    content: '""',
    backgroundColor: COLORS.text,
  },
  "input:hover ~ &": {
    backgroundColor: COLORS.background,
  },
});

export function AuthCheckbox(props) {
  return (
    <Checkbox
      sx={{
        "&:hover": { bgcolor: "transparent" },
      }}
      disableRipple
      checkedIcon={<BpCheckedIcon />}
      icon={<BpIcon />}
      inputProps={{ "aria-label": "Checkbox demo" }}
      {...props}
    />
  );
}

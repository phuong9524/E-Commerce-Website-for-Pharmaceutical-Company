import { COLORS } from "../utils/Constants";

export const authInput = {
  "&": {
    color: COLORS.text,
    paddingLeft: 1,
  },

  "&:before": {
    borderBottomColor: COLORS.text + "!important",
  },

  "&:after": {
    borderBottomColor: COLORS.text + "!important",
  },

  //   "& .MuiInput-underline:before": { borderBottomColor: COLORS.text + "!important" },
  //   "& .MuiInput-underline:after": { borderBottomColor: COLORS.text + "!important" },
};

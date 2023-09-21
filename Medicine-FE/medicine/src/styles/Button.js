import { green } from "@mui/material/colors";
import { COLORS } from "../utils/Constants";

export const carouselButton = {
  "&": {
    borderRadius: 5,
    fontSize: 16,
  },

  "&:hover": {
    backgroundColor: "#fffff",
    borderColor: "#ffffff",
    color: "black",
  },
};

export const authButton = {
  "&": {
    borderRadius: 0,
    fontSize: 16,
    width: "100%",
  },

  "&:hover": {
    backgroundColor: "fffff",
    borderColor: "ffffff",
    color: "black",
  },
};

export const underlineButton = {
  transition: "text-decoration 350ms ease",
  textDecoration: "underline transparent",
  textUnderlineOffset: "8px",
  fontSize: 15,
  fontWeight: "bold",

  "&:hover": {
    textDecoration: "underline",
    textUnderlineOffset: "8px",
  },
};

export const buyButton = {
  "&": {
    paddingLeft: 2,
    paddingRight: 2,
    borderRadius: 3,
    fontSize: 16,
    color: "#fff",
    backgroundColor: COLORS.background,
    border: "solid",
  },

  "&:hover": {
    border: "solid",
    backgroundColor: "#fff",
    borderColor: COLORS.mainColor,
    color: COLORS.mainColor,
  },
};

export const addToCartButton = {
  "&": {
    paddingLeft: 2,
    paddingRight: 2,
    borderRadius: 3,
    fontSize: 16,
    color: COLORS.background,
    backgroundColor: green[50],
    border: "rounded",
  },

  "&:hover": {
    backgroundColor: "#fff",
    borderColor: COLORS.mainColor,
    color: COLORS.mainColor,
  },
};

export const optionsButton = {
  "&": {
    textTransform: "none",
    outlineWidth: "1px",
    outlineStyle: "solid",
  },
  "&.Mui-selected": {
    color: COLORS.background,
    backgroundColor: green[50],

    outlineColor: COLORS.mainColor,
    outlineWidth: "1px",
    outlineStyle: "solid",
  },

  "&:hover": {
    backgroundColor: "#fff",
    outlineWidth: "1px",
    outlineStyle: "solid",
    outlineColor: COLORS.mainColor,
    color: COLORS.mainColor,
  },
};

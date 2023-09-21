import { Button, SvgIcon } from "@mui/material";
import PropTypes from "prop-types";

import { COLORS } from "../../utils/Constants";

export const ButtonAnimation = (props) => {
  const { onClick, animationState = "paused", animationIcon, title } = props;

  return (
    <Button
      onClick={onClick}
      startIcon={
        <SvgIcon
          fontSize="small"
          sx={{
            animation: `spin 2s linear infinite ${animationState}`,
            "@keyframes spin": {
              "0%": {
                transform: "rotate(360deg)",
              },
              "100%": {
                transform: "rotate(0deg)",
              },
            },
          }}
        >
          {animationIcon}
        </SvgIcon>
      }
      variant="contained"
      sx={{
        boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
        borderRadius: "5px",
        backgroundColor: "#fff",
        outline: "1px solid",
        textTransform: "none",
        color: COLORS.background,
        ":hover": {
          backgroundColor: COLORS.background,
          color: "#fff",
          outline: "1px solid",
          outlineColor: COLORS.background,
        },
      }}
    >
      {title}
    </Button>
  );
};

ButtonAnimation.propTypes = {
  onClick: PropTypes.func,
  animationState: PropTypes.string,
  animationIcon: PropTypes.object,
  title: PropTypes.string,
};

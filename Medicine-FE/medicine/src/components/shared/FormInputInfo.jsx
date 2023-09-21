import PropTypes from "prop-types";
import {
  Typography,
  Box,
  InputAdornment,
  Paper,
  InputBase,
  SvgIcon,
  IconButton,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import ErrorIcon from "@mui/icons-material/Error";
import { useState } from "react";

const FormInputInfo = ({
  id,
  label,
  name,
  type,
  placeholder,
  isIconActive,
  isMultiline,
  height,
  defaultValue,
  disabled,
  onChange,
  value,
  require,
  isError,
  errorContent,
  isShowPassword,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
    isShowPassword(showPassword ? "password" : "text");
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignContent="center"
      justifyContent="flex-start"
      mb={2}
    >
      <Box display="flex" flexDirection="column" justifyContent="flex-start">
        <Typography pb={1} textAlign="left" fontSize="15px">
          {label}{" "}
          {require === true ? (
            <SvgIcon fontSize="1px" viewBox="0 1 7 6">
              <ErrorIcon color="error" />
            </SvgIcon>
          ) : (
            " "
          )}
        </Typography>
        <Paper
          variant="outlined"
          sx={{
            width: "100%",
            height: { height },
            // border: "0.1rem solid #EEF0F6",
            boxShadow: "none",
            borderRadius: "8px",
            ":hover": {
              boxShadow: "rgba(0, 0, 0, 0.15) 0px 2px 8px",
            },
          }}
        >
          <InputBase
            error={true}
            required={require}
            value={value}
            disabled={disabled}
            onChange={onChange}
            defaultValue={defaultValue}
            multiline={isMultiline}
            maxRows={4}
            name={name}
            type={type}
            id={id}
            placeholder={placeholder}
            fullWidth
            sx={{
              p: 1,
              fontSize: "15px",
              "& .MuiInputBase-input.Mui-disabled": {
                WebkitTextFillColor: "#000000",
              },
            }}
            endAdornment={
              isIconActive && (
                <InputAdornment position="end" sx={{ pr: 1 }}>
                  <IconButton
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              )
            }
          />
        </Paper>
        {isError === true ? (
          <Typography pt={1} textAlign="left" fontSize="15px" color={"error"}>
            {errorContent}
          </Typography>
        ) : (
          <></>
        )}
      </Box>
    </Box>
  );
};

export { FormInputInfo };

FormInputInfo.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  isIconActive: PropTypes.bool,
  isMultiline: PropTypes.bool,
  height: PropTypes.string,
  unit: PropTypes.string,
  defaultValue: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  value: PropTypes.string,
  require: PropTypes.bool,
  isError: PropTypes.bool,
  errorContent: PropTypes.string,
  isShowPassword: PropTypes.func,
};

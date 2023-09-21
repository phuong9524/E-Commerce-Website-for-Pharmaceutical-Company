import PropTypes from "prop-types";
import {
  Typography,
  Box,
  InputAdornment,
  IconButton,
  Paper,
  InputBase,
} from "@mui/material";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import { colors } from "../../styles/Theme";

const FormInputAuth = ({ id, label, name, type, placeholder, isIconActive }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignContent="center"
      justifyContent="flex-start"
      mb={2}
    >
      <Box display="flex" flexDirection="column" justifyContent="flex-start">
        <Typography color="white" pb={1} textAlign="left" fontWeight="bold">
          {label}
        </Typography>
        <Paper
          sx={{
            background: colors.input[500],
            width: "100%",
          }}
        >
          <InputBase
            name={name}
            type={type}
            id={id}
            placeholder={placeholder}
            fullWidth
            sx={{
              bgcolor: colors.input[500],
              p: 1,
              borderRadius: "5px",
            }}
            endAdornment={
              isIconActive && (
                <InputAdornment position="end" sx={{ pr: 1 }}>
                  <IconButton edge="end">
                    {type === "password" ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }
          />
          {/* <TextField
            fullWidth
            sx={{
              bgcolor: colors.input[500],
              p: 1,
              borderRadius: "5px",
            }}
            id={id}
            placeholder={placeholder}
            autoComplete={autoComplete}
            autoFocus={autoFocus}
            type={type}
            name={name}
          ></TextField> */}
        </Paper>
      </Box>
    </Box>
  );
};

export { FormInputAuth };

FormInputAuth.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  isIconActive: PropTypes.bool,
};

import PropTypes from "prop-types";
import {
  Typography,
  Box,
  FormControl,
  InputBase,
  styled,
  NativeSelect,
} from "@mui/material";
import { mapRoles } from "../../utils/mappingData";

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    height: "1.65rem",
    borderRadius: "8px",
    position: "relative",
    border: "1px solid #E0E0E0",
    fontSize: 16,
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),

    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    ":hover": {
      boxShadow: "rgba(0, 0, 0, 0.15) 0px 2px 8px",
    },
    "&:focus": {
      boxShadow: "rgba(0, 0, 0, 0.15) 0px 2px 8px",
    },
  },
}));

export const FormInputCategory = (props) => {
  const { label, name, data = [], onChange, value } = props;

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
          {label}
        </Typography>

        <FormControl>
          <NativeSelect
            name={name}
            value={value}
            onChange={onChange}
            input={<BootstrapInput />}
          >
            <option>{""}</option>
            {data.map((item) => (
              <option key={item.id ?? item.code ?? item} value={item.name ?? item}>
                {item.name ?? mapRoles[item]}
              </option>
            ))}
          </NativeSelect>
        </FormControl>
      </Box>
    </Box>
  );
};

FormInputCategory.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  data: PropTypes.array,
  onChange: PropTypes.func,
  value: PropTypes.any,
};

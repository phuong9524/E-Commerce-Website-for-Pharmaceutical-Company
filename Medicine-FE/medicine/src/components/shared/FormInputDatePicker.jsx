import PropTypes from "prop-types";
import { Typography, Box, InputBase, styled } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import moment from "moment/moment";

export const FormInputDatePicker = (props) => {
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
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            onChange={onChange}
            format="dd/MM/yyyy"
            value={new Date(moment(value, "DD/MM/YYYY").toDate())}
            slotProps={{
              textField: {
                size: "medium",
                error: false,
              },
              
             
            }}
          />
        </LocalizationProvider>
      </Box>
    </Box>
  );
};

FormInputDatePicker.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  data: PropTypes.array,
  onChange: PropTypes.func,
  value: PropTypes.any,
};

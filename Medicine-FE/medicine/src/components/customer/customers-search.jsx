import PropTypes from "prop-types";
import MagnifyingGlassIcon from "@heroicons/react/24/solid/MagnifyingGlassIcon";
import {
  Card,
  InputAdornment,
  OutlinedInput,
  SvgIcon,
  ThemeProvider,
} from "@mui/material";
import { buttonSelectedTheme } from "../../styles/Theme";
import { useEffect, useState } from "react";

function useSearchDebounce(delay = 350) {
  const [search, setSearch] = useState(null);
  const [searchQuery, setSearchQuery] = useState(null);

  useEffect(() => {
    const delayFn = setTimeout(() => setSearch(searchQuery), delay);
    return () => clearTimeout(delayFn);
  }, [searchQuery, delay]);

  return [search, setSearchQuery];
}

export const CustomersSearch = (props) => {
  const { searchKeys, placeholder, sx } = props;
  const [search, setSearch] = useSearchDebounce();
  const handleGetSearchKeys = (event) => {
    // setSearch(event.target.value);
    searchKeys(event.target.value);
  };

  return (
    <ThemeProvider theme={buttonSelectedTheme}>
      <OutlinedInput
        onChange={(e) => handleGetSearchKeys(e)}
        defaultValue=""
        fullWidth
        placeholder={placeholder}
        color="primary"
        startAdornment={
          <InputAdornment position="start">
            <SvgIcon color="action" fontSize="small">
              <MagnifyingGlassIcon />
            </SvgIcon>
          </InputAdornment>
        }
        sx={{
          maxWidth: 500,
          borderRadius: "10px",
          boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
          fontWeight: "bold",

          ":hover": {
            backgroundColor: "#F6F6F7",
          },
          "&:hover fieldset": {
            borderColor: "#F6F6F7!important",
          },
          "& fieldset": { border: "none" },
        }}
      />
    </ThemeProvider>
  );
};

CustomersSearch.propTypes = {
  searchKeys: PropTypes.func,
  placeholder: PropTypes.string,
  sx: PropTypes.object,
};

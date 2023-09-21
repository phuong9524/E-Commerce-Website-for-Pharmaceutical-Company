import PropTypes from "prop-types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TableFooter,
  Button,
  ThemeProvider,
  SvgIcon,
  Box,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { buttonSelectedTheme } from "../../styles/Theme";
import TrashIcon from "@heroicons/react/24/solid/TrashIcon";
import { ScrollBar } from "../shared/ScrollBar";
import { FormInputInfo } from "../shared/FormInputInfo";

const tableHeader = [
  { label: "Tên nguyên liệu - hàm lượng", data: "ingredients" },

  { label: "", data: "" },
];

const MTable = (props) => {
  const { ingredientData = [], ingredients = [] } = props;
  const [users, setUsers] = useState(ingredients);

  const addTestItem = () => {
    const user = {
      id: Math.floor(Math.random() * 100000),
      name: "nguyên liệu 1",
    };

    const updateUsers = [...users, user];

    setUsers(updateUsers);
    ingredientData(updateUsers);
  };

  const deleteItem = (index) => {
    const newUsers = users.filter((user, i) => i !== index);
    setUsers(newUsers);
    ingredientData(newUsers);
  };

  return (
    <ScrollBar>
      <Box sx={{ minWidth: 400 }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              {tableHeader.map((cell) => (
                <TableCell key={cell.data}>{cell.label}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((row, i) => (
              <TableRow key={row.name}>
                <TableCell>
                  <FormInputInfo defaultValue={row.name} />
                </TableCell>

                <TableCell>
                  <ThemeProvider theme={buttonSelectedTheme}>
                    <SvgIcon sx={{ height: 20, width: 20, cursor: "pointer" }}>
                      <TrashIcon onClick={deleteItem.bind(this, i)} />
                    </SvgIcon>
                  </ThemeProvider>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={4}>
                <ThemeProvider theme={buttonSelectedTheme}>
                  <Typography>
                    <Button
                      color="primary"
                      onClick={addTestItem}
                      startIcon={<AddIcon />}
                    >
                      Thêm nguyên liệu
                    </Button>
                  </Typography>
                </ThemeProvider>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </Box>
    </ScrollBar>
  );
};

export default MTable;

MTable.propTypes = {
  ingredientData: PropTypes.func,
  ingredients: PropTypes.array,
};

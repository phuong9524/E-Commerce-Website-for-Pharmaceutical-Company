import PropTypes from "prop-types";
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { ScrollBar } from "../shared/ScrollBar";
import { getInitials } from "../../utils/GetInitials";
import { buttonSelectedTheme } from "../../styles/Theme";
import { SeverityPill } from "../shared/SeverityPill";
import { COLORS } from "../../utils/Constants";
import { useNavigate } from "react-router-dom";
import { adminRoute } from "../../routes/routes";

const statusMap = {
  stocking: "success",
  outOfStock: "error",
};

export const ProductManagementTable = (props) => {
  const {
    count = 0,
    items = [],
    onDeselectAll,
    onDeselectOne,
    onPageChange = () => {},
    onRowsPerPageChange,
    onSelectAll,
    onSelectOne,
    page = 0,
    rowsPerPage = 0,
    selected = [],
  } = props;

  const navigate = useNavigate();
  const selectedSome = selected.length > 0 && selected.length < items.length;
  const selectedAll = items.length > 0 && selected.length === items.length;

  return (
    <Card
      sx={{
        borderRadius: "20px",
        boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
      }}
    >
      <ScrollBar>
        <Box sx={{ minWidth: 1200 }}>
          <ThemeProvider theme={buttonSelectedTheme}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedAll}
                      indeterminate={selectedSome}
                      onChange={(event) => {
                        if (event.target.checked) {
                          onSelectAll?.();
                        } else {
                          onDeselectAll?.();
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    Tên sản phẩm
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Phân loại</TableCell>

                  <TableCell sx={{ fontWeight: "bold" }}>Giá</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Số lượng</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Đã bán</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Tình trạng</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {items?.map((product) => {
                  const isSelected = selected.includes(product.id);

                  return (
                    <TableRow hover key={product.id} selected={isSelected}>
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isSelected}
                          onChange={(event) => {
                            if (event.target.checked) {
                              onSelectOne?.(product.id);
                            } else {
                              onDeselectOne?.(product.id);
                            }
                          }}
                        />
                      </TableCell>
                      <TableCell
                        sx={{
                          cursor: "pointer",
                          ":hover": {
                            color: COLORS.mainColor,
                          },
                        }}
                        onClick={() =>
                          navigate(adminRoute.productEditing, {
                            state: product.id,
                          })
                        }
                      >
                        <Stack alignItems="center" direction="row" spacing={2}>
                          <Avatar src={product.images["0"]}>
                            {getInitials(product?.name)}
                          </Avatar>
                          <Typography variant="subtitle2">
                            {product.name}
                          </Typography>
                        </Stack>
                      </TableCell>
                      <TableCell>{product.type}</TableCell>

                      <TableCell>{product.price}</TableCell>
                      <TableCell>{product.quantity}</TableCell>
                      <TableCell>{/* {product.totalSold} */}</TableCell>
                      <TableCell>
                        {/* <SeverityPill color={statusMap[product.status.name]}>
                          {product.status.description}
                        </SeverityPill> */}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </ThemeProvider>
        </Box>
      </ScrollBar>
      <TablePagination
        labelRowsPerPage="Số sản phẩm hiển thị"
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

ProductManagementTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onDeselectAll: PropTypes.func,
  onDeselectOne: PropTypes.func,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onSelectAll: PropTypes.func,
  onSelectOne: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array,
};

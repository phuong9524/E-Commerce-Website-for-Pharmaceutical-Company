// import PropTypes from "prop-types";
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  IconButton,
  InputAdornment,
  InputBase,
  Paper,
  Rating,
  Stack,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { ScrollBar } from "../shared/ScrollBar";
import { getInitials } from "../../utils/GetInitials";
import { buttonSelectedTheme } from "../../styles/Theme";
import { SeverityPill } from "../shared/SeverityPill";
import { COLORS } from "../../utils/Constants";
import { useNavigate } from "react-router-dom";
import { adminRoute } from "../../routes/routes";
import MagnifyingGlassIcon from "@heroicons/react/24/solid/MagnifyingGlassIcon";
import { FormInputCategory } from "../shared/FormInputCategory";
import { useCallback, useEffect, useState } from "react";
import { getAllComment, getComment } from "../../api/commentApiService";
import { formatToFulldatetime } from "../../utils/FormatTime";

export const ReviewManagementTable = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowperPage] = useState(10);
  const [listReview, setListReview] = useState([]);

  const handlePageChange = (event, page) => {
    setPage(page);
  };

  const handleRowPerPageChange = useCallback((event) => {
    setRowperPage(event.target.value);
  }, []);

  const reviews = async () => {
    const response = await getAllComment({
      pageIndex: page + 1,
      pageSize: rowsPerPage,
    });
    if (response && response.status === 200) {
      setListReview(response.data);
    }
  };

  useEffect(() => {
    reviews();
  }, [page, rowsPerPage]);

  const handleClickSearch = (item) => {};

  return (
    <Card
      sx={{
        borderRadius: "20px",
        boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
        textAlign: "left",
      }}
    >
      <Box
        component="form"
        sx={{
          "& > :not(style)": { mt: 1, ml: 2, mr: 2, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <TextField
          placeholder="Tìm tên sản phẩm"
          fullWidth={true}
          variant="standard"
          color="success"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconButton onClick={handleClickSearch} edge="start">
                  <SvgIcon fontSize="small">
                    <MagnifyingGlassIcon />
                  </SvgIcon>
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <FormInputCategory />
      </Box>
      <ScrollBar>
        <Box sx={{ minWidth: 1200 }}>
          <ThemeProvider theme={buttonSelectedTheme}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    Tên sản phẩm
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Khách hàng</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Đánh giá</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    Ngày đánh giá
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Trạng thái</TableCell>
                  {/* <TableCell sx={{ fontWeight: "bold" }}>
                    Thay đổi trạng thái
                  </TableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {listReview?.items?.map((review) => {
                  return (
                    <TableRow hover key={review.id}>
                      <TableCell
                        sx={{
                          cursor: "pointer",
                          ":hover": {
                            color: COLORS.mainColor,
                          },
                        }}
                        onClick={() =>
                          navigate(adminRoute.productEditing, {
                            state: review.id,
                          })
                        }
                      >
                        <Stack alignItems="center" direction="row" spacing={2}>
                          <Avatar src={review?.product?.images[0]}>
                            {getInitials(review?.product?.name)}
                          </Avatar>
                          <Typography variant="subtitle2">
                            {review?.product?.name}
                          </Typography>
                        </Stack>
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
                            state: review.id,
                          })
                        }
                      >
                        <Stack alignItems="center" direction="row" spacing={2}>
                          <Avatar src={review?.user?.avatar}>
                            {getInitials(review?.user?.fullName)}
                          </Avatar>
                          <Typography variant="subtitle2">
                            {review?.user?.fullName}
                          </Typography>
                        </Stack>
                      </TableCell>
                      <TableCell>
                        {
                          <Stack>
                            <Rating defaultValue={review.points} readOnly />
                            <Typography>{review.content}</Typography>
                          </Stack>
                        }
                      </TableCell>
                      <TableCell>
                        {formatToFulldatetime(review?.createdAt)}
                      </TableCell>
                      <TableCell>{review?.mood}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </ThemeProvider>
        </Box>
      </ScrollBar>
      <TablePagination
        labelRowsPerPage="Số đánh giá hiển thị"
        component="div"
        count={listReview?.totalCount ?? 0}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

// ReviewManagementTable.propTypes = {
//   count: PropTypes.number,
//   items: PropTypes.array,
//   onDeselectAll: PropTypes.func,
//   onDeselectOne: PropTypes.func,
//   onPageChange: PropTypes.func,
//   onRowsPerPageChange: PropTypes.func,
//   onSelectAll: PropTypes.func,
//   onSelectOne: PropTypes.func,
//   page: PropTypes.number,
//   rowsPerPage: PropTypes.number,
//   selected: PropTypes.array,
// };

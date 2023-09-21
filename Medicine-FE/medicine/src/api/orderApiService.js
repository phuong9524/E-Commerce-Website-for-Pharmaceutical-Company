import axios from "../utils/customAxios";

const getOrderWithFilter = ({
  userId,
  orderId,
  status,
  pageIndex,
  pageSize,
}) => {
  return axios.get("api/Order/view-orders", {
    params: {
      UserId: userId,
      OrderId: orderId,
      Status: status,
      pageIndex: pageIndex,
      PageSize: pageSize,
    },
  });
};

const getOrderDetails = (id) => {
  return axios.get(`api/Order/${id}`);
};

const postUpdateStatus = ({ id, orderStatuses, cancelReason }) => {
  return axios.post("/api/Order/update-status", {
    id,
    orderStatuses,
    cancelReason,
  });
};

const getOrderStatuses = () => {
  return axios.get("/api/Order/statuses");
};

const deleteOrder = (id) => {
  return axios.delete("/api/Order", { params: { id: id } });
};

export {
  getOrderWithFilter,
  getOrderDetails,
  postUpdateStatus,
  getOrderStatuses,
  deleteOrder,
};

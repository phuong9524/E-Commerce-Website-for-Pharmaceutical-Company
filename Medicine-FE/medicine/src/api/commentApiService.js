import axios from "../utils/customAxios";

const getAveragePoint = ({ productId }) => {
  return axios.get("/api/Comment/average-points", {
    params: {
      productId,
    },
  });
};

const patchComment = ({ id, content, points, userId, productId }) => {
  return axios.patch("/api/Comment", {
    id,
    content,
    points,
    userId,
    productId,
  });
};

const postComment = ({ productId, content, points, images }) => {
  return axios.post("/api/Comment", {
    productId,
    content,
    points,
    images,
  });
};

const getComment = ({ productId, pageIndex, pageSize }) => {
  return axios.get("/api/Comment", {
    params: {
      ProductId: productId,
      PageIndex: pageIndex,
      pageSize: pageSize,
    },
  });
};

const getAllComment = ({ pageIndex, pageSize }) => {
  return axios.get("/api/Comment/all", {
    params: {
      PageIndex: pageIndex,
      pageSize: pageSize,
    },
  });
};

const deleteComment = ({ commentId }) => {
  return axios.delete(`/api/Comment?id=${commentId}`);
};

export {
  getComment,
  deleteComment,
  postComment,
  patchComment,
  getAveragePoint,
  getAllComment,
};

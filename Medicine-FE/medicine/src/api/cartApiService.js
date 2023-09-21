import axios from "../utils/customAxios";

const postAddtoCart = ({ productId, quantity }) => {
  return axios.post("/api/cart/add-product", { productId, quantity });
};

const postModifyCart = ({ productId, quantity, id }) => {
  return axios.post("/api/cart/modify-product", { productId, quantity, id });
};

const postConfirmCart = ({
  cartInfos,
  paymentMethod,
  description,
  destination,
}) => {
  return axios.post("/api/cart/confirm-cart", {
    cartInfos,
    paymentMethod,
    description,
    destination,
  });
};

const getCartItems = () => {
  return axios.get("/api/cart?pageIndex=1&pageSize=20");
};

const deleteCart = ({cartId}) => {
  return axios.delete(`/api/cart?cartId=${cartId}`);
};

export {
  postAddtoCart,
  postModifyCart,
  postConfirmCart,
  getCartItems,
  deleteCart,
};

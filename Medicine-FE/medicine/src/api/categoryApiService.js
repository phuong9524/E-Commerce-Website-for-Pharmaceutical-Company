import axios from "../utils/customAxios";

export const getProductCategories = () => {
  return axios.get("/api/productType");
};

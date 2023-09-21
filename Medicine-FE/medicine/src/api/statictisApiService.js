import axios from "../utils/customAxios";

const getStatisticsCustomer = () => {
  return axios.get("api/Management/statistic-customers");
};

const getStatisticsProduct = () => {
  return axios.get("api/Management/statistic-products");
};

const getStatisticsOrder = () => {
  return axios.get("api/Management/statistic-orders");
};

export { getStatisticsCustomer, getStatisticsProduct, getStatisticsOrder };

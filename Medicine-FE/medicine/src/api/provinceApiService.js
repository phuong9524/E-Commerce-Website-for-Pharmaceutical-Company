import axios from "axios";

export const getProvince = () => {
  return axios.get("https://api.mysupership.vn/v1/partner/areas/province");
};

export const getDistricts = (province) => {
  return axios.get(
    `https://api.mysupership.vn/v1/partner/areas/district?province=${province}`
  );
};

export const getWards = (district) => {
  return axios.get(
    `https://api.mysupership.vn/v1/partner/areas/commune?district=${district}`
  );
};

import axios from "../utils/customAxios";

const getCustomerByFilter = () => {
  return axios.get("/api/user");
};

const getRoles = () => {
  return axios.get("/api/User/roles");
};

const postAddUser = ({
  avatar,
  userName,
  fullName,
  email,
  password,
  phoneNumber,
  address,
  role,
}) => {
  return axios.post("/api/user/add-user", {
    userName,
    fullName,
    email,
    password,
    phoneNumber,
    address,
    avatar,
    role,
  });
};

const postCreateNewUser = ({
  fullName,
  email,
  password,
  userName,
  address,
  phoneNumber,
  role,
  avatar,
}) => {
  return axios.post("api/user/register-user", {
    fullName,
    email,
    password,
    userName,
    address,
    phoneNumber,
    role,
    avatar,
  });
};

const getListCustomer = ({ pageIndex, pageSize }) => {
  return axios.get("/api/Management/customers", {
    params: { SortTypes: 0, PageIndex: pageIndex, PageSize: pageSize },
  });
};

const getListEmployees = ({ role, sortTypes, pageIndex, pageSize }) => {
  return axios.get("/api/Management/employees", {
    params: {
      Role: role,
      SortTypes: sortTypes,
      PageIndex: pageIndex,
      PageSize: pageSize,
    },
  });
};

const patchModifyInfo = ({
  id,
  userName,
  fullName,
  phoneNumber,
  address,
  avatar,
}) => {
  return axios.patch("/api/User/modify-info-user", {
    id,
    userName,
    fullName,
    phoneNumber,
    address,
    avatar,
  });
};

const patchChangePassword = ({ id, oldPassword, newPassword }) => {
  return axios.patch("/api/User/change-password", {
    id,
    oldPassword,
    newPassword,
  });
};

const getInfoUser = ({ id }) => {
  return axios.get("/api/User/info", { params: { id: id } });
};

export {
  getCustomerByFilter,
  postCreateNewUser,
  getRoles,
  getListCustomer,
  getListEmployees,
  patchChangePassword,
  patchModifyInfo,
  postAddUser,
  getInfoUser,
};

import axios from "../utils/customAxios";

const getListProducts = ({ pageIndex, pageSize, keyword, type, sort }) => {
  return axios.post("api/Product", {
    pageIndex,
    pageSize,
    keyword,
    type,
    sort,
  });
};

const getProductDetails = (id) => {
  return axios.get(`api/product/${id}`);
};

const patchUpdateProductDetails = ({
  name,
  description,
  quantity,
  price,
  images,
  userObject,
  userGuide,
  storage,
  use,
  materials,
  typeId,
  id,
}) => {
  return axios.patch(`api/product/${id}`, {
    name,
    description,
    quantity,
    price,
    images,
    userObject,
    userGuide,
    storage,
    use,
    materials,
    typeId,
    id,
  });
};

const postCreateProduct = ({
  name,
  description,
  quantity,
  price,
  images,
  userObject,
  userGuide,
  storage,
  use,
  materials,
  typeId,
}) => {
  return axios.post("api/product/create-product", {
    name,
    description,
    quantity,
    price,
    images,
    userObject,
    userGuide,
    storage,
    use,
    materials,
    typeId,
  });
};

const deleteProduct = (id) => {
return axios.delete(`/api/Product/${id}`)
}

export {
  getListProducts,
  getProductDetails,
  patchUpdateProductDetails,
  postCreateProduct,
  deleteProduct
};

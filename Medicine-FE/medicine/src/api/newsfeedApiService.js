import axios from "../utils/customAxios";

const getNewsfeed = ({ keyword, pageIndex, pageSize }) => {
  return axios.get("/api/Newsfeed", {
    params: { keyword, pageIndex, pageSize },
  });
};

const postNews = ({ title, content, image }) => {
  return axios.post("/api/Newsfeed", {
    title,
    content,
    image,
  });
};

const getNewsDetails = (id) => {
  return axios.get(`/api/Newsfeed/${id}`);
};

const deleteNews = ({ newsId }) => {
  return axios.delete(`/api/Newsfeed?id=${newsId}`);
};

export { getNewsDetails, getNewsfeed, postNews, deleteNews };

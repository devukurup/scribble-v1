import axios from "axios";

const list = () => axios.get("/articles");

const create = payload => axios.post("/articles/", payload);

const destroy = id => axios.delete(`/articles/${id}`);

const update = ({ id, payload }) => axios.put(`/articles/${id}`, payload);

const articlesApi = {
  create,
  list,
  destroy,
  update,
};

export default articlesApi;

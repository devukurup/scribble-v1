import axios from "axios";

const tableData = () => axios.get("/articles/list_table_data");

const create = payload => axios.post("/articles/", payload);

const destroy = id => axios.delete(`/articles/${id}`);

const articlesApi = {
  create,
  tableData,
  destroy,
};

export default articlesApi;

import axios from "axios";

const tableData = () => axios.get("/articles/list_table_data");

const create = payload => axios.post("/articles/", payload);

const articlesApi = {
  create,
  tableData,
};

export default articlesApi;

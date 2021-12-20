import axios from "axios";

const show = () => axios.get("/site");

const update = ({ payload }) => axios.put(`/site`, payload);

const sitesApi = {
  show,
  update,
};

export default sitesApi;

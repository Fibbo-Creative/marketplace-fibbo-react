import axios from "axios";

const marketplaceApi = axios.create({ baseURL: "http://localhost:9000/" });

export default marketplaceApi;

import axios from "axios";

const marketplaceApi = axios.create({
  baseURL: "https://fibbo-market-api.herokuapp.com/",
});

export default marketplaceApi;

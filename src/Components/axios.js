import axios from "axios";

const fetcher = axios.create({
  baseURL: "https://radhika-admin-backend.herokuapp.com",
});

export default fetcher;

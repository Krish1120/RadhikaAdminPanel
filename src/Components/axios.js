import axios from "axios";

const fetcher = axios.create({
  baseURL: "https://radhika-admin-backend.herokuapp.com",
});
//http://192.168.0.188:50020
//https://radhika-admin-backend.herokuapp.com
export default fetcher;

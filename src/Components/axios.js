import axios from "axios";

const fetcher = axios.create({
  baseURL: "http://192.168.0.188:50020",
});
//http://192.168.0.188:50020
//https://radhika-admin-backend.herokuapp.com
export default fetcher;

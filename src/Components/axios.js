import axios from "axios";

const fetcher = axios.create({
  baseURL: "http://192.168.0.188:50020",
});

export default fetcher;

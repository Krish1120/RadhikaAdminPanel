import axios from "axios";

const fetcher = axios.create({
  baseURL: "http://ec2-13-126-106-185.ap-south-1.compute.amazonaws.com:50020",
});
//http://192.168.0.188:50020
//https://radhika-admin-backend.herokuapp.com
// http://ec2-13-126-106-185.ap-south-1.compute.amazonaws.com:50020
export default fetcher;

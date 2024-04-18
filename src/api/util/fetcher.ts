import axios from "axios";
import { BASE_URL } from "../../constants/api";

const fetcher = axios.create({
  baseURL: BASE_URL,
  withCredentials: true
});

export default fetcher;
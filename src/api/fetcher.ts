import axios from "axios";

const fetcher = axios.create({
  baseURL: 'http://localhost:8080',
  withCredentials: true
});

export default fetcher;
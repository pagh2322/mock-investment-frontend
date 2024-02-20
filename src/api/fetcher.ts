import axios from "axios";

const fetcher = axios.create({
  baseURL: 'http://localhost:8086/api',
});

export default fetcher;
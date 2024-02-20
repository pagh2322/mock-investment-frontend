import axios from "axios";

const fetcher = axios.create({
  baseURL: 'http://localhost:3000/api',
});

export default fetcher;
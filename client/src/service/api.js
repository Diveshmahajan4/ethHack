import axios from "axios";

const API_URL = "http://localhost:5100";

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    "content-type": "application/json",
  },
});

const fetchNfts = axios.get(API_URL + "/");

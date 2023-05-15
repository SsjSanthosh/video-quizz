import axios from "axios";

export const raxios = axios.create({
  baseURL: "/",
  timeout: 10000,
});

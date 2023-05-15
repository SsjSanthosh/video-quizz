import axios from "axios";

export const raxios = axios.create({
  baseURL: "/",
  timeout: 10000,
});

export const getFromStorage = (key: string) => {
  return localStorage.getItem(key);
};

import axios from "axios";

export function api() {
  const token = localStorage.getItem("token");
  return axios.create({
    baseURL: "http://whatever.com",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
  });
}

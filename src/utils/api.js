import axios from "axios";

export function api() {
  const token = localStorage.getItem("token");
  return axios.create({
    baseURL: "https://lambda-co-make.herokuapp.com/",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
  });
}

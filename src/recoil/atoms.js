import { atom } from "recoil";

export const userState = atom({
  key: "userState",
  default: {
    user: {
      id: 1,
      username: "Harrison",
      email: "test@test.com",
    },
    loggedIn: false,
  },
});

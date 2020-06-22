import { atom } from "recoil";

export const userState = atom({
  key: "userState",
  default: {
    id: 1,
    username: "Harrison",
    email: "test@test.com",
  },
});

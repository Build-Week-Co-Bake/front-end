import React from "react";
import { useRecoilValue } from "recoil";
import { userState } from "./recoil/atoms";

export function DisplayUser() {
  const user = useRecoilValue(userState);

  return (
    <div>
      <h1> {user.username} </h1>
    </div>
  );
}

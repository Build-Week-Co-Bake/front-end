import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { userState } from "./recoil/atoms";

export function User() {
  const [form, setForm] = useState("");
  const [users, setUsers] = useRecoilState(userState);
  // const setUsers = useSetRecoilState(userState);
  console.log(users);

  const onSubmit = (e) => {
    setUsers((oldUserState) => {
      return {
        ...oldUserState,
        username: form,
      };
    });
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <input
          name="username"
          value={form}
          onChange={(e) => setForm(e.target.value)}
        />
      </form>
    </div>
  );
}

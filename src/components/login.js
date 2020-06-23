import React from "react";
import { useForm } from "react-hook-form";
import { api } from "../utils/api";
import { useSetRecoilState } from "recoil";
import { userState } from "../recoil/atoms";

function Login(props) {
  const setUser = useSetRecoilState(userState);
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => {
    api()
      .post("api/login", data)
      .then((res) => {
        console.log(res.data);
        setUser((initial) => {
          return {
            user: res.data,
            loggedIn: true,
          };
        });
        localStorage.setItem("token", res.data.token);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Email:</label>
        <input
          name="email"
          ref={register({
            required: true,
            pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
          })}
        />
        {errors.email && <span>Please enter a valid email address.</span>}
        <label>Password</label>
        <input
          name="password"
          type="password"
          ref={register({
            required: true,
            min: 8,
            pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{8,16}$/,
          })}
        />
        {errors.password && <span>This field is required</span>}
        <input type="submit" />
      </form>
    </div>
  );
}

export default Login;

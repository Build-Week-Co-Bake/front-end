import React from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { api } from "../utils/api";
import { useSetRecoilState } from "recoil";
import { userState } from "../recoil/atoms";

function Login(props) {
  const history = useHistory();
  const setUser = useSetRecoilState(userState);
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    api()
      .post("api/login", data)
      .then((res) => {
        setUser((initial) => {
          return {
            user: res.data.data,
            loggedIn: true,
          };
        });
        localStorage.setItem("token", res.data.token);
        history.push("/userDash");
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
};

export default Login;

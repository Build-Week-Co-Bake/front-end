import React from "react";
import styled from "styled-components";
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
    // console.log('data', data);
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
    <StyledLogin>
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
        <input className='submit' type="submit" />
      </form>
    </StyledLogin>
  );
};

export default Login;

const StyledLogin = styled.div`
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
        margin: 10% auto;
        width: 40%;
        padding: 3%;
    h2{
        font-size: 2rem;
        margin: 2% 0;
    }
    form{
        display: flex;
        flex-direction: column;
        input{
            padding: 2%;
            margin: 2% 0;
        }
        input.submit{
            width: 30%;
            margin: 2% auto;
        }
    }
`
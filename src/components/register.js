import React from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { api } from "../utils/api";

function Register(props) {
  const { register, handleSubmit, errors } = useForm();
  const history = useHistory();
  const onSubmit = (data) => {
    // console.log(data)
    api()
      .post("api/register", data)
      .then((res) => {
        // console.log(res);
        history.push("/login");
      })
      .catch((err) => console.log(err));
  };

  return (
    <StyledRegister>
      <h2>Register</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Email:</label>
        <input
          name="email"
          type="email"
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
        {errors.password && (
          <span>
            Your password must be:
            <br />
            8-16 characters in length
            <br />
            Contain at least one upper case letter
            <br />
            Contain at least one lower case letter
            <br />
            Contain at least one number
          </span>
        )}
        <label>What name would you like to display to your neighbors?</label>
        <input name="name" ref={register({required: true})} />
        {errors.name && <span>Please enter a name.</span>}
        <button className='submit' type="submit">Register</button>
      </form>
    </StyledRegister>
  );
}

export default Register;

const StyledRegister = styled.div`
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  margin: 10% auto;
  width: 40%;
  padding: 3%;
    @media(max-width:500px){
      width: 80%;
    }
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
    button.submit{
        width: 30%;
        margin: 2% auto;
        padding: 2%;
        font-size: 1rem;
        @media(max-width:500px){
          width: 50%;
      }
    }
  }
`
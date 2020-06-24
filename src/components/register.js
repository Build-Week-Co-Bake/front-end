import React from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { api } from "../utils/api";

function Register(props) {
  const { register, handleSubmit, errors } = useForm();
  const history = useHistory();
  const onSubmit = (data) => {
    api()
      .post("api/register", data)
      .then((res) => {
        // console.log(res);
        history.push("/login");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
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
        <input name="name" ref={register} />
        <input type="submit"/>
      </form>
    </div>
  );
}

export default Register;

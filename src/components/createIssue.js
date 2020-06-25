import React from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { api } from "../utils/api";
import { useHistory } from "react-router-dom";

function CreateIssue(props) {
  const { register, handleSubmit, errors } = useForm();
  const history = useHistory();
  const postIssue = (data) => {
    // console.log('CreateIssue data', data);
    api()
      .post("/issues", data)
      .then((res) => {
        history.push("/userDash");
      })
      .catch((error) => {
        console.log("CreateIssue error", error);
      });
  };

  return (
    <StyledCreateIssue>
      <h2>Create New Issue</h2>
      <form onSubmit={handleSubmit(postIssue)}>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          ref={register({
            required: true,
          })}
        />
        {errors.title && <span>Please enter a title.</span>}

        <label>City:</label>
        <input
          type="text"
          name="city"
          ref={register({
            required: true,
            pattern: /^[A-Za-z ]+$/,
          })}
        />
        {errors.city && (
          <span>Please enter a city using only letters and spaces.</span>
        )}

        <label>Home Owners Association:</label>
        <input type="text" ref={register} />
        <label>Description:</label>
        <input
          type="text"
          name="description"
          ref={register({
            required: true,
          })}
        />
        {errors.description && <span>Please enter a description.</span>}

        <label>Add Photo:</label>
        <input
          type="url"
          name="image"
          ref={register({
            // pattern: /^[a-zA-Z0-9\-\.]+\.(com|org|net|mil|edu|COM|ORG|NET|MIL|EDU)$/
          })}
        />
        {errors.photo && <span>Please enter a valid image URL.</span>}
        <input type="submit" />
      </form>
    </StyledCreateIssue>
  );
}

export default CreateIssue;

const StyledCreateIssue = styled.div`
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  margin: 10% auto;
  width: 40%;
  padding: 3%;
  h2 {
    font-size: 2rem;
    margin: 2% 0;
  }
  form {
    display: flex;
    flex-direction: column;
    input {
      padding: 2%;
      margin: 2% 0;
    }
    input.submit {
      width: 30%;
      margin: 2% auto;
    }
  }
`;

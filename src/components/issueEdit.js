import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { api } from "../utils/api";
import { useParams, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

const defaultIssue = {
  id: "",
  userId: "",
  title: "",
  city: "",
  hoa: "",
  description: "",
  photo: [""],
  upvotes: "",
  createdAt: "",
};

function IssueEdit(props) {
  const { register, handleSubmit, errors } = useForm();
  const { id } = useParams();
  const [issue, setIssue] = useState([defaultIssue]);
  const history = useHistory();

  const updateIssue = (data) => {
    console.log(data);
    api()
      .put(`/issues/${id}`, data)
      .then(() => history.push("/userDash"))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    api()
      .get(`/issues/${id}`)
      .then((res) => {
        //   console.log('res', res);
        setIssue(res.data[0]);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <StyledIssueEdit>
      <h2>{issue.title}</h2>
      <div>
        Created by:{issue.name} on {issue.created_on} in {issue.city},
        {issue.hoa}
      </div>
      <img src={issue.image} alt={`issue ${id}`} />
      <form onSubmit={handleSubmit(updateIssue)}>
        <label>Change Description:</label>
        <input
          defaultValue={issue.description}
          name="description"
          type="text"
          ref={register}
        />
        <label>Change Photo:</label>
        <input name="image" type="url" ref={register} />
        <button className="submit" type="submit">Update Issue</button>
      </form>
    </StyledIssueEdit>
  );
}

export default IssueEdit;

const StyledIssueEdit = styled.div`
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  margin: 10% auto;
  width: 40%;
  padding: 3%;
  h2 {
    font-size: 2rem;
    margin: 2% 0;
  }
  img{
      width: 60%;
  }
  form {
    display: flex;
    flex-direction: column;
    input {
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
`;

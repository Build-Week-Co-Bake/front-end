import React, { useEffect, useState } from "react";
import Issue from "./issue";
import { api } from "../utils/api";
import { useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import { userState } from "../recoil/atoms";
import styled from "styled-components";

function UserDash(props) {
  const { issues, getIssues } = props;
  const { register, handleSubmit } = useForm();
  const [issueFilter, setIssueFilter] = useState("issues");
  const [editButtonState, setEditButtonState] = useState(false);
  const user = useRecoilValue(userState).user;
  console.log(user);

  const onSearch = (data) => {
    setIssueFilter(`issues/search?city=${data.search}`);
  };

  useEffect(() => {
    api()
      .get(`${issueFilter}`)
      .then((res) => {
        console.log(res);
        getIssues(res.data.data);
        setEditButtonState(!editButtonState);
      })
      .catch((err) => {
        setEditButtonState(!editButtonState);
        getIssues([])
        console.log(err)
      });

  }, [issueFilter]);
  return (
    <Cards>
      <div className="filters">
        <button
          onClick={() => {
            setIssueFilter("issues");
          }}
        >
          All Issues
        </button>
        <button
          onClick={() => {
            setIssueFilter(`api/users/${user.id}/issues`);
          }}
        >
          Your Issues
        </button>
        <form onSubmit={handleSubmit(onSearch)}>
          <label>Search for issues by location:</label>
          <input type="text" name="search" ref={register} />
          <button className="submit" type="submit">Search</button>
        </form>
      </div>
      <div className="issues">
        {issues &&
          issues.map((issue) => (
            <Issue
              setIssueFilter={setIssueFilter}
              key={issue.id}
              issue={issue}
              editButtonState={editButtonState}
              issues={issues}
              getIssues={getIssues}
            />
          ))}
      </div>
    </Cards>
  );
}

export default UserDash;

const Cards = styled.div`
  div.filters {
    display: flex;
    flex-wrap: wrap;
    max-width: 1200px;
    margin: 0 auto;

    @media(max-width:500px){
      justify-content: center;
    }
    button {
      margin: 3% 1% ;
      padding: 1%;
      font-size: 1rem;
      width: 20%;

      @media(max-width:500px){
        width: 40%;
      }
    }
    form {
      display: flex;
      flex-wrap: wrap;
      padding: 1%;
      width: 100%;
      label {
        font-size: 1rem;
        width: 100%;
        padding: 1%;
      }
      input {
        width: 60%;
        margin: 3% 0;
        font-size: 1rem;
      }
      button.submit{
          width: 20%;
          margin: 2% auto;
          padding: 2%;
          font-size: 1rem;
          @media(max-width:500px){
            width: 30%;
        }
      }
    }
  }
  div.issues {
    max-width: 1200px;
    margin: 0 auto;
  }
`;

import React, { useEffect, useState } from "react";
import Issue from "./issue";
import { api } from "../utils/api";
import { useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import { userState } from "../recoil/atoms";

function UserDash(props) {
  const { editButtonState, issues, getIssues } = props;
  const { register, handleSubmit } = useForm();
  const [issueFilter, setIssueFilter] = useState("issues");
  const [userId, setUserId] = useState(`0`);
  const user = useRecoilValue(userState).user;
  console.log(user);

  const onSearch = (data) => {
    setIssueFilter(`issues/search?city=${data.search}`);
  };

  useEffect(() => {
    api()
      .get(`/${issueFilter}`)
      .then((res) => {
        console.log(res);
        getIssues(res.data.data);
      })
      .catch((err) => console.log(err));
  }, [issueFilter]);
  return (
    <div>
      <div>
        <button onClick={() => setIssueFilter("issues")}>All Issues</button>
        <button onClick={() => setIssueFilter(`api/users/${userId}:/issues`)}>
          Your Issues
        </button>
        <form onSubmit={handleSubmit(onSearch)}>
          <label>Search for issues by location:</label>
          <input type="text" name="search" ref={register} />
          <input type="submit" />
        </form>
      </div>
      {issues &&
        issues.map((issue) => (
          <Issue
            key={issue.id}
            issue={issue}
            editButtonState={editButtonState}
          />
        ))}
    </div>
  );
}

export default UserDash;

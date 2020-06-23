import React from "react";
import Issue from "./issue";
import { useRecoilValue } from "recoil";
import { userState } from "../recoil/atoms";

function UserDash(props) {
  const user = useRecoilValue(userState).user;
  console.log(user);
  const { issueData, editButtonState } = props;
  return (
    <div>
      {issueData.map((issue) => (
        <Issue key={issue.id} issue={issue} editButtonState={editButtonState} />
      ))}
    </div>
  );
}

export default UserDash;

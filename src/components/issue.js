import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { api } from "../utils/api";

function Issue(props) {
  const {
    id,
    name,
    title,
    city,
    hoa,
    description,
    image,
    upvotes,
    created_on,
  } = props.issue;
  const [vote, setVote] = useState(upvotes);
  const history = useHistory();

  const changeUrl = () => {
    history.push(`/issueEdit/${id}`);
  };

  const handleUpvote = () => {
    api()
      .put(`/issues/${id}`, { upvotes: vote + 1 })
      .then((res) => {
        console.log(res);
        setVote(vote + 1);
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = () => {
    api()
      .delete(`/issues/${id}`)
      .then((res) => {
        console.log(res);
        props.issues.filter((item) => item.id !== id);
        props.setIssueFilter("issues");
        history.push("/userDash");
      })
      .catch((res) => console.log(res));
  };

  return (
    <StyledIssues>
      <div className="container">
        <h3>{title}</h3>
        <div className="information">
          Created by:{name} at {created_on} in {city},{hoa}
        </div>
        <p>{description}</p>
        <div className="buttons">
          {vote}
          <button onClick={() => handleUpvote()}>^</button>
          {!props.editButtonState && <button onClick={changeUrl}>Edit</button>}
          {!props.editButtonState && (<button onClick={handleDelete}>Delete</button>)}
        </div>
      </div>
      <img key={image} src={image} alt={`issue ${id} photo`} />
    </StyledIssues>
  );
}

export default Issue;

const StyledIssues = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-content: center;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  div.container {
    width: 40%;
    padding: 2%;

    @media (max-width: 500px) {
      width: 80%;
    }
    h3 {
      font-size: 2rem;
      padding: 2% 0;
    }
    div.information {
      padding: 2% 0;
    }
    p {
      padding: 2% 0;
    }
    div.buttons {
      padding: 2% 0;
    }
  }
  img {
    max-width: 40%;
    padding: 2% 0;
    max-height: 200px;
    @media (max-width: 500px) {
      width: 80%;
    }
  }
`;

import React, { useEffect, useState } from 'react'
import Issue from './issue'
import { api } from "../utils/api";


function UserDash(props) {
    const { editButtonState, issues, getIssues } = props
    
    useEffect(() => {
        api()
        .get('https://lambda-co-make.herokuapp.com/issues')
        .then((res) => {
          console.log(res.data);
          getIssues(res.data.data)
        })
        .catch((err) => console.log(err));
    },[]);
    return(
        <div>
            {issues.map(issue => (
            <Issue key={issue.id} issue={issue} editButtonState={editButtonState}/>
            ))}
        </div>
    )
}

export default UserDash
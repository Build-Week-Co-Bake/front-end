import React from 'react'
import Issue from './issue'


function UserDash(props) {
    const { issueData, editButtonState } = props
    return(
        <div>
            {issueData.map(issue => (
            <Issue key={issue.id} issue={issue} editButtonState={editButtonState}/>
            ))}
        </div>
    )
}

export default UserDash
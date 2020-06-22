import React from 'react'

function Issue(props) {
    const { userId, title, city, hoa, description, photo, upvotes, createdAt } = props.issue
    const { editButtonState } = props
    return(
        <div>
            <h3>{title}</h3>
            <div>Created by:{userId} at {createdAt} in {city},{hoa}</div>
            <img src={photo}/>
            <p>{description}</p>
            <div>{upvotes}<button>^</button><button disabled={editButtonState}>Edit</button></div>
        </div>
    )
}

export default Issue
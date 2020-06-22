import React from 'react'
import {useHistory} from 'react-router-dom'

function Issue(props) {
    const { id, userId, title, city, hoa, description, photo, upvotes, createdAt } = props.issue
    const { editButtonState } = props
    const history = useHistory()

    const changeUrl = () =>{
        history.push(`/issueEdit/${id}`)
    }
    return(
        <div>
            <h3>{title}</h3>
            <div>Created by:{userId} at {createdAt} in {city},{hoa}</div>
            {photo.map(photo => {
                return <img key={photo} src={photo}/>}
            )}
            <p>{description}</p>
            <div>{upvotes}<button>^</button><button disabled={editButtonState} onClick={changeUrl}>Edit</button></div>
        </div>
    )
}

export default Issue
import React, { useEffect, useState } from 'react';
import { api } from "../utils/api";
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';

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
}

function IssueEdit(props) {
    const { register, handleSubmit, errors } = useForm()
    const {id} = useParams()
    const [ issue, setIssue ] = useState([defaultIssue])
    const updateIssue = (event) => {
        console.log(event.target)
    }

    useEffect(() => {
        api()
        .get(`https://lambda-co-make.herokuapp.com/issues/${id}:`)
        .then((res) => {
        //   console.log('res', res);
          setIssue(res.data.data)
        })
        .catch((err) => console.log(err));
    },[]);
    return(
        <div>
            <h3>{issue.title}</h3>
            <div>Created by:{issue.userId} at {issue.createdAt} in {issue.city},{issue.hoa}</div>
            <img src={issue.photo} alt={`issue ${id}`}/>
            <form onSubmit={handleSubmit(updateIssue)}>
                <label>Change Description:</label>
                <input 
                defaultValue={issue.description}
                type='text'
                ref={register}
                />
                <label>Add Photo:</label>
                <input 
                type='url'
                ref={register}
                />
            </form>
        </div>
    )
}

export default IssueEdit
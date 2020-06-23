import React from 'react'
import { useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'

const dummyIssues = [{
    id: '0',
    userId: '1',
    title: 'Pothole on Whatever and Thing',
    city: 'Cincinnati',
    hoa: '',
    description: 'I found a pothole on Whatever Avenue and Thing Place',
    photo: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
    upvotes: '2',
    createdAt: '6/22/2020',
  },
  {
    id: '1',
    userId: '1',
    title: 'Pothole on Main and Percy',
    city: 'Cincinnati',
    hoa: '',
    description: 'I found a pothole on Main and Percy Street',
    photo: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
    upvotes: '3',
    createdAt: '6/21/2020',
  }]

function IssueEdit(props) {
    const { register, handleSubmit, errors } = useForm()
    const {id} = useParams()

    const updateIssue = (event) => {
        console.log(event.target)
    }
    return(
        <div>
            <h3>{dummyIssues[id].title}</h3>
            <div>Created by:{dummyIssues[id].userId} at {dummyIssues[id].createdAt} in {dummyIssues[id].city},{dummyIssues[id].hoa}</div>
            <img src={dummyIssues[id].photo}/>
            <form onSubmit={handleSubmit(updateIssue)}>
                <label>Change Description:</label>
                <input 
                defaultValue={dummyIssues[id].description}
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
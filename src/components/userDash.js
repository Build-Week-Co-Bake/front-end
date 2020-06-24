import React, { useEffect, useState } from 'react';
import Issue from './issue';
import { api } from "../utils/api";
import { useForm } from 'react-hook-form';
import { useRecoilValue } from "recoil";
import { userState } from "../recoil/atoms";
import styled from 'styled-components'



function UserDash(props) {
    const { editButtonState, issues, getIssues } = props;
    const { register, handleSubmit } = useForm();
    const [ issueFilter, setIssueFilter ] = useState('issues');
    const [ userId, setUserId ] = useState(`0`);
    const user = useRecoilValue(userState).user;
    console.log(user);
    
    const Cards = styled.div`
        div.filters{
            display: flex;
            max-width: 1200px;
            margin: 0 auto;
            button{
                padding: 1%;
                font-size: 1rem;
            }
            form{
                display: flex;
                flex-wrap: wrap;
                padding: 1%;
                width: 100%;
                label{
                    font-size: 1rem;
                    width: 100%;
                    padding: 1%;
                }
                input{
                    width: 60%;
                    padding: 1%;
                    margin: 1%;
                }
                input.submit{
                    font-size: 1rem;
                    padding: 1%;
                    width: auto;
                }
            }
        }
        div.issues{
            max-width: 1200px;
            margin: 0 auto;
        }
        
    `

    const onSearch = (data) => {
        setIssueFilter(`issues/search?city=${data.search}`)
    };

    useEffect(() => {
        api()
        .get(`https://lambda-co-make.herokuapp.com/${issueFilter}`)
        .then((res) => {
        //   console.log('Issues from the backend',res.data);
          getIssues(res.data.data)
        })
        .catch((err) => console.log(err));
    },[issueFilter]);
    return(
        <Cards>
            <div className='filters'>
                <button onClick={() => setIssueFilter('issues')}>All Issues</button>
                <button onClick={() => setIssueFilter(`api/users/${userId}:/issues`)}>Your Issues</button>
                <form onSubmit={handleSubmit(onSearch)}>
                    <label>Search for issues by location:</label>
                    <input
                        type='text'
                        name='search'
                        ref={register}
                    />
                    <input className='submit' type='submit'/>
                </form>
            </div>
            <div className='issues'>
                {issues && issues.map(issue => (
                <Issue key={issue.id} issue={issue} editButtonState={editButtonState}/>
                ))}
            </div>
        </Cards>
    );
};

export default UserDash

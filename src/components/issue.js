import React from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'


function Issue(props) {
    const { id, name, title, city, hoa, description, image, upvotes, created_on } = props.issue
    const { editButtonState } = props
    const history = useHistory()
    
    
    const changeUrl = () =>{
        history.push(`/issueEdit/${id}`)
    }
    return(
        <StyledIssues>
            <div className='container'>
                <h3>{title}</h3>
                <div className='information'>Created by:{name} at {created_on} in {city},{hoa}</div>
                <p>{description}</p>
                <div className='buttons'>{upvotes}<button>^</button><button disabled={editButtonState} onClick={changeUrl}>Edit</button></div>
            </div>
            <img key={image} src={image} alt={`issue ${id} photo`}/>
        </StyledIssues>
    )
}

export default Issue

const StyledIssues = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-content: center;
    margin-top: 8%;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    div.container{
        width: 40%;
        padding: 2%;

        @media(max-width:500px){
            width: 80%;
        }
        h3{
            font-size: 2rem;
            padding: 2% 0;
        }
        div.information{
            padding: 2% 0;
        }
        p{
            padding: 2% 0;
        }
        div.buttons{
            padding: 2% 0;

        }
    }
    img{
        max-width: 40%;
        padding: 2% 0;
        max-height: 200px;
        @media(max-width:500px){
            width: 80%;
        }
    }

`
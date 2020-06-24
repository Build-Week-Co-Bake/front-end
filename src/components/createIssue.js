import React from 'react';
import { useForm } from 'react-hook-form';
import { api } from '../utils/api';

function CreateIssue(props) {
    const { register, handleSubmit, errors } = useForm();
    const postIssue = data => {
        // console.log('CreateIssue data', data);
        api()
        .post('/issues', data)
        .then((res) => {
            // console.log('post request response', res);
        })
        .catch((error) => { console.log('CreateIssue error',error)})
    };

    return(
        <div>
            <form onSubmit={handleSubmit(postIssue)}>
                <label>Title:</label>
                <input
                    type='text'
                    name='title'
                    ref={register({
                        required: true
                    })}
                />
                {errors.title && <span>Please enter a title.</span>}

                <label>City:</label>
                <input
                    type='text'
                    name='city'
                    ref={register({
                        required: true,
                        pattern: /^[A-Za-z ]+$/
                    })}
                />
                {errors.city && <span>Please enter a city using only letters and spaces.</span>}

                <label>Home Owners Association:</label>
                <input
                    type='text'
                    ref={register}
                />
                <label>Description:</label>
                <input 
                type='text'
                name='description'
                ref={register({
                    required: true,
                })}
                />
                {errors.description && <span>Please enter a description.</span>}

                <label>Add Photo:</label>
                <input 
                type='url'
                name='image'
                ref={register({
                    // pattern: /^[a-zA-Z0-9\-\.]+\.(com|org|net|mil|edu|COM|ORG|NET|MIL|EDU)$/
                })}
                />
                {errors.photo && <span>Please enter a valid image URL.</span>}
                <input type='submit'/>
            </form>
        </div>
    );
};

export default CreateIssue;
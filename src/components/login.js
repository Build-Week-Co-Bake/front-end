import React from 'react'
import {useForm} from 'react-hook-form'

function Login(props) {
    const { register, handleSubmit, errors } = useForm()
    const onSubmit = data => console.log(data)

    return(
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>Email:</label>
                <input name='email' ref={register({
                    required: true,
                    pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
                })}/>
                {errors.email && <span>Please enter a valid email address.</span>}
                <label>Password</label>
                <input 
                    name='password'
                    type='password'
                    ref={register({
                    required: true,
                    min: 8,
                    pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{8,16}$/
                })}/>
                {errors.password && <span>This field is required</span>}
                <input type='submit'/>
            </form>
        </div>
    )
}

export default Login
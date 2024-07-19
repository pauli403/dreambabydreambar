import React from 'react';
import SinglePageWrapper from '../SinglePageWrapper';
import { useState } from 'react';
import useSignIn from 'react-auth-kit/hooks/useSignIn';
import "./form.css"
import axios from 'axios';
import {useNavigate} from "react-router-dom"
import { BASE_URL } from './constants';

const Login = () => {
    
    const [user, setUser] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(false)
    const signIn = useSignIn();
    const navigate = useNavigate();

    const handleTextareaChange = (e)=>{
        if(e.target.name == "user"){
            setUser(e.target.value);
        }else if(e.target.name == "password"){
            setPassword(e.target.value)
        }
    }
    const handleLogin = (e)=>{
        e.preventDefault();
        const details = {
            "username":user,
            "password":password
        }
        axios.post(
            `${BASE_URL}/wp-json/jwt-auth/v1/token`,
            details
        ).then(response=>{
            setError(false);
            signIn({
                auth: {
                  token: response.data.token,
                  type: "Bearer"
                }
              })
            navigate("/");
        }).catch((e)=>setError(true))
    }
    return (
        <>
        <SinglePageWrapper>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input onChange={handleTextareaChange} className='FormInput' type='text' name='user' placeholder='Username'/>
                <input onChange={handleTextareaChange} className='FormInput' type='password' name='password' placeholder='Password'/>
                <input className="Default-Button" type='submit' value='Log In'/>
            </form>
            <p>
            You need to be a registered user to access, click <a href={`${BASE_URL}/wp-login.php?action=lostpassword`}>here</a> if you forgot your password.<br/>
            <strong>{error?"Wrong Username or Password...":""}</strong></p>
        </SinglePageWrapper>
        </>
    );
};

export default Login;

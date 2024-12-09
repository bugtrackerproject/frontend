import React from 'react'
import { setUser } from '../../reducers/userReducer'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
    Routes, Route, Link, useParams, useNavigate, useMatch
  } from "react-router-dom"
  
import "./loginform.scss"

import { login, setAccessToken } from "../../services/auth"
//import { useResource } from '../../hooks/useResource';

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [success, setSuccess] = useState(false);

    const user = useSelector((state) => state.user)

    const dispatch = useDispatch()

    const navigate = useNavigate()


    const handleLogin = async (event) => {
        event.preventDefault();

        try {
          const user = await login({
              email,
              password
          });
            window.localStorage.setItem("loggedBugtrackerAppUser", JSON.stringify(user));
          dispatch(
            setUser(user)
            )



          setEmail("");
          setPassword("");
          setSuccess(true)
        } catch (exception) {
            console.log(exception)
          
        }
      };

    useEffect(() => {
        if (user !== null) {
            navigate('/')
        }
      }, [user, navigate]);

  return (
    <>
        {success ? (

            <div>
                SUCCESS
            </div>

        ) : (

            <>
                <div className='login-container'>
                    <div className="form-content">
                        
                        <div className='login-title'>
                            
                            bugtracker

                        </div>

                        <div className="form">
                            <form onSubmit={handleLogin}>
                                <div className="field">
                        
                                    <input
                                        className="input"
                                        type="email"
                                        id="email"
                                        autoComplete="off"
                                        onChange={(e) => setEmail(e.target.value)}
                                        value={email}
                                        placeholder=""
                                        required
                                    />
                                    <label className="label" htmlFor='email'>Email: </label>
                                </div>
                                <div className="field">
                                    <input
                                        className="input"
                                        type="password"
                                        id="password"
                                        onChange={(e) => setPassword(e.target.value)}
                                        value={password}
                                        placeholder=""
                                        required
                                    />
                                    <label className="label" htmlFor='password'>Password: </label>
                        
                                </div>
                                <button className='btn'>Sign In</button>
                            </form>
                            
                            <Link className="register-link" to="/register">
                                <span>
                                    Register
                                </span>
                            </Link>
                    
                        </div>
                    </div>
                </div>
            </>
            
            )
        }
    </>
  )
}

export default LoginForm
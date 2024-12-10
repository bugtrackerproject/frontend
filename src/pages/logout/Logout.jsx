import React from 'react'
import { useEffect } from 'react';
import { setUser, logout } from '../../reducers/userReducer';
import { useDispatch } from 'react-redux';

import Login from '../../pages/login/Login';

const Logout = () => {

    const dispatch = useDispatch()

    window.localStorage.removeItem("loggedBugtrackerAppUser")
    dispatch(logout())


    return (
      <Login />    
    )
}

export default Logout
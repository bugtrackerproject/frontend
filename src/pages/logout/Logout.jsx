import React from 'react'
import { useEffect } from 'react';
import { setUser } from '../../reducers/userReducer';
import { useDispatch } from 'react-redux';

import LoginForm from '../../components/login/LoginForm';

const Logout = ({ handleLogout }) => {

    const dispatch = useDispatch()
  useEffect(() => {

    const loggedUserJSON = window.localStorage.getItem("loggedBugtrackerAppUser");
    if (loggedUserJSON) {
        window.localStorage.removeItem("loggedBugtrackerAppUser")

        dispatch(setUser(null))
    }
  }, []);

  return (
    <div className="loginPage">
      <LoginForm />
    </div>
  )
}

export default Logout
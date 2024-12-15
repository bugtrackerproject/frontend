import React from "react";
import { useEffect } from "react";
import { setUser, logout } from "../../reducers/userReducer";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";

const Logout = () => {
	const dispatch = useDispatch();

	window.localStorage.removeItem("loggedBugtrackerAppUser");
	dispatch(logout());
	window.location.reload();

	return null;
};

export default Logout;

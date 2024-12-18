import React from "react";
import { setUser } from "../../reducers/userReducer";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { initialiseUsers } from "../../reducers/usersReducer";
import { initialiseProjects } from "../../reducers/projectsReducer";
import { initialiseTickets } from "../../reducers/ticketsReducer";
import { initialiseRoles } from "../../reducers/rolesReducer";

import useAppInitialisation from "../../hooks/useAppInitialisation";

import { Link, useNavigate } from "react-router-dom";
import Spinner from "../../components/animations/Spinner";

import "./login.scss";

import { login, setAccessToken } from "../../services/auth";
//import { useResource } from '../../hooks/useResource';

const LoginForm = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [success, setSuccess] = useState(false);

	const user = useSelector((state) => state.user);
	const initialiseApp = useAppInitialisation();

	const dispatch = useDispatch();

	const navigate = useNavigate();
	const loggedUserJSON = window.localStorage.getItem(
		"loggedBugtrackerAppUser"
	);

	const handleLogin = async (event) => {
		event.preventDefault();

		try {
			const user = await login({
				email,
				password,
			});

			window.localStorage.setItem(
				"loggedBugtrackerAppUser",
				JSON.stringify(user)
			);

			initialiseApp();

			setEmail("");
			setPassword("");
			navigate("/");
			setSuccess(true);
		} catch (exception) {
			console.log(exception);
		}
	};

	const handleGuestLogin = async () => {
		try {
			const guestCredentials = {
				email: "demo@bugtracker.com",
				password: "demo",
			};

			const user = await login(guestCredentials);

			window.localStorage.setItem(
				"loggedBugtrackerAppUser",
				JSON.stringify(user)
			);

			initialiseApp();

			setEmail("");
			setPassword("");
			navigate("/");
			setSuccess(true);
		} catch (exception) {
			console.log(exception);
		}
	};

	useEffect(() => {
		if (success) {
			navigate("/");
		}
	}, [navigate]);

	return (
		<>
			{success ? (
				<Spinner />
			) : (
				<>
					<div className="login-container">
						<div className="login-form-content">
							<div className="login-title">bugtracker</div>

							<div className="form">
								<form onSubmit={handleLogin}>
									<div className="field">
										<input
											className="input"
											type="email"
											id="email"
											autoComplete="off"
											onChange={(e) =>
												setEmail(e.target.value)
											}
											value={email}
											placeholder="Email"
											required
										/>
										<label
											className="label"
											htmlFor="email"
										>
											Email:{" "}
										</label>
									</div>
									<div className="field">
										<input
											className="input"
											type="password"
											id="password"
											onChange={(e) =>
												setPassword(e.target.value)
											}
											value={password}
											placeholder="Password"
											required
										/>
										<label
											className="label"
											htmlFor="password"
										>
											Password:{" "}
										</label>
									</div>
									<button className="btn">Sign In</button>
								</form>
								<Link className="register-link" to="/register">
									<span>Register</span>
								</Link>
								<div class="demo-sign-in">
									<button
										className="btn"
										onClick={handleGuestLogin}
									>
										Guest
									</button>
								</div>
							</div>
						</div>
					</div>
				</>
			)}
		</>
	);
};

export default LoginForm;

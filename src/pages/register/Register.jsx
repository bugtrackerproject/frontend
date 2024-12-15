import React from "react";
import { setUser } from "../../reducers/userReducer";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
	Routes,
	Route,
	Link,
	useParams,
	useNavigate,
	useMatch,
} from "react-router-dom";

import { login } from "../../services/auth";
import { userService } from "../../services/apiServiceFactory";

//import './registerform.scss'

const RegisterForm = () => {
	const [email, setEmail] = useState("");
	const [name, setName] = useState("");
	const [password, setPassword] = useState("");

	const user = useSelector((state) => state.user);

	const dispatch = useDispatch();

	const navigate = useNavigate();

	const handleRegister = async (event) => {
		event.preventDefault();

		try {
			await userService.create({
				email,
				name,
				password,
			});

			const user = await login({
				email,
				password,
			});
			window.localStorage.setItem(
				"loggedBugtrackerAppUser",
				JSON.stringify(user)
			);

			dispatch(setUser(user));
			setName("");
			setPassword("");
		} catch (exception) {
			console.log(exception);
		}
	};

	useEffect(() => {
		if (user !== null) {
			navigate("/");
		}
	}, [user, navigate]);

	return (
		<div className="login-container">
			<div className="login-form-content">
				<div className="login-title">bugtracker</div>

				<form onSubmit={handleRegister}>
					<div className="field">
						<input
							className="input"
							type="text"
							autoComplete="off"
							onChange={(e) => setName(e.target.value)}
							value={name}
							placeholder="Name"
							required
						/>
						<label className="label" htmlFor="name">
							Name:{" "}
						</label>
					</div>

					<div className="field">
						<input
							className="input"
							type="email"
							id="email"
							autoComplete="off"
							onChange={(e) => setEmail(e.target.value)}
							value={email}
							placeholder="Email"
							required
						/>
						<label className="label" htmlFor="email">
							Email:{" "}
						</label>
					</div>

					<div className="field">
						<input
							className="input"
							type="password"
							id="password"
							onChange={(e) => setPassword(e.target.value)}
							value={password}
							placeholder="Password"
							required
						/>
						<label className="label" htmlFor="password">
							Password:{" "}
						</label>
					</div>

					<button className="btn">Register</button>
				</form>

				<Link className="register-link" to="/login">
					<span>Sign in</span>
				</Link>
			</div>
		</div>
	);
};

export default RegisterForm;

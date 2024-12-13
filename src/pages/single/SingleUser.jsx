import { useEffect, useState, useMemo } from "react";
import { useSelector, shallowEqual } from "react-redux";

import ProjectsTable from "../../components/tables/ProjectsTable";
import Loader from "../../components/animations/Loader";
import TicketsTable from "../../components/tables/TicketsTable";
import {
	selectUserTicketsByUserId,
	selectUserProjectsByUserId,
} from "../../reducers/appReducer";

import { useMatch } from "react-router-dom";

const SingleUser = () => {
	const users = useSelector((state) => state.users.data);
	const matchUser = useMatch("/users/:id");
	const [user, setUser] = useState(null);
	useEffect(() => {
		if (matchUser && users.length > 0) {
			const foundUser = users.find((a) => a.id === matchUser.params.id);
			setUser(foundUser);
		}
	}, [matchUser, users]);

	const userId = user ? user.id : null;

	const selectProjects = useMemo(
		() => selectUserProjectsByUserId(userId),
		[userId]
	);
	const selectTickets = useMemo(
		() => selectUserTicketsByUserId(userId),
		[userId]
	);

	const projects = useSelector(
		(state) => (userId ? selectProjects(state) : []),
		shallowEqual
	);

	const tickets = useSelector(
		(state) => (userId ? selectTickets(state) : []),
		shallowEqual
	);

	return user ? (
		<>
			<main>
				<div className="flex-wrapper">
					<div>
						<div className="form-header">
							<h2>Profile Information</h2>
						</div>
						<div className="form-container">
							<div>
								<div className="main-title">EMAIL</div>
								<h2>{user.email}</h2>
							</div>

							<div>
								<div className="main-title">NAME</div>
								<h2>{user.name}</h2>
							</div>
							<div>
								<div className="main-title">ROLE</div>
								<h2>{user.role}</h2>
							</div>
						</div>
					</div>
					<div className="table-wrapper">
						<div className="form-header">
							<h2>{user.name}'s Projects</h2>
						</div>
						<div className="smaller-mui-table-container">
							<ProjectsTable
								projects={projects.length > 0 ? projects : []}
							/>
						</div>
					</div>

					<div className="table-wrapper">
						<div className="form-header">
							<h2>{user.name}'s Tickets</h2>
						</div>

						<div className="smaller-mui-table-container">
							<TicketsTable
								tickets={tickets.length > 0 ? tickets : []}
							/>
						</div>
					</div>
				</div>
			</main>
		</>
	) : null;
};

export default SingleUser;

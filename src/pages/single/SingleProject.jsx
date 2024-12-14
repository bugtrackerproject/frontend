import "./single.scss";

import { useMatch } from "react-router-dom";
import UsersTable from "../../components/tables/UsersTable";
import TicketsTable from "../../components/tables/TicketsTable";
import { useEffect, useState, useMemo } from "react";
import { useSelector, shallowEqual } from "react-redux";
import { selectProjectTicketsByProjectId } from "../../reducers/appReducer";

const SingleProject = () => {
	const projects = useSelector((state) => state.projects.data);
	const matchProject = useMatch("/projects/:id");
	const [project, setProject] = useState(null);
	const users = useSelector((state) => state.users.data);
	console.log(projects);
	useEffect(() => {
		if (matchProject && projects.length > 0) {
			const foundProject = projects.find(
				(a) => a.id === matchProject.params.id
			);
			setProject(foundProject);
		}
	}, [matchProject, projects]);

	const projectId = project ? project.id : null;

	const selectTickets = useMemo(
		() => selectProjectTicketsByProjectId(projectId),
		[projectId]
	);

	const tickets = useSelector(
		(state) => (projectId ? selectTickets(state) : []),
		shallowEqual
	);

	const projectUsers = useMemo(() => {
		if (project && project.users) {
			return project.users.map((userId) =>
				users.find((user) => user.id === userId)
			);
		}
		return [];
	}, [project, users]);

	return project ? (
		<>
			<main>
				<div className="flex-wrapper">
					<div>
						<div className="form-header">
							<h2>PROJECT DETAILS</h2>
						</div>
						<div className="form-container">
							<div>
								<div className="main-title">PROJECT TITLE</div>
								{project.name}
							</div>
							<div>
								<div className="main-title">
									PROJECT DESCRIPTION
								</div>
								{project.description}
							</div>
						</div>
					</div>
					<div className="table-wrapper">
						<div className="form-header">ASSIGNED USERS</div>
						<div className="smaller-mui-table-container">
							<UsersTable
								users={projectUsers ? projectUsers : []}
							/>
						</div>
					</div>

					<div className="table-wrapper">
						<div className="form-header">TICKETS FOR PROJECT</div>
						<div className="smaller-mui-table-container">
							<TicketsTable
								tickets={tickets}
								projectId={projectId}
							/>
						</div>
					</div>
				</div>
			</main>
		</>
	) : null;
};

export default SingleProject;

import React from "react";

import ProjectsTable from "../../components/tables/ProjectsTable";

import { useSelector } from "react-redux";
import { selectUserProjects } from "../../reducers/appReducer";
import { useDispatch } from "react-redux";
import { removeProject } from "../../reducers/projectsReducer";

const ListProjects = () => {
	const projects = useSelector(selectUserProjects);
	console.log(projects);
	const dispatch = useDispatch();

	const handleDeleteProject = (projectId) => {
		dispatch(removeProject(projectId));
	};

	return (
		<>
			<main>
				<div className="flex-wrapper">
					<div className="table-wrapper">
						<div className="form-header">
							<h2>Assigned Projects</h2>
						</div>
						<div className="mui-table-container">
							<ProjectsTable
								projects={projects}
								deleteProject={handleDeleteProject}
							/>
						</div>
					</div>
				</div>
			</main>
		</>
	);
};

export default ListProjects;

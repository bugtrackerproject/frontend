import "./manageprojects.scss";

import { useSelector } from "react-redux";
import ProjectsTable from "../../../components/tables/ProjectsTable";

const ManageProjects = () => {
	const projects = useSelector((state) => state.projects.data);

	return projects ? (
		<>
			<main>
				<div className="flex-wrapper">
					{/*                    <div className="form-wrapper">

                        <div className="form-header">
                            <h2>Add/Remove Users</h2>
                        </div>

                        <div className="form-container">



                            <h2>SELECT PROJECT</h2>
                            <Select
                                data={projects}
                                label="Projects"
                                onChange={(event, selectedValue) => setProject(selectedValue)}
                            />

                            <div className="user-actions">
                                {project ? (
                                    <>
                                        <div className="add-users">
                                            <h2>SELECT USERS TO ADD</h2>
                                            <SelectMultiple
                                                data={users.filter(user => !project.users.includes(user.id))}
                                                label="Users"
                                                value={selectedUsersToAdd}
                                                onChange={(event, selectedValue) => setSelectedUsersToAdd(selectedValue)}
                                            />
                                            <Button
                                                className="mui-button"
                                                size="large"
                                                sx={{ minWidth: "13rem", marginTop: '2rem' }}
                                                variant="outlined"
                                                onClick={handleAddUsers}
                                                startIcon={<AddIcon /> }

                                            >
                                                Add Users
                                            </Button>
                                        </div>

                                        <div className="remove-users">
                                            <h2>SELECT USERS TO REMOVE</h2>
                                            <SelectMultiple
                                                data={project.users.map(userId => users.find(user => user.id === userId))}
                                                label="Users"
                                                value={selectedUsersToRemove}
                                                onChange={(event, selectedValue) => setSelectedUsersToRemove(selectedValue)}
                                            />
                                            <Button
                                                className="mui-button"
                                                size="large"
                                                sx={{ minWidth: "13rem", marginTop: '2rem'  }}
                                                variant="outlined"
                                                startIcon={<DeleteOutline />}
                                                color="error"
                                                onClick={handleRemoveUsers}
                                            >
                                                Remove Users
                                            </Button>
                                        </div>
                                    </>
                                ) : (
                                    <div className="placeholder">
                                        <p>Please select a project to manage users.</p>
                                    </div>
                                )}
                            </div>
                        
        

                        </div>
                    </div>*/}
					<div className="table-wrapper">
						<div className="form-header">
							<h2>All Projects</h2>
						</div>
						<div className="mui-table-container">
							<ProjectsTable projects={projects} />
						</div>
					</div>
				</div>
			</main>
		</>
	) : null;
};

export default ManageProjects;

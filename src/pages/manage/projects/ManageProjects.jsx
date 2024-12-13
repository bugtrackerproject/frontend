import "./manageprojects.scss"

import { useSelector } from "react-redux"
import { useState } from "react"

import Button from '@mui/material/Button';
import ProjectsTable from "../../../components/tables/ProjectsTable"
import SelectMultiple from "../../../components/checkbox/SelectMultiple"
import Select from "../../../components/checkbox/Select"
import { addUserToProject, removeUserFromProject } from "../../../reducers/projectsReducer"
import { useDispatch } from "react-redux"
import DeleteOutline from "@mui/icons-material/DeleteOutline"
import AddIcon from '@mui/icons-material/Add';

const ManageProjects = () => {

    const dispatch = useDispatch();

    const projects = useSelector((state) => state.projects.data)
    const users = useSelector((state) => state.users.data)
    const user = useSelector(state => state.user)

    const [project, setProject] = useState(null);
    const [selectedUsersToAdd, setSelectedUsersToAdd] = useState([]);
    const [selectedUsersToRemove, setSelectedUsersToRemove] = useState([]);

    const handleAddUsers = async (e) => {
        e.preventDefault();

        for (const user of selectedUsersToAdd) {
            const found = project.users.some(id => id === user.id);
            if (!found) {
                await dispatch(addUserToProject(project.id, user.id));
                setProject(prevProject => ({
                    ...prevProject,
                    users: [...prevProject.users, user.id],
                }));
            } else {
                console.log("User already exists in the project");
            }
        }
        setSelectedUsersToAdd([])
    }

    const handleRemoveUsers = async (e) => {
        e.preventDefault();

        for (const user of selectedUsersToRemove) {
            console.log(user.id)
            await dispatch(removeUserFromProject(project.id, user.id));
            setProject(prevProject => ({
                ...prevProject,
                users: prevProject.users.filter(userId => userId !== user.id),
            }));
        }

        setSelectedUsersToRemove([]);
    }

    const usersNotInProject = users.filter(u => !project?.users.includes(u.id));

    return user ? (
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
                            <ProjectsTable />
                        </div>
                    </div>
                </div>
            </main>
        </>
    ) : null
}

export default ManageProjects

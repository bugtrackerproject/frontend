import "./manageprojects.scss"

import { useSelector } from "react-redux"
import { useState } from "react"

import Button from '@mui/material/Button';
import ProjectsTable from "../../../components/tables/ProjectsTable"
import SelectMultiple from "../../../components/checkbox/SelectMultiple"
import Select from "../../../components/checkbox/Select"
import { addUserToProject, removeUserFromProject } from "../../../reducers/projectsReducer"
import { useDispatch } from "react-redux"


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


                    <div className="table-wrapper">
                        <div className="form-header">
                            <h2>Projects</h2>
                        </div>
                        <div className="table-container">
                            <ProjectsTable className="mui-table" />
                        </div>
                    </div>
                    <div className="form-wrapper">

                        <div className="form-header">
                            <h2>Add or Remove Users From Project</h2>
                        </div>

                        <div className="form-container">

                            <div className="form-content">

                                <div className="main-title">SELECT PROJECT</div>
                                <Select
                                    data={projects}
                                    label="Projects"
                                    onChange={(event, selectedValue) => setProject(selectedValue)}
                                />

                                {project && (
                                    <div className="user-actions">
                                        <div className="add-users">
                                            <div className="main-title">SELECT USERS TO ADD</div>
                                            <SelectMultiple
                                                data={users.filter(user => !project.users.includes(user.id))}
                                                label="Users"
                                                value={selectedUsersToAdd} // Bind selected users to the state
                                                onChange={(event, selectedValue) => setSelectedUsersToAdd(selectedValue)}
                                            />
                                            <Button
                                                sx={{ minWidth: 150, backgroundColor: '#2873ff', marginTop: '20px' }}
                                                variant="contained"
                                                onClick={handleAddUsers}
                                            >
                                                Add Users
                                            </Button>
                                        </div>

                                        <div className="remove-users">
                                            <div className="main-title">SELECT USERS TO REMOVE</div>
                                            <SelectMultiple
                                                data={project.users.map(userId => users.find(user => user.id === userId))}
                                                label="Users"
                                                value={selectedUsersToRemove}
                                                onChange={(event, selectedValue) => setSelectedUsersToRemove(selectedValue)}
                                            />
                                            <Button
                                                sx={{ minWidth: 150, backgroundColor: '#f44336', marginTop: '20px' }}
                                                variant="contained"
                                                onClick={handleRemoveUsers}
                                            >
                                                Remove Users
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    ) : null
}

export default ManageProjects

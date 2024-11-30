import "./manageprojects.scss"

import { useSelector } from "react-redux"
import { useState } from "react"

import Button from '@mui/material/Button';
import ProjectsTable from "../../../components/tables/ProjectsTable"
import SelectMultiple from "../../../components/checkbox/SelectMultiple"
import Select from "../../../components/checkbox/Select"
import { updateProject } from "../../../reducers/projectsReducer"
import { useDispatch } from "react-redux"
import Header from "../../../components/header/Header"


const ManageProjects = ({ toggleSidebar }) => {

  const dispatch = useDispatch();

  const projects = useSelector((state) => state.projects)
  const users = useSelector((state) => state.users)
  const user = useSelector(state => state.user)

  const [project, setProject] = useState([]);
  const [selectedUsers, setUsers] = useState([]);

  const handleAddUsers = async (e) => {
    e.preventDefault()

    let obj = {

      ...project,
      users: project.users
    }

    selectedUsers.forEach(user => {

      const found = project.users.some(u => {
        if (u.id === user.id) {
          
          return true;
        }
        return false;
      });

      if (!found) {
        obj = {

          ...project,
          users: obj.users.concat(user.id),
        }
      } else {
        console.log("user already exists")
      }
    })

    dispatch(updateProject(project.id, obj))

  }
  

  return user ? (
    <>
        <Header page={"Manage Projects"} user={user} toggleSidebar={toggleSidebar} />

        <main>
            <div className="flexWrapper">
              <div className="formWrapper">

                  <div className="formHeader">
                      <h2>Add To Project</h2>
                  </div>
            
                    <div className="formContainer">

                        <div className="formContent">

                            <div className="sub-title">SELECT PROJECT</div>
                            <Select data={projects} label="Projects" onChange={(event, selectedValue) => setProject(selectedValue)} />
                            <div className="sub-title">SELECT USERS</div>
                            <SelectMultiple data={users} label="Users" onChange={(event, selectedValue) => setUsers(selectedValue)} />
                            <div className="button">

                                  <Button sx={{ minWidth: 150, backgroundColor: '#2873ff' }} variant="contained" onClick={handleAddUsers}>Add Users to project</Button>


                            </div>
                        </div>
                </div>
            
                
              </div>
              <div className="table-wrapper">
                    <div className="formHeader">
                        <h2>Projects</h2>
                    </div>
                    <div className="tableContainer">
                        <ProjectsTable className="mui-table" />
                  </div>
                </div>
              </div>
        </main>
    </>
  ) : null
}

export default ManageProjects
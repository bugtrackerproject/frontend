import "./manageprojects.scss"

import { useSelector } from "react-redux"
import { useState } from "react"

import Sidebar from '../../../components/sidebar/Sidebar'
import Button from '@mui/material/Button';
import ProjectsTable from "../../../components/tables/ProjectsTable"
import SelectProjects from "../../../components/checkbox/SelectProjects"
import SelectUsers from "../../../components/checkbox/SelectUsers"
import { updateProject } from "../../../reducers/projectsReducer"
import { useDispatch } from "react-redux"
import Header from "../../../components/header/Header"


const ManageProjects = ({ isSidebarActive, toggleSidebar }) => {

  const dispatch = useDispatch();

  const projects = useSelector((state) => state.projects)
  const users = useSelector((state) => state.users)
  const user = useSelector(state => state.user)

  const [project, setProject] = useState('');
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
        <Sidebar isSidebarActive={isSidebarActive} />
        
        <div className="main-content">
          <Header page={"Manage Projects"} user={user} toggleSidebar={toggleSidebar} />


        <main>
          <div className="add-page">
            

            <div className="select-form">
              <div className="main-title">PROJECTS</div>
              <div className="form-container">
                <div className="sub-title">SELECT PROJECT</div>
                <SelectProjects data={projects} onChange={(event, selectedValue) => setProject(selectedValue)}/>
                <div className="sub-title">SELECT USERS</div>
                <SelectUsers data={users} onChange={(event, selectedValue) => setUsers(selectedValue)}/>
                <div className="buttons">

                  <Button sx={{ minWidth: 150 }} variant="outlined" onClick={handleAddUsers}>Add Users to project</Button>

                </div>
              </div>
            </div>
            
            <div className="table-wrapper">
                <div className="main-title">ALL PROJECTS</div>
                <ProjectsTable className="mui-table" />
            </div>
          </div>
        </main>
      </div>
    </>
  ) : null
}

export default ManageProjects
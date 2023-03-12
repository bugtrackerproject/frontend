
import Sidebar from '../../components/sidebar/Sidebar'
import Header from '../../components/header/Header'

import { TextField, Button } from '@mui/material'

import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { createProject } from '../../reducers/projectsReducer'
import SelectUsers from '../../components/checkbox/SelectUsers'
import { useNavigate } from 'react-router-dom'

const CreateProject = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const users = useSelector((state) => state.users)
    const user = useSelector((state) => state.user)

    const [selectedUsers, setUsers] = useState([]);
    const [newName, setNewName] = useState('')
    const [newDesc, setNewDesc] = useState('')

    const handleAddProject = async (e) => {
        e.preventDefault()

        if(newName && newDesc){
            const newUsers = selectedUsers.map(user => user.id)

        
            const obj = {
              name: newName,
              description: newDesc,
              users: newUsers
            }
    
            console.log(obj);
        
            dispatch(createProject(obj))
    
            navigate("/projects")
        }
      }


  return (
    <>
        <input type="checkbox" id="nav-toggle" />
        <Sidebar />
        
        <div className="main-content">

            <Header page={"My Projects"} user={user} />
            <main>
                
                <div className="formContainer">

                    <div className="mainTitle">PROJECT NAME</div>
                    <TextField id="filled-basic" label="Name" variant="filled" onChange={(event) => setNewName(event.target.value)}/>

                    <div className="mainTitle">PROJECT DESCRIPTION</div>
                    <TextField id="filled-basic" label="Description" variant="filled" onChange={(event) => setNewDesc(event.target.value)}/>

                    <div className="mainTitle">SELECT USERS</div>
                    <SelectUsers data={users} onChange={(event, selectedValue) => setUsers(selectedValue)}/>

                    <div className="btnAddProject">
                        <span className="button">
                            <Button sx={{ minWidth: 150 }} variant="contained" onClick={handleAddProject}>Add Project</Button>
                        </span>

                    </div>
                </div>
            </main>

        </div>
  </>
  )
}

export default CreateProject
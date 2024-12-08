
import Header from '../../components/header/Header'

import { TextField, Button } from '@mui/material'

import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { createProject } from '../../reducers/projectsReducer'
import SelectMultiple from '../../components/checkbox/SelectMultiple'
import { useNavigate } from 'react-router-dom'

const CreateProject = ({ toggleSidebar }) => {

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
            <div className="form-wrapper">

                <div className="form-header">
                    <h2>Create New Project</h2>
                </div>

                <div className="form-container">     

                    <div className="mainTitle">PROJECT NAME</div>
                        <TextField id="filled-basic" label="Name" variant="outlined" onChange={(event) => setNewName(event.target.value)}/>

                    <div className="mainTitle">PROJECT DESCRIPTION</div>
                        <TextField id="filled-basic" label="Description" variant="outlined" onChange={(event) => setNewDesc(event.target.value)}/>

                    <div className="mainTitle">SELECT USERS</div>
                    <SelectMultiple data={users} label="Users" onChange={(event, selectedValue) => setUsers(selectedValue)} />

                    <div className="button">
                        
                        <Button sx={{ minWidth: 150, backgroundColor: '##2873ff' }} variant="contained" onClick={handleAddProject}>Add</Button>
                    
                    </div>
                </div>
            </div>
            
            
      </>
      )
    }
    
export default CreateProject
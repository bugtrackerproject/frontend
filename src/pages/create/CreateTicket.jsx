
import Sidebar from '../../components/sidebar/Sidebar'
import Header from '../../components/header/Header'

import { TextField, Button } from '@mui/material'

import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import SelectUser from '../../components/checkbox/SelectUser'
import { useNavigate } from 'react-router-dom'
import SelectProjects from '../../components/checkbox/SelectProjects'


import './create.scss'
import SelectType from '../../components/checkbox/SelectType'
import { createTicket } from '../../reducers/ticketsReducer'

const CreateTicket = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const users = useSelector((state) => state.users)
    const user = useSelector((state) => state.user)
    const projects = useSelector(state => state.projects)

    
    const [newName, setNewName] = useState('')
    const [newDesc, setNewDesc] = useState('')
    const [project, setProject] = useState({})
    const [type, setType] = useState('')
    const [newUser, setNewUser] = useState({});

    const types = ["Bug", "Feature Request"]

    const handleAddTicket = async (e) => {
        e.preventDefault()

        if(newName && newDesc && project && type && newUser){

    
                    
          const obj = {
            name: newName,
            description: newDesc,
            project: project.id,
            assignee: user.id,
            type: type
          }
      
          dispatch(createTicket(obj))

    
          navigate("/tickets")
        }
      }


  return (
    <>
        <input type="checkbox" id="nav-toggle" />
        <Sidebar />
        
        <div className="main-content">

            <Header page={"My Tickets"} user={user} />
            <main>
              <div className="formContainer">
                  <div className="mainTitle">SELECT PROJECT</div>
                  <SelectProjects data={projects} onChange={(event, selectedValue) => setProject(selectedValue)}/>
                  <div className="mainTitle">TICKET NAME</div>
                  <TextField id="filled-basic" label="Name" variant="filled" onChange={(event) => setNewName(event.target.value)}/>
                  <div className="mainTitle">TICKET DESCRIPTION</div>
                  <TextField id="filled-basic" label="Description" variant="filled" onChange={(event) => setNewDesc(event.target.value)}/>
                  <div className="mainTitle">ASSIGN USER</div>
                  <SelectUser data={users} onChange={(event, selectedValue) => setNewUser(selectedValue)}/>
                  <div className="mainTitle">TYPE</div>
                  <SelectType data={types} onChange={(event, selectedValue) => setType(selectedValue)}/>
                  <div className="btnAddProject">
                      <span className="button">
                          <Button sx={{ minWidth: 150 }} variant="contained" onClick={handleAddTicket}>Add Ticket</Button>
                      </span>
              
                  </div>
              </div>
            </main>

        </div>
  </>
  )
}

export default CreateTicket
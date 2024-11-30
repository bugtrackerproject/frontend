
import Header from '../../components/header/Header'

import { TextField, Button } from '@mui/material'

import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Select from '../../components/checkbox/Select'
import { createTicket } from '../../reducers/ticketsReducer'

const CreateTicket = ({ toggleSidebar }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const users = useSelector((state) => state.users)
    const user = useSelector((state) => state.user)
    const projects = useSelector(state => state.projects)


    const filteredProjects = projects.filter(project =>
        Array.isArray(project.users) && project.users.includes(user.id)
    );
    
    const [newName, setNewName] = useState(null)
    const [newDesc, setNewDesc] = useState('')
    const [project, setProject] = useState(null)
    const [type, setType] = useState(null)
    const [newUser, setNewUser] = useState(null);

    const types = ["Bug", "Feature Request"]

    const handleAddTicket = async (e) => {
        e.preventDefault()

        if(newName && newDesc && project && type && newUser){
                    
          const obj = {
            name: newName,
            description: newDesc,
            project: project.id,
            assignee: newUser.id,
            type: type
          }
      
          dispatch(createTicket(obj))

    
          navigate("/tickets")
        }
    }


  return (
    <>
        <Header page={"My Tickets"} user={user} toggleSidebar={toggleSidebar} />
          <main>

              <div className="formWrapper">

                  <div className="formHeader">
                      <h2>Create New Ticket</h2>
                  </div>
                <div className="formContainer">
                    <div className="mainTitle">SELECT PROJECT</div>
                      <Select data={filteredProjects} label="Project" onChange={(event, selectedValue) => setProject(selectedValue)}/>
                    <div className="mainTitle">TICKET NAME</div>
                    <TextField id="filled-basic" label="Name" variant="outlined" onChange={(event) => setNewName(event.target.value)}/>
                    <div className="mainTitle">TICKET DESCRIPTION</div>
                      <TextField id="filled-basic" label="Description" variant="outlined" onChange={(event) => setNewDesc(event.target.value)}/>
                    <div className="mainTitle">ASSIGN USER</div>
                      <Select data={users} label="User" onChange={(event, selectedValue) => setNewUser(selectedValue)}/>
                    <div className="mainTitle">TYPE</div>
                      <Select data={types} label="Type" onChange={(event, selectedValue) => setType(selectedValue)}/>
                    <div className="button">
                    
                          <Button sx={{ minWidth: 150, backgroundColor: '#2873ff' }} variant="contained" onClick={handleAddTicket}>Add</Button>
             
              
                    </div>
                 </div>
            </div>
        </main>
  </>
  )
}

export default CreateTicket
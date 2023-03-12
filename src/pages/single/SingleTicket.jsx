import "./single.scss"

import Sidebar from '../../components/sidebar/Sidebar'
import Header from '../../components/header/Header'


import { useSelector } from 'react-redux'
import { useState } from "react"

import { Button } from "@mui/material"
import SelectStatus from "../../components/checkbox/SelectStatus"
import SelectPriority from "../../components/checkbox/SelectPriority"


const SingleTicket= ({ ticket, isSidebarActive, toggleSidebar }) => {

    
    const [status, setStatus] = useState("")
    const [priority, setPriority] = useState("")
    const projects = useSelector(state => state.projects)
    const users = useSelector(state => state.users)
    const user = useSelector(state => state.user)

    if (!ticket) {
        return <></>
    }


    let project
    let assignee
    let submitter

    const statuses = ["To Do", "In Progress", "Done"]

    const priorities = ["Low", "Medium", "High"]

    project = projects.find(project => project.id === ticket.project)
    assignee = users.find(user => user.id === ticket.assignee)
    submitter = users.find(user => user.id === ticket.submitter)

    
    const handleAddTicket = async (e) => {
        e.preventDefault()

        if(priority || status){

    
                    
          const obj = {
            ...ticket
          }
  
          console.log(obj);
      
          

        }
      }

  return project && assignee && submitter ? (
    <>
        <Sidebar isSidebarActive={isSidebarActive} />
        
        <div className="main-content">
          <Header page={project.name} user={user} toggleSidebar={toggleSidebar} />


          <main>
            <div className="main-title">TICKET TITLE</div>
            {ticket.name}

            <div className="main-title">PROJECT DESCRIPTION</div>
            {ticket.description}

            <div className="main-title">PRIORITY</div>
            <SelectPriority defaultValue={ticket.priority} data={priorities} onChange={(event, selectedValue) => setPriority(selectedValue)}/> 

            <div className="main-title">TYPE</div>
            {ticket.type}

            <div className="main-title">STATUS</div>
            <SelectStatus defaultValue={ticket.status} data={statuses} onChange={(event, selectedValue) => setStatus(selectedValue)}/> 

        

            <div className="main-title">PROJECT</div>
            {project.name}
            
            
            <div className="main-title">ASSIGNED TO</div>
            {assignee.name}

            <div className="main-title">SUBMITTED BY</div>
            {submitter.name}
            
            
            <div className="btnAddProject">
                <span className="button">
                    <Button sx={{ minWidth: 150 }} variant="contained" onClick={handleAddTicket}>Update Ticket</Button>
                </span>
        
    
            </div>

          </main>
      </div>
    </>
  ) : null
}

export default SingleTicket
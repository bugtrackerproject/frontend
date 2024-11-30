import "./single.scss"

import Header from '../../components/header/Header'


import { useSelector } from 'react-redux'
import { useState } from "react"

import { Button } from "@mui/material"
import Select from "../../components/checkbox/Select"



const SingleTicket= ({ ticket, toggleSidebar }) => {

    
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
        <Header page={project.name} user={user} toggleSidebar={toggleSidebar} />


          <main>
            
              <div className="flexWrapper">
                  <div className="formWrapper">

                      <div className="formHeader">
                          <h2>TICKET DETAILS</h2>
                      </div>
                      <div className="formContainer">
                          <div>
                                <div className="mainTitle">TICKET TITLE</div>
                                {ticket.name}

                              <div className="mainTitle">PROJECT DESCRIPTION</div>
                                {ticket.description}

                              <div className="mainTitle">PRIORITY</div>
                                <Select defaultValue={ticket.priority} data={priorities} onChange={(event, selectedValue) => setPriority(selectedValue)}/> 

                              <div className="mainTitle">TYPE</div>
                                {ticket.type}

                                <div className="mainTitle">STATUS</div>
                                <Select defaultValue={ticket.status} data={statuses} onChange={(event, selectedValue) => setStatus(selectedValue)}/> 

        

                                <div className="mainTitle">PROJECT</div>
                                {project.name}
            
            
                                <div className="mainTitle">ASSIGNED TO</div>
                                {assignee.name}

                                <div className="mainTitle">SUBMITTED BY</div>
                                {submitter.name}
                          </div>

                      </div>

               </div>
            </div>
                <div className="btnAddProject">
                    <span className="button">
                        <Button sx={{ minWidth: 150 }} variant="contained" onClick={handleAddTicket}>Update Ticket</Button>
                    </span>
        
    
                </div>

        </main>
    </>
  ) : null
}

export default SingleTicket
import "./single.scss"

import Header from '../../components/header/Header'


import { useSelector } from 'react-redux'
import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom';

import { Button } from "@mui/material"
import Select from "../../components/checkbox/Select"

import { useDispatch } from 'react-redux';
import { updateTicket } from '../../reducers/ticketsReducer'
import ticketMetaService from '../../services/ticketmeta'

const SingleTicket= ({ ticket, toggleSidebar }) => {

    
    const [status, setStatus] = useState(null)
    const [priority, setPriority] = useState(null)
    const [statuses, setStatuses] = useState(null);
    const [priorities, setPriorities] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const projects = useSelector(state => state.projects)
    const users = useSelector(state => state.users)
    const user = useSelector(state => state.user)

    useEffect(() => {
        if (ticket) {
          setStatus(ticket.status) 
          setPriority(ticket.priority)
        }
    }, [ticket])

    
    useEffect(() => {
        const fetchTicketMeta = async () => {
            try {
                const fetchedStatuses = await ticketMetaService.getTicketStatuses();
                const fetchedPriorities = await ticketMetaService.getTicketPriorities();
                setStatuses(fetchedStatuses);
                setPriorities(fetchedPriorities);
            } catch (error) {
                console.error('Error fetching ticket meta:', error);
            }
        };

        fetchTicketMeta();
    }, []); 


    let project
    let assignee
    let submitter

    project = projects.find(project => project.id === ticket.project)
    assignee = users.find(user => user.id === ticket.assignee)
    submitter = users.find(user => user.id === ticket.submitter)

    const isAssignee = user.id === assignee?.id;



    
    const handleUpdateTicket = async (e) => {
        e.preventDefault()

     if (priority || status) {
          let updatedTicket = {
            ...ticket,  
            priority: priority,   
            status: status
          };

         dispatch(updateTicket(ticket.id, updatedTicket));

           navigate('/tickets');
        }
      };

     


  return project && assignee && submitter ? (
    <>
        
        <Header page={project.name} user={user} toggleSidebar={toggleSidebar} />

          <main>
            
              <div className="flex-wrapper">
                  <div className="formWrapper">

                      <div className="form-header">
                          <h2>TICKET DETAILS</h2>
                      </div>
                      <div className="form-container">
                          <div>
                                <div className="main-title">TICKET TITLE</div>
                                {ticket.name}

                              <div className="main-title">PROJECT DESCRIPTION</div>
                                {ticket.description}

                              <div className="main-title">PRIORITY</div>
                              {isAssignee ? (
                                    <Select defaultValue={ticket.priority} data={priorities} onChange={(event, selectedValue) => setPriority(selectedValue)} />
                                ) : (
                                    ticket.priority
                                )}

                              <div className="main-title">TYPE</div>
                                {ticket.type}

                                <div className="main-title">STATUS</div>
                                {isAssignee ? (
                                    <Select defaultValue={ticket.status} data={statuses} onChange={(event, selectedValue) => setStatus(selectedValue)}/> 
                                ) : (
                                    ticket.status
                                )}

                                <div className="main-title">PROJECT</div>
                                {project.name}
            
            
                                <div className="main-title">ASSIGNED TO</div>
                                {assignee.name}

                                <div className="main-title">SUBMITTED BY</div>
                                {submitter.name}
                          </div>

                      </div>

               </div>
            </div>
                {isAssignee && (
                    <div className="button">
                        <span className="button">
                            <Button sx={{ minWidth: 150 }} variant="contained" onClick={handleUpdateTicket}>Update Ticket</Button>
                        </span>
                    </div>
                )}

        </main>
    </>
  ) : null
}

export default SingleTicket
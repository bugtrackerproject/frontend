import { useSelector } from 'react-redux'
import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom';

import { Button } from "@mui/material"
import Select from "../../components/checkbox/Select"

import { useDispatch } from 'react-redux';
import { updateTicket } from '../../reducers/ticketsReducer'
import ticketMetaService from '../../services/ticketmeta'

const UpdateTicket = ({ ticket }) => {

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

    if (!ticket) {
        return (
            <div className="form-wrapper">
                <div className="form-header">
                    <h2>Update Ticket</h2>
                </div>
                <div className="form-container">
                    <p>No ticket selected.</p>
                </div>
            </div>
        );
    }


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

        }
    };

    console.log(project)
    console.log(assignee)
    return project && assignee && submitter ? (
        <>
            <div className="form-wrapper">

                <div className="form-header">
                    <h2>TICKET DETAILS</h2>
                </div>
                <div className="form-container">
                    <div>
                        <div className="mainTitle">TICKET TITLE</div>
                        {ticket.name}

                        <div className="mainTitle">PROJECT DESCRIPTION</div>
                        {ticket.description}

                        <div className="mainTitle">PRIORITY</div>
                        {isAssignee ? (
                            <Select defaultValue={ticket.priority} data={priorities} onChange={(event, selectedValue) => setPriority(selectedValue)} />
                        ) : (
                            ticket.priority
                        )}

                        <div className="mainTitle">TYPE</div>
                        {ticket.type}


                        <div className="mainTitle">STATUS</div>
                        {isAssignee ? (
                            <Select defaultValue={ticket.status} data={statuses} onChange={(event, selectedValue) => setStatus(selectedValue)} />
                        ) : (
                            ticket.status
                        )}

                        <div className="mainTitle">PROJECT</div>
                        {project.name}

                        <div className="row-fields">
                            <div>
                                <div className="mainTitle">ASSIGNED TO</div>
                                {assignee.name}
                            </div>

                            <div>
                                <div className="mainTitle">SUBMITTED BY</div>
                                {submitter.name}
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
                </div>

            </div>




        </>
    ) : null
}

export default UpdateTicket
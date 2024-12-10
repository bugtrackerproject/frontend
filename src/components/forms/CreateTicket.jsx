import { TextField, Button } from '@mui/material'

import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Select from '../../components/checkbox/Select'
import { createTicket } from '../../reducers/ticketsReducer'
import ticketMetaService from '../../services/ticketmeta'

const CreateTicket = ({ toggleSidebar }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const users = useSelector((state) => state.users.data)
    const user = useSelector(state => state.user)
    const projects = useSelector(state => state.projects.data)

    const filteredProjects = projects.filter(project =>
        Array.isArray(project.users) && project.users.includes(user.id)
    );

    const [newName, setNewName] = useState(null)
    const [newDesc, setNewDesc] = useState('')
    const [project, setProject] = useState(null)
    const [type, setType] = useState(null)
    const [priority, setPriority] = useState(null)
    const [newUser, setNewUser] = useState(null);

    const [types, setTypes] = useState([]);
    const [priorities, setPriorities] = useState([]);

    useEffect(() => {
        const fetchTicketMeta = async () => {
            try {
                const fetchedTypes = await ticketMetaService.getTicketTypes();
                const fetchedPriorities = await ticketMetaService.getTicketPriorities();
                console.log('Fetched types:', fetchedTypes);
                setTypes(fetchedTypes);
                setPriorities(fetchedPriorities);
            } catch (error) {
                console.error('Error fetching ticket meta:', error);
            }
        };

        fetchTicketMeta();
    }, []);

    const handleAddTicket = async (e) => {
        e.preventDefault()

        if (newName && newDesc && project && type && priority && newUser) {

            const obj = {
                name: newName,
                description: newDesc,
                project: project.id,
                assignee: newUser.id,
                type: type,
                priority: priority
            }

            dispatch(createTicket(obj))


            navigate("/tickets")
        }
    }

    return (

        <div className="form-wrapper">

            <div className="form-header">
                <h2>Create New Ticket</h2>
            </div>
            <div className="form-container">
                <div className="form-rows">
                    <div className="main-title">SELECT PROJECT</div>
                    <Select data={filteredProjects} label="Project" onChange={(event, selectedValue) => setProject(selectedValue)} />
                </div>
                <div className="form-rows">

                    <div className="main-title">TICKET NAME</div>
                    <TextField id="filled-basic" label="Name" variant="outlined" onChange={(event) => setNewName(event.target.value)} />
                </div>
                <div className="form-rows">

                    <div className="main-title">TICKET DESCRIPTION</div>
                    <TextField id="filled-basic" label="Description" variant="outlined" onChange={(event) => setNewDesc(event.target.value)} />
                </div>
                <div className="form-rows">
                    <div className="main-title">ASSIGN USER</div>
                    <Select data={users} label="User" onChange={(event, selectedValue) => setNewUser(selectedValue)} value={newUser} />

                </div>
                <div className="form-rows">
                    <div className="main-title">TYPE</div>
                    {types && (
                        <Select
                            data={types}
                            label="Types"
                            onChange={(event, selectedValue) => setType(selectedValue)}
                            value={type}
                        />
                    )}

                </div>
                <div className="form-rows">
                    <div className="main-title">PRIORITY</div>
                    {priorities && (
                        <Select
                            data={priorities}
                            label="Priority"
                            onChange={(event, selectedValue) => setPriority(selectedValue)}
                            value={priority}
                        />
                    )}

                </div>

                <div className="button">

                    <Button sx={{ minWidth: 150, backgroundColor: '#2873ff' }} variant="contained" onClick={handleAddTicket}>Add</Button>


                </div>
            </div>
        </div>

    );
};

export default CreateTicket
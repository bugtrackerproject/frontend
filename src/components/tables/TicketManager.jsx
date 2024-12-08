import TicketsTable from './TicketsTable';
import { TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import Select from '../../components/checkbox/Select'
import { createTicket } from '../../reducers/ticketsReducer'
import ticketMetaService from '../../services/ticketmeta'

const TicketManager = ({ filter, value }) => {

    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const [name, setName] = useState(null)
    const [desc, setDesc] = useState('')
    const [project, setProject] = useState(null)
    const [type, setType] = useState(null)
    const [priority, setPriority] = useState(null)
    const [assignee, setAssignee] = useState(null);

    const [types, setTypes] = useState([]);
    const [priorities, setPriorities] = useState([]);

    const handleOpenDialog = () => {
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
        resetForm();
    };

    const resetForm = () => {
        setName('');
        setDesc('');
        setProject(null);
        setType(null);
        setPriority(null);
        setAssignee(null);
    };

    const dispatch = useDispatch();

    const users = useSelector((state) => state.users)
    const user = useSelector(state => state.user)
    const projects = useSelector(state => state.projects)

    const filteredProjects = projects.filter(project =>
        Array.isArray(project.users) && project.users.includes(user.id)
    );

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

    const handleAddTicket = async () => {
        if (name && desc && project && type && priority && assignee) {
            const ticketData = {
                name: name,
                description: desc,
                project: project.id,
                assignee: assignee.id,
                type,
                priority,
            };

            dispatch(createTicket(ticketData));
            handleCloseDialog();
        } else {
            alert('Please fill out all required fields.');
        }
    };


    return (
        <div style={{ }}>
            {/* Tickets Table */}
            <div>
                <TicketsTable filter={filter} value={value} />
            </div>

            {/* Floating Action Button */}
            <Fab 
                color="primary" 
                aria-label="add" 
                style={{ position: 'fixed', bottom: '20px', right: '20px' }} 
                onClick={handleOpenDialog}
            >
                <AddIcon />
            </Fab>

            {/* Create Ticket Dialog */}
            <Dialog open={isDialogOpen} onClose={handleCloseDialog} fullWidth maxWidth="md">
                <DialogTitle>Create New Ticket</DialogTitle>
                <DialogContent>
                    <div style={{ margin: '10px 0' }}>
                        <Select
                            data={filteredProjects}
                            label="Select Project"
                            onChange={(event, selectedValue) => setProject(selectedValue)}
                            value={project}
                        />
                    </div>
                    <div style={{ margin: '10px 0' }}>
                        <TextField
                            fullWidth
                            label="Ticket Name"
                            variant="outlined"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div style={{ margin: '10px 0' }}>
                        <TextField
                            fullWidth
                            label="Description"
                            variant="outlined"
                            multiline
                            rows={3}
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                        />
                    </div>
                    <div style={{ margin: '10px 0' }}>
                        <Select
                            data={users}
                            label="Assign To User"
                            onChange={(event, selectedValue) => setAssignee(selectedValue)}
                            value={assignee}
                        />
                    </div>
                    <div style={{ margin: '10px 0' }}>
                        <Select
                            data={types}
                            label="Select Type"
                            onChange={(event, selectedValue) => setType(selectedValue)}
                            value={type}
                        />
                    </div>
                    <div style={{ margin: '10px 0' }}>
                        <Select
                            data={priorities}
                            label="Select Priority"
                            onChange={(event, selectedValue) => setPriority(selectedValue)}
                            value={priority}
                        />
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleAddTicket} color="primary" variant="contained">
                        Create Ticket
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default TicketManager
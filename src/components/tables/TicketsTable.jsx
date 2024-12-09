import * as React from 'react';

import { useSelector } from 'react-redux';
import { GridToolbarQuickFilter } from '@mui/x-data-grid';
import {  Stack, Box } from '@mui/material';
import TicketCrudTable from './TicketCrudTable';
import { useDispatch } from 'react-redux'
function QuickSearchToolbar() {
    return (
        <Box
            sx={{
                textAlign: "right",
                p: 0.5,
                pb: 0,
            }}
        >
            <GridToolbarQuickFilter
                quickFilterParser={(searchInput) =>
                    searchInput
                        .split(',')
                        .map((value) => value.trim())
                        .filter((value) => value !== '')
                }
            />
        </Box>
    );
}

function createData(
    name,
    description,
    project,
    assignee,
    priority,
    status,
    type,
    createdAt,
    updatedAt,
    id
) {
    return { name, description, project, assignee, priority, status, type, createdAt, updatedAt, id };
}


const TicketsTable = ({ filter, value }) => {

    let tickets = useSelector(state => state.tickets)
    const projects = useSelector(state => state.projects)
    const users = useSelector(state => state.users)
    //const users = useSelector(state => state.users)
    let filteredTickets = tickets


    switch (filter) {
        case "user": // filter to show only tickets assigned to logged in user
            filteredTickets = tickets.filter(ticket => ticket.assignee === value.id)
          
            break;
        case "project":
            filteredTickets = tickets.filter(ticket => ticket.project === value.id)
            break;
        case "recent":
            //tickets = tickets.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())

            //tickets = tickets.slice(tickets, 4)
            break;
        default:
            // show all tickets


            break;
    }
    const rows = filteredTickets.map(ticket => {
        const project = projects.find(project => project.id === ticket.project);
        const assignee = users.find(user => user.id === ticket.assignee)
        return createData(
            ticket.name,
            ticket.description,
            project.name,
            assignee.name,
            ticket.priority,
            ticket.status,
            ticket.type,
            ticket.createdAt,
            ticket.updatedAt,
            ticket.id
        );
    });

    return rows ? (

        <TicketCrudTable
            initialRows={rows}
            sx={{
                boxShadow: 2,
                border: 1,
                borderColor: 'primary.black',
                '& .MuiDataGrid-cell:hover': {
                    color: 'primary.main',
                },
                '& .MuiDataGrid-virtualScroller': {
                    overflow: 'auto', // Enable overflow for scrolling
                }
            }}
            
            slotProps={{
                loadingOverlay: {
                    variant: 'linear-progress',
                    noRowsVariant: 'skeleton',
                },
            }}
            initialState={{
                sorting: {
                    sortModel: [{ field: 'updatedAt', sort: 'desc' }],
                },
            }}
            /*onRowDoubleClick={(params) => navigate(`/tickets/${params.row.id}`)}*/
            components={{
                Toolbar: QuickSearchToolbar,
                NoRowsOverlay: () => (
                    <Stack height="100%" alignItems="center" justifyContent="center">
                        User has no tickets
                    </Stack>
                )
            }}
     
        />

    ) : null
}

export default TicketsTable
import * as React from 'react';

import { useSelector } from 'react-redux';
import {  Stack, Box } from '@mui/material';
import TicketCrudTable from './TicketCrudTable';

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


const TicketsTable = ({ tickets }) => {

    const projects = useSelector(state => state.projects.data)
    const users = useSelector(state => state.users.data)


    const rows = tickets.map(ticket => {
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
            key={JSON.stringify(rows.map(row => row.id))}
            initialRows={rows}
            sx={{
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
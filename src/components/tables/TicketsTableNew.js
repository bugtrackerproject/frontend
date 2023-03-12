import * as React from 'react';

import { useSelector } from 'react-redux';
import { Box } from '@mui/system';
import { Link } from 'react-router-dom';
import { DataGrid, GridToolbarQuickFilter } from '@mui/x-data-grid';
import { useEffect } from 'react';

import "./table.scss"

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


const columns = [
  { field: 'name', headerName: 'Name', minWidth: 100, flex: 1 },
  { field: 'description', headerName: 'Description', minWidth: 130, flex: 1 },
  {
    field: 'project',
    headerName: 'Project',
    minWidth: 130, flex: 1
  },
  {
    field: 'user',
    headerName: 'Assigned User',
    minWidth: 130, flex: 1
  },
  {
    field: 'priority',
    headerName: 'Priority',
    minWidth: 60, flex: 1
  },
  {
    field: 'status',
    headerName: 'Status',
    minWidth: 60, flex: 1
  },
  {
    field: 'createdAt',
    headerName: 'Date Created',
    minWidth: 150, flex: 1
  },
  {
    field: 'updatedAt',
    headerName: 'Date Updated',
    minWidth: 150, flex: 1
  },
  {
    field: 'id',
    headerName: 'ID',
    sortable: false,
    flex: 1,
    minWidth: 210,
    renderCell: (params) => (
        <Link to={`/tickets/${params.value}`}>{params.value}</Link>
      )
  },
];

function createData(
    name,
    description,
    project, 
    user,
    priority,
    status,
    createdAt,
    updatedAt,
    id
  ) {
    return { name, description, project, user, priority, status, createdAt, updatedAt, id};
  }

const TicketsTable = ({ filter, value }) => {

    let ticketsSelector = useSelector(state => state.tickets)

    const projects = useSelector(state => state.projects)
    const users = useSelector(state => state.users)

    let tickets = ticketsSelector.slice()


    switch(filter) {
        case "user":
        tickets = ticketsSelector.filter(ticket => ticket.assignee === value.id)
        break;
        case "project":
        tickets = ticketsSelector.filter(ticket => ticket.project === value.id)
        break;
        case "recent":
        //tickets = tickets.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())

        //tickets = tickets.slice(tickets, 4)
        break;
        default:
        break;    
    }

    
    let rows 

    if (users.length > 0 && projects.length > 0 && tickets.length > 0 ) {
      rows = tickets
        .map (ticket => {
            const project = projects.find(project => project.id === ticket.project)
            const user = users.find(user => user.id === ticket.assignee)
            return createData(ticket.name, ticket.description, project.name, user.name, ticket.priority, ticket.status, ticket.createdAt, ticket.updatedAt, ticket.id)
        })
        .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    }

    return rows ? (

      <DataGrid 
        sx={{
          boxShadow: 1,
          backgroundColor:'white'
        }}

        rows={rows}
        columns={columns}
        pageSize={5}
        autoHeight={true}
        autoPageSize={true}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick={true}

        components={{ Toolbar: QuickSearchToolbar }}
      />

    ) : null
}

export default TicketsTable
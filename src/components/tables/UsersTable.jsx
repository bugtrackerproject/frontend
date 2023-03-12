import * as React from 'react';

import { useSelector } from 'react-redux';
import { Box } from '@mui/system';
import { Link } from 'react-router-dom';
import { DataGrid, GridToolbarQuickFilter } from '@mui/x-data-grid';

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
  { field: 'name', headerName: 'Name', minWidth: 130, flex: 1 },
  { field: 'email', headerName: 'Email', minWidth: 130, flex: 1 },
  {
    field: 'role',
    headerName: 'Role',
    minWidth: 130, flex: 1
  },
  {
    field: 'id',
    headerName: 'ID',
    sortable: false,
    flex: 1,
    minWidth: 210,
    renderCell: (params) => (
        <Link to={`/users/${params.value}`}>{params.value}</Link>
      )
  },
];

function createData(
  name,
  email,
  role,
  id
) {
  return { name, email, role, id};
}


const UsersTable = ({ filter, value }) => {

  let users = useSelector((state) => state.users)

  switch(filter) {
    case "project":
      let userIds = []

      value.users.forEach(user => {
        userIds.push(user)
      })

      users = users.filter(user => {
        return userIds.includes(user.id)
      })

      console.log(users)
      //users = users.filter(user => ticket.assignee === value.id)
      break;
    case "ticket":
      //tickets = tickets.filter(ticket => ticket.project === value.id)
      break;
    default:
      break;    
  }
    


  const rows = users.map(user => {
    return createData(user.name, user.email, user.role, user.id)
  })   

  return (
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
  );
}

export default UsersTable
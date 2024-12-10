import * as React from 'react';

import { useSelector } from 'react-redux';
import UserCrudTable from './UserCrudTable'

function createData(
  name,
  email,
  role,
  id
) {
  return { name, email, role, id};
}


const UsersTable = ({ filter, value }) => {

  let users = useSelector((state) => state.users.data)

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
      <UserCrudTable
          initialRows={rows}
      sx={{
        boxShadow: 1,
        backgroundColor:'white'
          }}
          slotProps={{
              loadingOverlay: {
                  variant: 'linear-progress',
                  noRowsVariant: 'skeleton',
              },
          }}
    />
  );
}

export default UsersTable
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import "./table.scss"

function createData(
  name,
  priority,
  project,
  status,
) {
  return { name, priority, project, status };
}


const rows = [
  createData('Frozen yoghurt', 'Low', "Website", "To Do"),
  createData('Ice cream sandwich', "Low", "Website", "To Do"),
  createData('Eclair', "Low", "Website", "To Do"),
  createData('Cupcake', "Low", "Website", "In Progress"),
  createData('Gingerbread', "Low", "Website", "To Do"),
];

const BasicTable = ({ type }) => {

    

  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell>{type}</TableCell>
            <TableCell align="right">Priority</TableCell>
            <TableCell align="right">Project</TableCell>
            <TableCell align="right">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.priority}</TableCell>
              <TableCell align="right">{row.project}</TableCell>
              <TableCell align="right">{row.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default BasicTable
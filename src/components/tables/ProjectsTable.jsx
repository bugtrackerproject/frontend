import * as React from 'react';

import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { DataGrid, GridToolbarQuickFilter } from '@mui/x-data-grid';
import { Box } from '@mui/system';
import { Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';


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
  { field: 'description', headerName: 'Description', minWidth: 130, flex: 1 },
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
        <Link to={`/projects/${params.value}`}>{params.value}</Link>
      )
  },
];

function createData(
  name,
  description, 
  createdAt,
  updatedAt,
  id
) {
  return { name, description, createdAt, updatedAt, id};
}

const ProjectsTable = ({ filter, value }) => {

  let projectsSelector = useSelector((state) => state.projects)
  let projects = projectsSelector.slice()
    const navigate = useNavigate();

  switch(filter) {
    case "user":

      projects = projectsSelector.filter(project => project.users.some(
        user => user === value.id
      ))
      break;

    case "recent":
      projects = projects.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
      break;
    default:
      break;    
  }

  const rows = projects.map(project => {
    return createData(project.name, project.description, project.createdAt, project.updatedAt, project.id)
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
      onRowDoubleClick={(params) => navigate(`/projects/${params.row.id}`)}
      components={{ 
        Toolbar: QuickSearchToolbar,
        NoRowsOverlay: () => (
          <Stack height="100%" alignItems="center" justifyContent="center">
            User has no projects
          </Stack>
        )
      }}
    />
  );
}

export default ProjectsTable
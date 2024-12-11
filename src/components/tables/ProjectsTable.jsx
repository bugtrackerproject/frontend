import * as React from 'react';

import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { GridToolbarQuickFilter } from '@mui/x-data-grid';
import { Box } from '@mui/system';
import { Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import ProjectCrudTable from './ProjectCrudTable'

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
  createdAt,
  updatedAt,
  id
) {
  return { name, description, createdAt, updatedAt, id};
}

const ProjectsTable = ({ filter, value }) => {

    let projectsSelector = useSelector((state) => state.projects.data)

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
      <ProjectCrudTable

          initialRows={rows}
          sx={{
              
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
          /*onRowDoubleClick={(params) => navigate(`/projects/${params.row.id}`)}*/
          components={{
              Toolbar: QuickSearchToolbar,
              NoRowsOverlay: () => (
                  <Stack height="100%" alignItems="center" justifyContent="center">
                      User has no tickets
                  </Stack>
              )
          }}
    />
  );
}

export default ProjectsTable
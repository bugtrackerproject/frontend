import * as React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
    GridRowModes,
    DataGrid,
    GridActionsCellItem,
    GridRowEditStopReasons,
} from '@mui/x-data-grid';
import { ArrowDropDown, WarningAmber, ErrorOutline } from '@mui/icons-material';
import { GridToolbarContainer, GridToolbarQuickFilter } from '@mui/x-data-grid';
import { TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions, Box, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { initializeProjects, createProject, updateProject } from '../../reducers/projectsReducer'
import { useSelector } from 'react-redux';
import SelectMultiple from '../checkbox/SelectMultiple';

const typographyStyle = {
    fontWeight: '500',
    display: 'inline'
};


function EditToolbar(props) {

    const dispatch = useDispatch();

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [newProjectData, setNewProjectData] = useState({
        name: '',
        description: '',

    });
    const projects = useSelector((state) => state.projects.data)

    const [selectedUsersToAdd, setSelectedUsersToAdd] = useState([]);

    const users = useSelector((state) => state.users.data)
    const user = useSelector(state => state.user)

    const handleOpenDialog = () => setIsDialogOpen(true);
    const handleCloseDialog = () => setIsDialogOpen(false);

    const { setRows, setRowModesModel } = props;

    const handleAddProject = async (e) => {
        e.preventDefault()


        // TO DO, NEEDS TO MATCH DATABASE
        const id = Date.now().toString(); // Unique ID
        setRows((oldRows) => [
            ...oldRows,
            {
                id,
                
                ...newProjectData
            },
        ]);

        const newProject = {
           
            Name: newProjectData.name,
            Description: newProjectData.description,
            Users: selectedUsersToAdd.map(user => user.id) 
        }

        try {
            const createdProject = await dispatch(createProject(newProject));
         console.log(createdProject.payload.createdAt)
            setRows((oldRows) =>
                oldRows.map((row) =>
                    row.id === id
                        ? {
                            id: createdProject.payload.id,
                            name: createdProject.payload.name,
                            description: createdProject.payload.description,
                            createdAt: createdProject.payload.createdAt,
                            updatedAt: createdProject.payload.updatedAt
                        }
                        : row
                )
            );
            
        } catch (error) {
            console.error("Failed to create project:", error);

            // Remove the temporary row in case of an error
            setRows((oldRows) => oldRows.filter((row) => row.id !== id));
        }

        setSelectedUsersToAdd([])

        setNewProjectData({
            name: '',
            description: ''
        });
        handleCloseDialog();
    };

    const handleChange = (field) => (e) => {
        setNewProjectData({ ...newProjectData, [field]: e.target.value });
    };

    return (
        <GridToolbarContainer>
            <Button color="primary" startIcon={<AddIcon />} onClick={handleOpenDialog}>
                Add Project
            </Button>
            <Dialog open={isDialogOpen} onClose={handleCloseDialog} fullWidth maxWidth="md">
                <DialogTitle>Create New Project</DialogTitle>
                <DialogContent>
                    <Box sx={{ margin: '10px 0' }}>
                        <TextField
                            fullWidth
                            value={newProjectData.name}
                            label="Name"
                            onChange={handleChange('name')}
                        />
                    </Box>
                    <Box sx={{ margin: '10px 0' }}>
                        <TextField
                            fullWidth
                            label="Description"
                            multiline
                            rows={3}
                            value={newProjectData.description}
                            onChange={handleChange('description')}
                        >

                        </TextField>
                    </Box>
                    <Box sx={{ margin: '10px 0' }}>
                        <SelectMultiple
                            data={users}
                            label="Users"
                            value={selectedUsersToAdd} // Bind selected users to the state
                            onChange={(event, selectedValue) => setSelectedUsersToAdd(selectedValue)}
                        >
                            <option value="" disabled>
                                Assign Users
                            </option>
                        </SelectMultiple>
                    </Box>
               
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleAddProject} color="primary" variant="contained">
                        Create Project
                    </Button>
                </DialogActions>
            </Dialog>
            <Box
                sx={{
                    textAlign: "right",
                    p: 0.5,
                    pb: 0,
                    marginLeft: 'auto'
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
        </GridToolbarContainer>
    );
}

export default function FullFeaturedCrudGrid({ sx, initialRows }) {
    const [rows, setRows] = React.useState(initialRows);
    const [rowModesModel, setRowModesModel] = React.useState({});
    const dispatch = useDispatch()
    const projects = useSelector(state => state.projects.data)
    const users = useSelector(state => state.users.data)

    const columns = [
        {
            field: 'name',
            headerName: 'Name',
            minWidth: 100,
            editable: true,
            flex: 1,
            renderCell: (params) => <Typography sx={typographyStyle}>{params.value}</Typography>,
        },
        {
            field: 'description',
            headerName: 'Description',
            editable: true,
            minWidth: 130,
            flex: 1,
            renderCell: (params) => <Typography sx={typographyStyle}>{params.value}</Typography>,
        },
    
        {
            field: 'createdAt',
            headerName: 'Date Created',
            minWidth: 150,
            flex: 1,
            renderCell: (params) => <Typography sx={typographyStyle}>{params.value}</Typography>,
        },
        {
            field: 'updatedAt',
            headerName: 'Date Updated',
            minWidth: 30,
            flex: 1,
            renderCell: (params) => <Typography sx={typographyStyle}>{params.value}</Typography>,
        },
        {
            field: 'id',
            headerName: 'ID',
            sortable: false,
            flex: 1,
            minWidth: 30
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 100,
            cellClassName: 'actions',
            getActions: ({ id }) => {
                const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

                if (isInEditMode) {
                    return [
                        <GridActionsCellItem
                            icon={<SaveIcon />}
                            label="Save"
                            sx={{
                                color: 'primary.main',
                            }}
                            onClick={handleSaveClick(id)}
                        />,
                        <GridActionsCellItem
                            icon={<CancelIcon />}
                            label="Cancel"
                            className="textPrimary"
                            onClick={handleCancelClick(id)}
                            color="inherit"
                        />,
                    ];
                }

                return [
                    <GridActionsCellItem
                        icon={<EditIcon />}
                        label="Edit"
                        className="textPrimary"
                        onClick={handleEditClick(id)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={handleDeleteClick(id)}
                        color="inherit"
                    />,
                ];
            }
        }
    ];

    const handleRowEditStop = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    const handleEditClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };

    const handleSaveClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    };

    const handleDeleteClick = (id) => () => {
        setRows(rows.filter((row) => row.id !== id));
    };

    const handleCancelClick = (id) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });

        const editedRow = rows.find((row) => row.id === id);
        if (editedRow.isNew) {
            setRows(rows.filter((row) => row.id !== id));
        }
    };

    const processRowUpdate = (newRow) => {
        const updatedRow = { ...newRow, isNew: false };
        setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));

        const newProject = {
            name: updatedRow.name,
            description: updatedRow.description
        }

  /*      const project = projects.find(project => project.name === updatedRow.project);
        const assignee = users.find(user => user.name === updatedRow.assignee)
        
        const newProject = {
            project: updatedRow.id,
            name: updatedRow.name,
            description: updatedRow.description
        }

        console.log(newProject)*/
        dispatch(updateProject(newRow.id, newProject));

        return updatedRow;
    };

    const handleRowModesModelChange = (newRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };

    const handleProcessRowUpdateError = (error) => {
        console.error('Row update error:', error.message);
    }
    return (

        <DataGrid
            rows={rows}
            columns={columns}
            sx={sx}

            editMode="row"
            rowModesModel={rowModesModel}
            onRowModesModelChange={handleRowModesModelChange}
            onRowEditStop={handleRowEditStop}
            processRowUpdate={processRowUpdate}
            onProcessRowUpdateError={handleProcessRowUpdateError}
            slots={{ toolbar: EditToolbar }}
            slotProps={{
                toolbar: { setRows, setRowModesModel },
            }}
        />
    );
}
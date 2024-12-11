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
import { createTicket, updateTicket } from '../../reducers/ticketsReducer'
import { useSelector } from 'react-redux';

const typographyStyle = {
    fontWeight: '500',
    display: 'inline'
};

const priorities = ['Low', 'Medium', 'High', 'Critical'];
const types = ['Bug', 'Feature Request', 'Improvement']
const statuses = ['To Do', 'In Progress', 'Completed', 'Closed']

function EditToolbar(props) {

    const dispatch = useDispatch();

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [newTicketData, setNewTicketData] = useState({
        project: '',
        name: '',
        description: '',
        assignee: '',
        type: '',
        priority: '',

    });

    const users = useSelector((state) => state.users.data)
    const user = useSelector(state => state.user)
    const projects = useSelector(state => state.projects.data)

    const filteredProjects = projects.filter(project =>
        Array.isArray(project.users) && project.users.includes(user.id)
    );

    const handleOpenDialog = () => setIsDialogOpen(true);
    const handleCloseDialog = () => setIsDialogOpen(false);

    const { setRows, setRowModesModel } = props;

    const handleAddTicket = () => {

        // TO DO, NEEDS TO MATCH DATABASE
        const id = Date.now().toString(); // Unique ID
        setRows((oldRows) => [
            ...oldRows,
            {
                id,
                ...newTicketData
            },
        ]);
        console.log(newTicketData.project)
        
        const newTicket = {
            ProjectId: newTicketData.project,
            Name: newTicketData.name,
            Description: newTicketData.description,
            AssigneeId: newTicketData.assignee,
            Type: newTicketData.type,
            Status: newTicketData.status,
            Priority: newTicketData.priority
        }

       
        console.log(newTicket)
        dispatch(createTicket(newTicket));


        setNewTicketData({
            project: '',
            name: '',
            description: '',
            assignee: '',
            type: '',
            priority: 'Low',
        });
        handleCloseDialog();
    };

    const handleChange = (field) => (e) => {
        setNewTicketData({ ...newTicketData, [field]: e.target.value });
    };

    return (
    

            <GridToolbarContainer>


            <Button color="primary" size="large" style={{ fontSize: '1rem', paddingLeft: '1.5rem'}} startIcon={<AddIcon />} onClick={handleOpenDialog}>
                Create a Ticket
            </Button>
            <Dialog open={isDialogOpen} onClose={handleCloseDialog} fullWidth maxWidth="md">
                <DialogTitle>Create New Ticket</DialogTitle>
                <DialogContent>
                    <Box sx={{ margin: '10px 0' }}>
                        <TextField
                            fullWidth
                            value={newTicketData.project}
                            onChange={handleChange('project')}
                            select
                            SelectProps={{
                                native: true,
                            }}
                        >
                            <option value="" disabled>
                                Select a project
                            </option>
                            {filteredProjects.map((project) => (
                                <option key={project.id} value={project.id}>
                                    {project.name}
                                </option>
                            ))}
                        </TextField>
                    </Box>
                    <Box sx={{ margin: '10px 0' }}>
                        <TextField
                            fullWidth
                            value={newTicketData.name}
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
                            value={newTicketData.description}
                            onChange={handleChange('description')}
                         >   
                        
                        </TextField>
                    </Box>
                    <Box sx={{ margin: '10px 0' }}>
                        <TextField
                            fullWidth
                            value={newTicketData.assignee}
                            onChange={handleChange('assignee')}
                            select
                            SelectProps={{
                                native: true,
                            }}
                        >
                            <option value="" disabled>
                                Select a user
                            </option>
                            {users.map((user) => (
                                <option key={user.id} value={user.id}>
                                    {user.name}
                                </option>
                            ))}
                        </TextField>
                    </Box>
                    <Box sx={{ margin: '10px 0' }}>
                        <TextField
                            fullWidth
                            value={newTicketData.type}
                            onChange={handleChange('type')}
                            select
                            SelectProps={{
                                native: true,
                            }}
                        >
                            <option value="" disabled>
                                Select a type
                            </option>
                            {types.map((type) => (
                                <option key={type} value={type}>
                                    {type}
                                </option>
                            ))}
                        </TextField>
                    </Box>
                    <Box sx={{ margin: '10px 0' }}>
                        <TextField
                            fullWidth
                            value={newTicketData.priority}
                            onChange={handleChange('priority')}
                            select
                            SelectProps={{
                                native: true,
                            }}
                        >
                            <option value="" disabled>
                                Select priority
                            </option>
                            {priorities.map((priority) => (
                                <option key={priority} value={priority}>
                                    {priority}
                                </option>
                            ))}
                        </TextField>
                    </Box>
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
                    style={{
                        width: '400px'
                    }}
                    InputProps={{
                        style: {
                            fontSize: '1.2rem',
                            padding: '10px',
                            height: '50px',
                        },
                    }}
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
            flex: 1,
            renderCell: (params) => <Typography sx={typographyStyle}>{params.value}</Typography>,
        },
        {
            field: 'description',
            headerName: 'Description',
            minWidth: 130,
            flex: 1,
            renderCell: (params) => <Typography sx={typographyStyle}>{params.value}</Typography>,
        },
        {
            field: 'project',
            headerName: 'Project',
            minWidth: 60,
            flex: 1,
            renderCell: (params) => <Typography sx={typographyStyle}>{params.value}</Typography>,
        },
        {
            field: 'assignee',
            headerName: 'Assignee',
            minWidth: 60,
            flex: 1,
            renderCell: (params) => <Typography sx={typographyStyle}>{params.value}</Typography>,
        },
        {
            field: 'type',
            headerName: 'Type',
            minWidth: 60,
            flex: 1,
            renderCell: (params) => <Typography sx={typographyStyle}>{params.value}</Typography>,
        },
        {
            field: 'status',
            headerName: 'Status',
            type: 'singleSelect',
            editable: true,
            valueOptions: statuses,
            minWidth: 130,
            flex: 1,
            renderCell: (params) => {
                let circleColor = '#ccc'; // Default color if no status matches
                switch (params.value) {
                    case 'To Do':
                        circleColor = '#FF4D4F ';
                        break;
                    case 'In Progress':
                        circleColor = '#2873FF ';
                        break;
                    case 'Completed':
                        circleColor = '#28A745 ';
                        break;
                    case 'Closed':
                        circleColor = '#6C757D ';
                        break;
                    default:
                        break;
                }

                return (
                    <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                        <div
                            style={{
                                width: '20px',
                                height: '20px',
                                borderRadius: '50%',
                                backgroundColor: circleColor,
                                marginRight: '8px',
                            }}
                        />
                        <Typography sx={typographyStyle}>{params.value}</Typography>

                        <ArrowDropDown sx={{ marginLeft: 'auto' }} />
                    </Box>
                );
            },
            sortComparator: (v1, v2) => {
                const statusOrder = {
                    'To Do': 1,
                    'In Progress': 2,
                    'Completed': 3,
                    'Closed': 4,
                };


                // Compare the numeric priority values instead of the string values
                return statusOrder[v1] - statusOrder[v2];
            },
        },
        {
            field: 'priority',
            headerName: 'Priority',
            minWidth: 110,
            type: 'singleSelect',
            editable: true,
            valueOptions: priorities,
            flex: 1,
            renderCell: (params) => {

                let priorityIcon = null;
                let iconStyle = {};

                // Determine the icon and style based on the priority
                switch (params.value) {
                    case 'Low':
                        priorityIcon = <ErrorOutline style={{ color: '#28a745 ', fontSize: '24px' }} />;
                        break;
                    case 'Medium':
                        priorityIcon = <ErrorOutline style={{ color: '#f0ad4e', fontSize: '24px' }} />;
                        break;
                    case 'High':
                        priorityIcon = <ErrorOutline style={{ color: '#dc3545', fontSize: '24px' }} />;
                        break;
                    case 'Critical':
                        priorityIcon = <WarningAmber style={{ color: '#ff0000', fontSize: '24px' }} />;
                        break;
                    default:
                        break;
                }

                return (
                    <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                        <Box sx={{ display: 'inline-flex', alignItems: 'center', mr: 1 }}>
                            {priorityIcon}
                        </Box>
                        <Typography sx={typographyStyle}>{params.value}</Typography>

                        <ArrowDropDown sx={{ marginLeft: 'auto' }} />
                    </Box>
                );
            },
            sortComparator: (v1, v2) => {
                const priorityOrder = {
                    Low: 1,
                    Medium: 2,
                    High: 3,
                    Critical: 4,
                };

                // Compare the numeric priority values instead of the string values
                return priorityOrder[v2] - priorityOrder[v1];
            },
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
            minWidth: 30,
            /*        renderCell: (params) => (
                        <Link sx={typographyStyle} to={`/tickets/${params.value}`}>
                            {params.value}
                        </Link>
                    ),*/
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

        const project = projects.find(project => project.name === updatedRow.project);
        const assignee = users.find(user => user.name === updatedRow.assignee)
        const newTicket = {
            ProjectId: project.id,
            Name: updatedRow.name,
            Description: updatedRow.description,
            Type: updatedRow.type,
            Priority: updatedRow.priority,
            Status: updatedRow.status,
            AssigneeId: assignee.id 
        }
        dispatch(updateTicket(newRow.id, newTicket));

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
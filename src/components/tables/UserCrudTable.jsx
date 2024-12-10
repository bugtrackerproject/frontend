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
import { GridToolbarContainer, GridToolbarQuickFilter } from '@mui/x-data-grid';
import { Box, Typography } from '@mui/material';

import { useDispatch } from 'react-redux'

import { useSelector } from 'react-redux';
import { updateUser } from '../../reducers/usersReducer';
import { ArrowDropDown} from '@mui/icons-material';

const typographyStyle = {
    fontWeight: '500',
    display: 'inline'
};

const roles = ['Admin', 'Submitter', 'Developer', 'User']


function EditToolbar(props) {

    return (
        <GridToolbarContainer>
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

        </GridToolbarContainer>
    );
}

export default function FullFeaturedCrudGrid({ sx, initialRows }) {
    const [rows, setRows] = React.useState(initialRows);
    const [rowModesModel, setRowModesModel] = React.useState({});
    const dispatch = useDispatch()

    const columns = [
        {
            field: 'name',
            headerName: 'Name',
            minWidth: 100,
            flex: 1,
            renderCell: (params) => <Typography sx={typographyStyle}>{params.value}</Typography>,
        },
        {
            field: 'email',
            headerName: 'Email',
            minWidth: 130,
            flex: 1,
            renderCell: (params) => <Typography sx={typographyStyle}>{params.value}</Typography>,
        },
        {
            field: 'role',
            headerName: 'Role',
            sortable: false,
            type: 'singleSelect',
            valueOptions: roles,
            editable: true,
            flex: 1,
            minWidth: 30,
            renderCell: (params) => {

                return (
                    <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                       
                        <Typography sx={typographyStyle}>{params.value}</Typography>

                        <ArrowDropDown sx={{ marginLeft: 'auto' }} />
                    </Box>
                );
            }

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


        
        const updatedUser = {
            name: updatedRow.name,
            email: updatedRow.email,
            role: updatedRow.role
        }

        dispatch(updateUser(newRow.id, updatedUser));
        console.log(updatedRow)
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
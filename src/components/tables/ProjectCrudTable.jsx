import * as React from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import { Launch } from "@mui/icons-material";
import {
	GridRowModes,
	DataGrid,
	GridActionsCellItem,
	GridRowEditStopReasons,
} from "@mui/x-data-grid";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import { GridToolbarContainer, GridToolbarQuickFilter } from "@mui/x-data-grid";
import {
	TextField,
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
	Box,
	Typography,
	Snackbar,
	Alert,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createProject, updateProject } from "../../reducers/projectsReducer";
import { useSelector } from "react-redux";
import SelectMultiple from "../checkbox/SelectMultiple";
import Select from "../checkbox/Select";

import { useNavigate } from "react-router-dom";

const typographyStyle = {
	fontWeight: "500",
	display: "inline",
};

function EditToolbar(props) {
	const dispatch = useDispatch();

	const [isProjectDialogOpen, setIsProjectDialogOpen] = useState(false);
	const [isUsersDialogOpen, setIsUsersDialogOpen] = useState(false);
	const [newProjectData, setNewProjectData] = useState({
		name: "",
		description: "",
	});

	const [newProjectUsersData, setNewProjectUsersData] = useState({
		name: "",
		description: "",
	});
	const projects = useSelector((state) => state.projects.data);
	const [project, setProject] = useState(null);

	const [selectedUsersToAdd, setSelectedUsersToAdd] = useState([]);
	const [selectedUsersToRemove, setSelectedUsersToRemove] = useState([]);
	const users = useSelector((state) => state.users.data);
	const user = useSelector((state) => state.user);

	const handleOpenProjectDialog = () => setIsProjectDialogOpen(true);
	const handleCloseProjectDialog = () => setIsProjectDialogOpen(false);

	const handleOpenUsersDialog = () => setIsUsersDialogOpen(true);
	const handleCloseUsersDialog = () => setIsUsersDialogOpen(false);

	const { setRows, setRowModesModel } = props;

	const handleAddProject = async (e) => {
		e.preventDefault();

		const id = Date.now().toString(); // temporary id
		setRows((oldRows) => [
			...oldRows,
			{
				id,

				...newProjectData,
			},
		]);

		const newProject = {
			Name: newProjectData.name,
			Description: newProjectData.description,
			Users: selectedUsersToAdd.map((user) => user.id),
		};

		try {
			const createdProject = await dispatch(createProject(newProject));
			console.log(createdProject.payload.createdAt);
			setRows((oldRows) =>
				oldRows.map((row) =>
					row.id === id
						? {
								id: createdProject.payload.id,
								name: createdProject.payload.name,
								description: createdProject.payload.description,
								createdAt: createdProject.payload.createdAt,
								updatedAt: createdProject.payload.updatedAt,
						  }
						: row
				)
			);
		} catch (error) {
			console.error("Failed to create project:", error);

			// Remove the temporary row in case of an error
			setRows((oldRows) => oldRows.filter((row) => row.id !== id));
		}

		setSelectedUsersToAdd([]);

		setNewProjectData({
			name: "",
			description: "",
		});
		handleCloseProjectDialog();
	};

	const handleSelectProject = (field) => (e) => {
		setNewProjectData({ ...newProjectData, [field]: e.target.value });
	};

	const handleProjectChange = (field) => (e) => {
		setNewProjectData({ ...newProjectData, [field]: e.target.value });
	};

	const handleAddUsers = (field) => (e) => {
		//
	};

	return (
		<>
			<GridToolbarContainer>
				{user.role === "Admin" && (
					<>
						<Button
							color="primary"
							size="large"
							style={{ fontSize: "1rem", paddingLeft: "1.5rem" }}
							startIcon={<AddIcon />}
							onClick={handleOpenProjectDialog}
						>
							Create a Project
						</Button>
						<Dialog
							className="dialog-form"
							open={isProjectDialogOpen}
							onClose={handleCloseProjectDialog}
							fullWidth
							maxWidth="md"
						>
							<DialogTitle>Create New Project</DialogTitle>
							<DialogContent>
								<Box
									sx={{
										margin: "10px 0",
										paddingBottom: "10px",
									}}
								>
									<TextField
										fullWidth
										value={newProjectData.name}
										label="Name"
										onChange={handleProjectChange("name")}
									/>
								</Box>
								<Box
									sx={{
										margin: "10px 0",
										paddingBottom: "10px",
									}}
								>
									<TextField
										fullWidth
										label="Description"
										multiline
										rows={3}
										value={newProjectData.description}
										onChange={handleProjectChange(
											"description"
										)}
									></TextField>
								</Box>
								<Box>
									<SelectMultiple
										data={users}
										label="Users"
										value={selectedUsersToAdd} // Bind selected users to the state
										onChange={(event, selectedValue) =>
											setSelectedUsersToAdd(selectedValue)
										}
									>
										<option value="" disabled>
											Assign Users
										</option>
									</SelectMultiple>
								</Box>
							</DialogContent>
							<DialogActions>
								<Button
									sx={{ margin: "0rem 1rem 1rem 0" }}
									onClick={handleCloseProjectDialog}
									color="secondary"
								>
									Cancel
								</Button>
								<Button
									sx={{ margin: "0rem 1rem 1rem 0" }}
									onClick={handleAddProject}
									color="primary"
									variant="contained"
								>
									Create Project
								</Button>
							</DialogActions>
						</Dialog>
						<Button
							color="primary"
							size="large"
							style={{ fontSize: "1rem", paddingLeft: "1.5rem" }}
							startIcon={<GroupAddIcon />}
							onClick={handleOpenUsersDialog}
						>
							Assign Users
						</Button>
						<Dialog
							className="dialog-form"
							open={isUsersDialogOpen}
							onClose={handleCloseUsersDialog}
							fullWidth
							maxWidth="md"
						>
							<DialogTitle>Assign/Remove Users</DialogTitle>
							<DialogContent className="dialog-content">
								<Box
									sx={{
										margin: "10px 0",
										paddingBottom: "10px",
									}}
								>
									<Select
										data={projects}
										label="Project Name"
										onChange={(event, selectedValue) =>
											setProject(selectedValue)
										}
									/>
								</Box>
								<Box
									sx={{
										margin: "10px 0",
										paddingBottom: "10px",
									}}
								>
									<SelectMultiple
										data={
											project
												? users.filter(
														(user) =>
															!project.users.includes(
																user.id
															)
												  )
												: []
										}
										label="Add Users"
										value={selectedUsersToAdd}
										onChange={(event, selectedValue) =>
											setSelectedUsersToAdd(selectedValue)
										}
									>
										<option value="" disabled>
											Add Users
										</option>
									</SelectMultiple>
								</Box>
								<Box>
									<SelectMultiple
										data={
											project
												? project.users.map((userId) =>
														users.find(
															(user) =>
																user.id ===
																userId
														)
												  )
												: []
										}
										label="Remove Users"
										value={selectedUsersToRemove}
										onChange={(event, selectedValue) =>
											setSelectedUsersToAdd(selectedValue)
										}
									>
										<option value="" disabled>
											Remove Users
										</option>
									</SelectMultiple>
								</Box>
							</DialogContent>
							<DialogActions>
								<Button
									sx={{ margin: "0rem 1rem 1rem 0" }}
									onClick={handleCloseUsersDialog}
									color="secondary"
								>
									Cancel
								</Button>
								<Button
									sx={{ margin: "0rem 1rem 1rem 0" }}
									onClick={handleAddUsers}
									color="primary"
									variant="contained"
								>
									Assign Users
								</Button>
							</DialogActions>
						</Dialog>
					</>
				)}
				<Box
					sx={{
						textAlign: "right",
						p: 0.5,
						pb: 0,
						marginLeft: "auto",
					}}
				>
					<GridToolbarQuickFilter
						quickFilterParser={(searchInput) =>
							searchInput
								.split(",")
								.map((value) => value.trim())
								.filter((value) => value !== "")
						}
						style={{
							width: "400px",
						}}
						InputProps={{
							style: {
								fontSize: "1.2rem",
								padding: "10px",
								height: "50px",
							},
						}}
					/>
				</Box>
			</GridToolbarContainer>
		</>
	);
}

export default function FullFeaturedCrudGrid({ sx, initialRows, onDelete }) {
	const [rows, setRows] = React.useState(initialRows);
	const [rowModesModel, setRowModesModel] = React.useState({});
	const dispatch = useDispatch();
	const projects = useSelector((state) => state.projects.data);
	const users = useSelector((state) => state.users.data);
	const [deleteId, setDeleteId] = useState(null);
	const [open, setOpen] = useState(false);
	const navigate = useNavigate();

	const columns = [
		{
			field: "name",
			headerName: "Name",
			minWidth: 200,
			editable: true,
			flex: 1,
			renderCell: (params) => (
				<Typography sx={typographyStyle}>{params.value}</Typography>
			),
		},
		{
			field: "description",
			headerName: "Description",
			editable: true,
			minWidth: 400,
			flex: 1,
			renderCell: (params) => (
				<Typography sx={typographyStyle}>{params.value}</Typography>
			),
		},

		{
			field: "createdAt",
			headerName: "Date Created",
			minWidth: 50,
			flex: 1,
			renderCell: (params) => (
				<Typography sx={typographyStyle}>{params.value}</Typography>
			),
		},
		{
			field: "updatedAt",
			headerName: "Date Updated",
			flex: 1,
			renderCell: (params) => (
				<Typography sx={typographyStyle}>{params.value}</Typography>
			),
		},
		/*         {
            field: 'id',
            headerName: 'ID',
            sortable: false,
            flex: 1,
            minWidth: 30
        }, */
		{
			field: "actions",
			type: "actions",
			headerName: "Actions",
			width: 160,
			cellClassName: "actions",
			getActions: ({ id }) => {
				const isInEditMode =
					rowModesModel[id]?.mode === GridRowModes.Edit;

				if (isInEditMode) {
					return [
						<GridActionsCellItem
							icon={<Launch />}
							label="View"
							sx={{
								color: "primary.main",
							}}
							onClick={() => handleViewClick(id)}
						/>,
						<GridActionsCellItem
							icon={<SaveIcon />}
							label="Save"
							sx={{
								color: "primary.main",
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
						icon={<Launch />}
						label="View"
						sx={{
							color: "primary.main",
						}}
						onClick={() => handleViewClick(id)}
					/>,
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
						onClick={() => handleDeleteClick(id)}
						color="inherit"
					/>,
				];
			},
		},
	];

	const handleRowEditStop = (params, event) => {
		if (params.reason === GridRowEditStopReasons.rowFocusOut) {
			event.defaultMuiPrevented = true;
		}
	};

	const handleEditClick = (id) => () => {
		setRowModesModel({
			...rowModesModel,
			[id]: { mode: GridRowModes.Edit },
		});
	};

	const handleSaveClick = (id) => () => {
		setRowModesModel({
			...rowModesModel,
			[id]: { mode: GridRowModes.View },
		});
	};

	const handleDeleteClick = (id) => {
		setDeleteId(id);
		setOpen(true);
	};

	const handleDeleteConfirm = () => {
		if (onDelete) {
			onDelete(deleteId);
			setRows((prevRows) =>
				prevRows.filter((row) => row.id !== deleteId)
			);
			setOpen(false);
		}
	};

	const handleClose = () => {
		setOpen(false);
		setDeleteId(null);
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

	const [snackbar, setSnackbar] = React.useState(null);

	const handleCloseSnackbar = () => setSnackbar(null);

	const processRowUpdate = React.useCallback(
		async (newRow, oldRow) => {
			try {
				if (!newRow.id) {
					throw new Error("Row must have a valid ID");
				}

				const updatedRow = {
					...oldRow,
					...newRow,
					description: newRow.description || oldRow.description,
					name: newRow.name || oldRow.name,
				};

				const newProject = {
					Id: updatedRow.id,
					Name: updatedRow.name,
					Description: updatedRow.description,
					users: [],
					createdAt: updatedRow.createdAt,
					updatedAt: new Date().toISOString(),
				};

				console.log(newProject);

				await dispatch(
					updateProject({
						id: updatedRow.id,
						project: newProject,
					})
				).unwrap();

				setRows((prevRows) =>
					prevRows.map((row) =>
						row.id === updatedRow.id
							? { ...row, ...updatedRow }
							: row
					)
				);

				setSnackbar({
					children: "Project successfully updated!",
					severity: "success",
				});

				return updatedRow;
			} catch (error) {
				console.error("Detailed Update Error:", error);

				setSnackbar({
					children: `Update failed: ${error.message}`,
					severity: "error",
				});

				return oldRow;
			}
		},
		[dispatch]
	);

	const handleRowModesModelChange = (newRowModesModel) => {
		setRowModesModel(newRowModesModel);
	};

	const handleProcessRowUpdateError = (error) => {
		console.error("Row update error:", error.message);
	};

	const handleViewClick = (id) => {
		const url = `/projects/${id}`;
		navigate(url);
	};
	return (
		<>
			<DataGrid
				rows={rows}
				columns={columns}
				sx={sx}
				disableColumnResize="true"
				rowHeight={80}
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

			{!!snackbar && (
				<Snackbar
					open
					anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
					onClose={handleCloseSnackbar}
					autoHideDuration={6000}
				>
					<Alert {...snackbar} onClose={handleCloseSnackbar} />
				</Snackbar>
			)}

			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">
					{"Confirm Delete"}
				</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						Are you sure you want to delete this project?
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="primary">
						Cancel
					</Button>
					<Button
						onClick={() => handleDeleteConfirm(deleteId)}
						color="primary"
						autoFocus
					>
						Confirm
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}

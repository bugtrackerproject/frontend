import {
	createSlice,
	createAsyncThunk,
	createSelector,
} from "@reduxjs/toolkit";
import { projectService } from "../services/apiServiceFactory";
import projectUserService from "../services/projectUsers";

const initialState = {
	data: [],
	loading: false,
	error: null,
};

const projectsSlice = createSlice({
	name: "projects",
	initialState,
	reducers: {
		update(state, action) {
			state = state.data.map((project) =>
				project.id !== action.payload.id ? project : action.payload
			);
		},
		appendProject(state, action) {
			state.push(action.payload);
		},
		setProjects(state, action) {
			return action.payload;
		},
		addUser(state, action) {
			const project = state.data.find(
				(p) => p.id === action.payload.projectId
			);
			if (
				project &&
				!project.users.some((user) => user.id === action.payload.userId)
			) {
				project.users.push({ id: action.payload.userId });
			}
		},
		removeUser(state, action) {
			const project = state.data.find(
				(p) => p.id === action.payload.projectId
			);
			if (project) {
				project.users = project.users.filter(
					(user) => user.id !== action.payload.userId
				);
			}
		},
		remove: (state, action) => {
			state.data = state.data.filter(
				(ticket) => ticket.id !== action.payload
			);
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(createProject.pending, (state) => {
				state.loading = true;
			})
			.addCase(createProject.fulfilled, (state, action) => {
				state.loading = false;
				state.data.push(action.payload);
			})
			.addCase(createProject.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(initialiseProjects.pending, (state) => {
				state.loading = true;
			})
			.addCase(initialiseProjects.fulfilled, (state, action) => {
				state.data = action.payload;
				state.loading = false;
			})
			.addCase(initialiseProjects.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(updateProject.pending, (state) => {
				state.loading = true;
			})
			.addCase(updateProject.fulfilled, (state, action) => {
				const updatedProject = action.payload;
				state.data = state.data.map((project) =>
					project.id === updatedProject.id ? updatedProject : project
				);
				state.loading = false;
			})
			.addCase(updateProject.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			});
	},
});

export const initialiseProjects = createAsyncThunk(
	"projects/initialiseProjects",
	async (_, { rejectWithValue }) => {
		try {
			const projects = await projectService.getAll();
			return projects;
		} catch (error) {
			return rejectWithValue(error.response?.data || error.message);
		}
	}
);

export const createProject = createAsyncThunk(
	"projects/createProject",
	async (newProjectData, { rejectWithValue }) => {
		try {
			const data = await projectService.create(newProjectData);
			return data;
		} catch (error) {
			return rejectWithValue(error.response?.data || error.message);
		}
	}
);

export const updateProject = createAsyncThunk(
	"projects/updateProject",
	async ({ id, project }, { rejectWithValue }) => {
		try {
			console.log("Updating project with ID:", id);
			console.log("Project data:", JSON.stringify(project, null, 2)); // Pretty-print the project object

			const updatedProject = await projectService.update(id, project);

			console.log(
				"Updated project response:",
				JSON.stringify(updatedProject, null, 2)
			); // Pretty-print the response

			return { id, updatedProject };
		} catch (error) {
			console.error(
				"Error updating project:",
				error.response?.data || error.message
			);
			return rejectWithValue(error.response?.data || error.message);
		}
	}
);

export const removeProject = (id) => {
	return async (dispatch) => {
		await projectService.remove(id);
		dispatch(remove(id));
	};
};

export const addUserToProject = (projectId, userId) => async (dispatch) => {
	const addedUser = await projectUserService.create(projectId, userId);
	dispatch(addUser(addedUser));
};

export const removeUserFromProject =
	(projectId, userId) => async (dispatch) => {
		const removedUser = await projectUserService.remove(projectId, userId);
		dispatch(removeUser(removedUser));
	};

export const {
	update,
	appendProject,
	setProjects,
	addUser,
	removeUser,
	remove,
} = projectsSlice.actions;
export default projectsSlice.reducer;

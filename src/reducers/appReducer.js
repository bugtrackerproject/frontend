import { createSlice, createSelector } from "@reduxjs/toolkit";

const selectAllProjects = (state) => state.projects.data;
const selectAllTickets = (state) => state.tickets.data;
const selectUser = (state) => state.user;
const selectUsers = (state) => state.users.data;
const selectUserId = (state) => state.user?.id;

// Select all the user's projects
export const selectUserProjects = createSelector(
	[selectAllProjects, selectUserId],
	(projects, userId) => {
		return projects.filter((project) =>
			project.users.some((id) => id === userId)
		);
	}
);

export const selectUserProjectsByUserId = (userId) =>
	createSelector([selectAllProjects], (projects) => {
		return projects.filter((project) =>
			project.users.some((id) => id === userId)
		);
	});

// Select all the logged in user's tickets
export const selectUserTickets = createSelector(
	[selectAllTickets, selectUserId],
	(tickets, userId) => tickets.filter((ticket) => ticket.assignee === userId)
);

export const selectUserTicketsByUserId = (userId) =>
	createSelector([selectAllTickets], (tickets) =>
		tickets.filter((ticket) => ticket.assignee === userId)
	);

export const selectUserTicketsByStatus = (status) =>
	createSelector([selectUserTickets], (tickets) => {
		return tickets.filter((ticket) => ticket.status === status);
	});

export const selectProjectIdByProjectName = (name) =>
	createSelector([selectAllProjects], (projects) => {
		return projects.filter((project) => project.name === name);
	});

// Select all tickets for each project the user is a member of
export const selectTicketsForUserProjects = createSelector(
	[selectAllTickets, selectUserProjects],
	(tickets, userProjects) =>
		tickets.filter((ticket) =>
			userProjects.some((project) => project.id === ticket.project)
		)
);

export const selectUserIdByUserName = (name) =>
	createSelector([selectUsers], (users) => {
		return users.find((user) => user.name === name);
	});

export const selectUserById = (id) =>
	createSelector([selectUsers], (users) => {
		return users.find((user) => user.id === id);
	});

const appSlice = createSlice({
	name: "app",
	initialState: {
		loading: true,
		sidebar: false,
	},
	reducers: {
		setLoading(state, action) {
			state.loading = action.payload;
		},
		toggleSidebar(state) {
			state.sidebar = !state.sidebar;
		},
		setSidebar(state, action) {
			state.sidebar = action.payload;
		},
	},
});

export const { setLoading, toggleSidebar, setSidebar } = appSlice.actions;
export default appSlice.reducer;

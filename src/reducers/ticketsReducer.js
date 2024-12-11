import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit'
import { ticketService } from '../services/apiServiceFactory'


const initialState = {
    data: [],
    loading: false,
    error: null
};

const selectAllProjects = (state) => state.projects.data;
const selectAllTickets = (state) => state.tickets.data;
const selectUser = (state) => state.user;
const selectUserId = (state) => state.user?.id; 

// Select all the user's projects
export const selectUserProjects = createSelector(
    [selectAllProjects, selectUserId],
    (projects, userId) => {
        return projects.filter((project) =>
            project.users.some((id) => id === userId)
        )
    }
);

// Select all the user's tickets
export const selectUserTickets = createSelector(
    [selectAllTickets, selectUserId],
    (tickets, userId) =>
        tickets.filter((ticket) =>
            ticket.assignee === userId
        )
);

export const selectUserTicketsByStatus = (status) => createSelector(
    [selectUserTickets],
    (tickets) => {

        return tickets.filter((ticket) =>
            ticket.status === status
        )
    }
        
);


// Select all tickets for each project the user is a member of
export const selectTicketsForUserProjects = createSelector(
    [selectAllTickets, selectUserProjects],
    (tickets, userProjects) => tickets.filter((ticket) =>
        userProjects.some((project) => project.id === ticket.project)
    )
);



const ticketsSlice = createSlice({
    name: 'tickets',
    initialState,
    reducers: {
        appendTicket(state, action) {
            state.data.push(action.payload)
        },
        setTickets(state, action) {
            return action.payload
        },
        update(state, action) {
            return state.data.map(ticket =>
                ticket.id !== action.payload.id ? ticket : action.payload
            );
        },
        updateField(state, action) {
            return state.data.map(ticket =>
                ticket.id !== action.payload.id ? ticket : { ...ticket, [action.payload.field]: action.payload.value }
            )
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(initialiseTickets.pending, (state) => {
                state.loading = true;
            })
            .addCase(initialiseTickets.fulfilled, (state, action) => {
                state.data = action.payload;
                state.loading = false;
            })
            .addCase(initialiseTickets.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
})

export const initialiseTickets = createAsyncThunk(
    'tickets/initialiseTickets',
    async (_, { rejectWithValue }) => {
        try {
            const tickets = await ticketService.getAll()
            return tickets;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message)
        }
    })

export const createTicket = (ticket) => {
    return async (dispatch) => {
        const newTicket = await ticketService.create(ticket)
        dispatch(appendTicket(newTicket))
    }
}


export const updateTicket = (id, ticket) => {
    return async (dispatch) => {
        const updatedTicket = await ticketService.update(id, ticket)
        dispatch(update(updatedTicket))
    }
}

export const updateTicketField = (id, field, value) => {
    return async (dispatch) => {
        const updatedTicket = await ticketService.update(id, { [field]: value })
        dispatch(updateTicketField({ id, field, value: updatedTicket[field] }))
    }
}

export const { updateField, appendTicket, setTickets, update } = ticketsSlice.actions
export default ticketsSlice.reducer
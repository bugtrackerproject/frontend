import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit'
import { userService } from '../services/apiServiceFactory'

const initialState = {
    data: [],
    loading: false,
    error: null,
};


const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        update(state, action) {
            return state.map(user =>
                user.id !== action.payload.id ? user : action.payload
            )
        },
        appendUser(state, action) {
            state.push(action.payload)
        },
        setUsers(state, action) {
            return action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(initialiseUsers.pending, (state) => {
                state.loading = true;
            })
            .addCase(initialiseUsers.fulfilled, (state, action) => {
                state.data = action.payload;
                state.loading = false;
            })
            .addCase(initialiseUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
})

export const initialiseUsers = createAsyncThunk(
    'users/initialiseUsers',
    async (_, { rejectWithValue }) => {
        try {
            const users = await userService.getAll()
            return users;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message)
        }
    })

export const updateUser = (id, user) => {
    return async (dispatch) => {
        const updated = await userService.update(id, user)
        dispatch(update(updated))
    }
}




export const { update, appendUser, setUsers } = usersSlice.actions
export default usersSlice.reducer
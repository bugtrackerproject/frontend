import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { roleService } from '../services/apiServiceFactory'

const initialState = {
    data: [],
    loading: false,
    error: null,
};


const rolesSlice = createSlice({
    name: 'roles',
    initialState,
    reducers: {
        appendRole(state, action) {
            state.push(action.payload)
        },
        setRoles(state, action) {
            return action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(initialiseRoles.pending, (state) => {
                state.loading = true;
            })
            .addCase(initialiseRoles.fulfilled, (state, action) => {
                state.data = action.payload;
                state.loading = false;
            })
            .addCase(initialiseRoles.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
})

export const initialiseRoles = createAsyncThunk(
    'roles/initialiseRoles',
    async (_, { rejectWithValue }) => {
        try {
            const roles = await roleService.getAll()
            return roles;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message)
        }
    })

export const createRole = (roleObject) => {
    return async (dispatch) => {
        const newRole = await roleService.create(roleObject)
        dispatch(appendRole(newRole))
    }
}


export const { appendRole, setRoles } = rolesSlice.actions
export default rolesSlice.reducer
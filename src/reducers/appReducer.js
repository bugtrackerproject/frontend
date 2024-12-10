import { createSlice } from '@reduxjs/toolkit'

const appSlice = createSlice({
    name: 'app',
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
        }

    },
});

export const { setLoading, toggleSidebar, setSidebar } = appSlice.actions;
export default appSlice.reducer;
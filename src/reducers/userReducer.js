import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action) {
            return action.payload
        },
        logout(state) {
            state.user = null;
        }
    }
})

/*

export const setUser = (user) => {
    return async dispatch => {
      dispatch(setUser({
        user
      }))
    }
  }
  */

export const { setUser, logout } = userSlice.actions
export default userSlice.reducer
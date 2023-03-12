import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {  
        return action.payload
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

export const { setUser } = userSlice.actions
export default userSlice.reducer
import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/users'


const usersSlice = createSlice({
  name: 'users',
  initialState: [],
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
})

export const initializeUsers = () => {
  return async (dispatch) => {
    const users = await userService.getAll()
    dispatch(setUsers(users))
  }
}

export const updateUser = (id, user) => {
  return async (dispatch) => {
    const updated = await userService.update(id, user)
    dispatch(update(updated))
  }
}




export const { update, appendUser, setUsers } = usersSlice.actions
export default usersSlice.reducer
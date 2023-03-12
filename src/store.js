import { configureStore } from '@reduxjs/toolkit'


import projectsReducer from './reducers/projectsReducer'
import rolesReducer from './reducers/rolesReducer'
import ticketsReducer from './reducers/ticketsReducer'
import userReducer from './reducers/userReducer'
import usersReducer from './reducers/usersReducer'


const store = configureStore({
  reducer: {
    user: userReducer,
    users: usersReducer,
    projects: projectsReducer,
    tickets: ticketsReducer
  },
})

export default store
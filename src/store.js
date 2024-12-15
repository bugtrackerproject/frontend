import { configureStore } from '@reduxjs/toolkit'


import projectsReducer from './reducers/projectsReducer'
import rolesReducer from './reducers/rolesReducer'
import ticketsReducer from './reducers/ticketsReducer'
import userReducer from './reducers/userReducer'
import usersReducer from './reducers/usersReducer'
import appReducer from './reducers/appReducer'


const store = configureStore({
    reducer: {
        app: appReducer,
        user: userReducer,
        users: usersReducer,
        projects: projectsReducer,
        tickets: ticketsReducer,
        roles: rolesReducer
    },
})

export default store
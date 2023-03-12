import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Routes, Route, useMatch, Navigate, Outlet
} from "react-router-dom"

import './app.scss'

import Home from './pages/home/Home'
import Login from './pages/login/Login'
import ManageRoles from './pages/manage/roles/ManageRoles'

import Logout from './pages/logout/Logout'


import projectService from './services/projects'
import ticketService from './services/tickets'
import roleService from './services/roles'
import userService from './services/users'


import Register from './pages/register/Register'
import ManageProjects from './pages/manage/projects/ManageProjects'

import { setUser } from './reducers/userReducer'
import { initializeUsers } from './reducers/usersReducer'
import { initializeProjects } from './reducers/projectsReducer'
import { initializeTickets } from './reducers/ticketsReducer'
import { initializeRoles } from './reducers/rolesReducer'
import store from './store'
import SingleProject from './pages/single/SingleProject'
import SingleTicket from './pages/single/SingleTicket'
import SingleUser from './pages/single/SingleUser'
import ListProjects from './pages/list/ListProjects'
import ListTickets from './pages/list/ListTickets'
import CreateProject from './pages/create/CreateProject'
import CreateTicket from './pages/create/CreateTicket'


const PrivateRoute = (props) => {
  let isLoggedIn = false

  const loggedUserJSON = window.localStorage.getItem("loggedBugtrackerAppUser");
  if (loggedUserJSON) {
    isLoggedIn = true
  }

  return ( isLoggedIn ? (
    <Outlet />
  ) : (
    <Navigate
      to="/login"
      replace={true}
    />
  ))
}

const AdminRoute = (props) => {
  const user = useSelector((state) => state.user)

  return ( user.role === "Admin" ? (
    <Outlet />
  ) : (
    <Navigate
      to="/forbidden"
      replace={true}
    />
  ))
}

const App = () => {
  const dispatch = useDispatch()
  const [isSidebarActive, setSidebarActive] = useState(false)

  const toggleSidebar = () => {
    setSidebarActive(!isSidebarActive);
  }

  const projects = useSelector((state) => state.projects)
  const users = useSelector((state) => state.users)
  const tickets = useSelector((state) => state.tickets)

  useEffect(() => {
    
    dispatch(initializeUsers())
    dispatch(initializeRoles())
    dispatch(initializeProjects())
    dispatch(initializeTickets())
  }, [dispatch])

  useEffect(() => {
    
    const loggedUserJSON = window.localStorage.getItem("loggedBugtrackerAppUser");
    if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON);
        dispatch(setUser(user))

        projectService.setToken(user.token)
        userService.setToken(user.token)
        roleService.setToken(user.token)
        ticketService.setToken(user.token)
      }

  })

  const matchProject = useMatch('/projects/:id')

  const project = matchProject 
    ? projects.find(a => a.id === matchProject.params.id) 
    : null


  const matchUser = useMatch('/users/:id')

  const user = matchUser 
    ? users.find(a => a.id === matchUser.params.id) 
    : null

  const matchTicket = useMatch('/tickets/:id')

  const ticket = matchTicket 
    ? tickets.find(a => a.id === matchTicket.params.id) 
    : null

  console.log(store.getState())
  

  
  return (

    <div className="App">
      
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />


        <Route path="/" element={<PrivateRoute />}>
          
          <Route index element={<Home isSidebarActive={isSidebarActive} toggleSidebar={toggleSidebar} />} />
          <Route path="logout" element={<Logout />} />

          <Route path="projects">
            <Route index element={<ListProjects isSidebarActive={isSidebarActive} toggleSidebar={toggleSidebar}  />} />
            <Route path=":id" element={<SingleProject project={project} isSidebarActive={isSidebarActive} toggleSidebar={toggleSidebar}  />} />
            <Route path="new" element={<CreateProject isSidebarActive={isSidebarActive} toggleSidebar={toggleSidebar}  />} />
          </Route>

          <Route path="tickets">
            <Route index element={<ListTickets isSidebarActive={isSidebarActive} toggleSidebar={toggleSidebar}  />} />
            <Route path=":id" element={<SingleTicket ticket={ticket} isSidebarActive={isSidebarActive} toggleSidebar={toggleSidebar}  />} />
            <Route path="new" element={<CreateTicket isSidebarActive={isSidebarActive} toggleSidebar={toggleSidebar}  />} />
          </Route>

          <Route path="users">
            
            <Route path=":id" element={<SingleUser user={user} isSidebarActive={isSidebarActive} toggleSidebar={toggleSidebar} />} />
          </Route>

          <Route path="admin/" element={<AdminRoute />}>
            <Route path="projects" element={<ManageProjects isSidebarActive={isSidebarActive} toggleSidebar={toggleSidebar} />} />
            <Route path="roles" element={<ManageRoles isSidebarActive={isSidebarActive} toggleSidebar={toggleSidebar} />} />
          </Route>

          <Route path="*" element={<h1>404</h1>} />
        </Route>
      </Routes> 

    </div>
  )
}

export default App
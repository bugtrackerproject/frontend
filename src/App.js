import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Routes, Route, useMatch, Navigate, Outlet, useLocation
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
import Sidebar from './components/sidebar/Sidebar'

import Spinner from './components/animations/Spinner';


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
    const location = useLocation(); 

    const [isSidebarActive, setSidebarActive] = useState(false)
    const [loading, setLoading] = useState(true);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    const toggleSidebar = () => {
        setSidebarActive(!isSidebarActive);
    }

    const projects = useSelector((state) => state.projects)
    const users = useSelector((state) => state.users)
    const tickets = useSelector((state) => state.tickets)

    useEffect(() => {
        const fetchData = async () => {
            try {
                await dispatch(initializeUsers());
                await dispatch(initializeRoles());
                await dispatch(initializeProjects());
                await dispatch(initializeTickets());
                setLoading(false);
            } catch (error) {
                console.error("Failed to initialize app:", error);
            }
        };
        fetchData();
    }, [dispatch]);


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

  }, [dispatch]);

    useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Update isMobile state on resize
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


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

  const isAuthPage = window.location.pathname === '/login' || window.location.pathname === '/register';
  
  
return (
  <div className="App">
    {loading ? (
      <Spinner />
    ) : (
      ['/login', '/register'].includes(location.pathname) ? (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      ) : (
        <>
          <Sidebar isSidebarActive={isSidebarActive} />
          <div
            className={`main-content ${isMobile && isSidebarActive ? 'sidebar-hidden' : ''}`}
            onClick={() => {
              if (isMobile && isSidebarActive) {
                setSidebarActive(false); // Close sidebar when clicked on main content on mobile
              }
            }}
          >
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              <Route path="/" element={<PrivateRoute />}>
                <Route index element={<Home toggleSidebar={toggleSidebar} />} />
                <Route path="logout" element={<Logout />} />

                <Route path="projects">
                  <Route index element={<ListProjects toggleSidebar={toggleSidebar} />} />
                  <Route path=":id" element={<SingleProject project={project} toggleSidebar={toggleSidebar} />} />
                  <Route path="new" element={<CreateProject toggleSidebar={toggleSidebar} />} />
                </Route>

                <Route path="tickets">
                  <Route index element={<ListTickets toggleSidebar={toggleSidebar} />} />
                  <Route path=":id" element={<SingleTicket ticket={ticket} toggleSidebar={toggleSidebar} />} />
                  <Route path="new" element={<CreateTicket toggleSidebar={toggleSidebar} />} />
                </Route>

                <Route path="users">
                  <Route path=":id" element={<SingleUser selectedUser={user} toggleSidebar={toggleSidebar} />} />
                </Route>

                <Route path="admin/" element={<AdminRoute />}>
                  <Route path="projects" element={<ManageProjects toggleSidebar={toggleSidebar} />} />
                  <Route path="roles" element={<ManageRoles toggleSidebar={toggleSidebar} />} />
                </Route>

                <Route path="*" element={<h1>404</h1>} />
              </Route>
            </Routes>
          </div>
        </>
      )
    )}
  </div>
);

}

export default App
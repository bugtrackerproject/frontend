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


import Register from './pages/register/Register'
import ManageProjects from './pages/manage/projects/ManageProjects'

import SingleProject from './pages/single/SingleProject'
import SingleTicket from './pages/single/SingleTicket'
import SingleUser from './pages/single/SingleUser'
import ListProjects from './pages/list/ListProjects'
import ListTickets from './pages/list/ListTickets'
import CreateProject from './pages/create/CreateProject'
import CreateTicket from './pages/create/CreateTicket'
import Sidebar from './components/sidebar/Sidebar'

import Spinner from './components/animations/Spinner';
import Loader from './components/animations/Loader';
import { useSwipeable } from 'react-swipeable';
import useAppInitialisation from './hooks/useAppInitialisation'
import Header from './components/header/Header'
import { toggleSidebar, setSidebar } from './reducers/appReducer'


const PrivateRoute = (props) => {
    const user = useSelector((state) => state.user)
    const initialiseApp = useAppInitialisation();
    const { loading } = useSelector((state) => state.app); 

    useEffect(() => {
        const checkAndInitialise = async () => {
            const loggedUserJSON = window.localStorage.getItem("loggedBugtrackerAppUser");

            if (loggedUserJSON && !user) {
                await initialiseApp();
            }
        };

        checkAndInitialise();
    }, [user, initialiseApp]);


    const loggedUserJSON = window.localStorage.getItem("loggedBugtrackerAppUser");
    const isLoggedIn = !!loggedUserJSON;


    if (loading) {
        return (
            <>
                <Header page="Loading..." />
                <Loader />;
            </>
            
        )
    }


    return (isLoggedIn ? (
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

    return (user.role === "Admin" ? (
        <Outlet />
    ) : (
        <Navigate
            to="/forbidden"
            replace={true}
        />
    ))
}

const App = () => {
    const location = useLocation();
    const dispatch = useDispatch();

    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const sidebar = useSelector((state) => state.app.sidebar);

    const swipeConfig = {
        onSwipedLeft: () => dispatch(setSidebar(false)),
        onSwipedRight: () => dispatch(setSidebar(true))
    };

    const swipeHandlers = useSwipeable(swipeConfig);

    const projects = useSelector((state) => state.projects.data)
    const users = useSelector((state) => state.users.data)

    const tickets = useSelector((state) => state.tickets.data)

    const initialiseApp = useAppInitialisation();

    useEffect(() => {
        initialiseApp()
    }, [])

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

    const matchProjects = useMatch('/projects')
    const matchTickets = useMatch('/tickets')
    const matchManageProjects = useMatch('/admin/projects')
    const matchManageRoles = useMatch('/admin/projects')

    const getHeaderTitle = () => {
        if (matchTickets) return 'Tickets';
        if (matchProjects) return 'Projects';
        if (matchManageProjects) return 'Manage Projects';
        if (matchManageRoles) return 'Manage User Roles';
        if (matchUser) return `${user.name}'s Profile`
        if (matchTicket) return `${ticket.name} Ticket Details`
        if (matchProject) return `${project.name} Project Details`
        return 'Home';
    };

    const handleSidebarToggle = () => {
        dispatch(toggleSidebar());
    };

    return (
        <div className="App">
            {
                ['/login', '/register'].includes(location.pathname) ? (
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                    </Routes>
                ) : (
                    <>

                            <Sidebar isSidebarActive={sidebar} setSidebarActive={handleSidebarToggle} />
                        
                        <div
                            className={`main-content ${isMobile && sidebar ? 'sidebar-hidden' : ''}`}
                            onClick={() => {
                                if (isMobile && sidebar) {
                                    dispatch(setSidebar(false)); // Close sidebar when clicked on main content on mobile
                                }
                            }}
                        >

                            <div
                                {...swipeHandlers}
                                className={'swipeable-area'}
                            />
                                <Header page={getHeaderTitle()} toggleSidebar={handleSidebarToggle} />
                            <Routes>

                                <Route path="/" element={<PrivateRoute />}>
                                    <Route index element={<Home />} />
                                    <Route path="logout" element={<Logout />} />

                                    <Route path="projects">
                                        <Route index element={<ListProjects />} />
                                        <Route path=":id" element={<SingleProject project={project} />} />
                                        <Route path="new" element={<CreateProject />} />
                                    </Route>

                                    <Route path="tickets">
                                        <Route index element={<ListTickets />} />
                                      
                                        <Route path="new" element={<CreateTicket  />} />
                                    </Route>

                                    <Route path="users">
                                        <Route path=":id" element={<SingleUser selectedUser={user} />} />
                                    </Route>

                                    <Route path="admin/" element={<AdminRoute />}>
                                        <Route path="projects" element={<ManageProjects />} />
                                        <Route path="roles" element={<ManageRoles />} />
                                    </Route>

                                    <Route path="*" element={<h1>404</h1>} />
                                </Route>
                            </Routes>
                        </div>
                    </>
                )
            }
        </div>
    );

}

export default App
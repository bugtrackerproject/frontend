import "./sidebar.scss"
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import AssignmentIcon from '@mui/icons-material/Assignment';
import FolderIcon from '@mui/icons-material/Folder';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import FolderCopyIcon from '@mui/icons-material/FolderCopy';
import PestControlIcon from '@mui/icons-material/PestControl';

import Stack from '@mui/material/Stack';

import { useSelector } from "react-redux";

import {
  NavLink
} from "react-router-dom"


const Sidebar = ({ isSidebarActive }) => {
  const user = useSelector(state => state.user)

  console.log(isSidebarActive)

  return user ? (
    
    <div className={isSidebarActive ? "sidebar toggle" : "sidebar"}>
    
        <div className="sidebar-brand">
          <label className="sidebar-brand-icon" for="nav-toggle">
            <Stack direction="row" alignItems="center" gap={1}>
              <PestControlIcon className={`logo ${isSidebarActive ? 'reverseRotate' : 'rotate'}`}  sx={{fontSize:'3rem', paddingRight: "0.5rem" }}/>
              <div className="sidebar-text" style={{fontSize: "2rem"}}>
                bugtracker
              </div>
            </Stack>
          </label>
        </div>
    
        <ul className="sidebar-menu">
    
  
          <li>
            <NavLink className="sidebar-link" to="/">
              <Stack direction="row" alignItems="center" gap={1}>
                <DashboardIcon className="material-icons" sx={{fontSize:'2rem', paddingRight: "0.5rem",}}/>
                <div className="sidebar-text">Dashboard</div>
              </Stack>
            </NavLink>
          </li>
  


          <li>
            <NavLink className="sidebar-link" to="/tickets">
              <Stack direction="row" alignItems="center" gap={1}>
                <AssignmentIcon sx={{fontSize:'2rem', paddingRight: "0.5rem",}}/>
                <div className="sidebar-text">Tickets</div>
              </Stack>
            </NavLink>
          </li>
  
          <li>
            <NavLink className="sidebar-link" to="/projects">
                <Stack direction="row" alignItems="center" gap={1}>
                  <FolderIcon sx={{fontSize:'2rem', paddingRight: "0.5rem",}}/>
                  <div className="sidebar-text">Projects</div>
                </Stack>
            </NavLink>
          </li>


          { user.role === "Admin" &&
            <>
              <li>
                <NavLink className="sidebar-link" to="/admin/projects">
                    <Stack direction="row" alignItems="center" gap={1}>
                      <FolderCopyIcon sx={{fontSize:'2rem', paddingRight: "0.5rem",}}/>
                      <div className="sidebar-text">Manage Projects</div>
                    </Stack>
                </NavLink>
              </li>
              
              <li>
                <NavLink className="sidebar-link" to="/admin/roles">
                    <Stack direction="row" alignItems="center" gap={1}>
                      <ManageAccountsIcon sx={{fontSize:'2rem', paddingRight: "0.5rem",}}/>
                      <div className="sidebar-text">Manage Users</div>
                    </Stack>
                </NavLink>
              </li>
            </>
          }
            
          
  
          <li>
            <NavLink className="sidebar-link" to={`/users/${user.id}`}>
              <Stack direction="row" alignItems="center" gap={1}>
                <PersonIcon sx={{fontSize:'2rem', paddingRight: "0.5rem",}}/>
                <div className="sidebar-text">My Profile</div>
              </Stack>
            </NavLink>
          </li>

          <li>
            <NavLink className="sidebar-link" to="/logout">
                <Stack direction="row" alignItems="center" gap={1}>
                  <LogoutIcon sx={{fontSize:'2rem', paddingRight: "0.5rem",}}/>
                  <div className="sidebar-text">Logout</div>
                </Stack>
            </NavLink>
          </li>

        </ul>
    </div>
    
  ) : null
}

export default Sidebar
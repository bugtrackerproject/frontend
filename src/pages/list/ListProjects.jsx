import React from 'react'
import "./list.scss"

import ProjectsTable from '../../components/tables/ProjectsTable'
import Sidebar from '../../components/sidebar/Sidebar'
import Header from '../../components/header/Header'
import { useSelector } from 'react-redux'
import { Button } from '@mui/material'

import { useNavigate } from 'react-router-dom'

const ListProjects = ({ isSidebarActive, toggleSidebar }) => {
    const navigate = useNavigate()
    const user = useSelector(state => state.user)

    const handleCreateProject = async (e) => {
        e.preventDefault()
    
        navigate("new")
    
    }
        

  return user ? (
    <>
        <Sidebar isSidebarActive={isSidebarActive}/>
        
        <div className="main-content">
          <Header page={"My Projects"} user={user} toggleSidebar={toggleSidebar}/>


          <main>
            <div>
               
              <Button sx={{ minWidth: 150 }} variant="outlined" onClick={handleCreateProject} >Create new project</Button>
             
            </div>
            <div className="tableWrapper">
              <div className="main-title">PROJECTS</div>
            
              <ProjectsTable filter={"user"} value={user} />
            </div>
          </main>
        </div>
    </>
  ) : null
}

export default ListProjects
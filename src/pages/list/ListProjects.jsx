import React from 'react'

import ProjectsTable from '../../components/tables/ProjectsTable'
import Header from '../../components/header/Header'
import { useSelector } from 'react-redux'
import { Button } from '@mui/material'

import { useNavigate } from 'react-router-dom'

const ListProjects = ({ toggleSidebar }) => {
    const navigate = useNavigate()
    const user = useSelector(state => state.user)

    const handleCreateProject = async (e) => {
        e.preventDefault()
    
        navigate("new")
    
    }
        

  return user ? (
    <>  
        <Header page={"My Projects"} user={user} toggleSidebar={toggleSidebar}/>


          <main>
              <div className="flexWrapper">
                  <div className="formWrapper">
                      <div className="button">

                          <Button sx={{ marginBottom: 4, minWidth: 150, backgroundColor: '##2873ff' }} variant="contained" onClick={handleCreateProject}>Create New Project</Button>

                      </div>
                  </div>
                  <div className="table-wrapper">
                      <div className="formHeader">
                          <h2>Assigned Projects</h2>
                      </div>
                      <div className="tableContainer">
                          <ProjectsTable filter={"user"} value={user} /> </div>
                     </div>
              </div>
        </main>

    </>
  ) : null
}

export default ListProjects
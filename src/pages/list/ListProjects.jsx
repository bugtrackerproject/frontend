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
          <main>
              <div className="flex-wrapper">
                  <div className="table-wrapper">
                      <div className="form-header">
                          <h2>Assigned Projects</h2>
                      </div>
                      <div className="mui-table-container">
                          <ProjectsTable filter={"user"} value={user} /> </div>
                     </div>
              </div>
        </main>

    </>
  ) : null
}

export default ListProjects
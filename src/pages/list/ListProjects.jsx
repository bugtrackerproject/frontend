import React from 'react'

import ProjectsTable from '../../components/tables/ProjectsTable'
import Header from '../../components/header/Header'
import { useSelector } from 'react-redux'
import { Button } from '@mui/material'
import { selectUserProjects } from '../../reducers/appReducer'
import { useNavigate } from 'react-router-dom'

const ListProjects = () => {
    const projects = useSelector(selectUserProjects);


  return (
    <>  
          <main>
                <div className="flex-wrapper">
                    <div className="table-wrapper">
                        <div className="form-header">
                            <h2>Assigned Projects</h2>
                        </div>
                        <div className="mui-table-container">
                            <ProjectsTable projects={projects} /> 
                        </div>
                    </div>
              </div>
        </main>

    </>
  )
}

export default ListProjects
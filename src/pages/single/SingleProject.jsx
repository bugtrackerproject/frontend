import "./single.scss"

import Header from '../../components/header/Header'

import { useSelector } from 'react-redux'

import UsersTable from "../../components/tables/UsersTable"
import TicketsTable from "../../components/tables/TicketsTable"


const SingleProject = ({ project, toggleSidebar }) => {

  const user = useSelector(state => state.user)

  return project ? (
    <>
        <Header page={project.name} user={user} toggleSidebar={toggleSidebar} />


        <main>
              <div className="flex-wrapper">
                  <div className="formWrapper">

                      <div className="form-header">
                          <h2>PROJECT DETAILS</h2>
                      </div>

                      <div className="form-container">

                          <div>
                              <div className="main-title">PROJECT TITLE</div>
                              {project.name}
                              <div className="main-title">PROJECT DESCRIPTION</div>
                              {project.description}
                          </div>


                          <div className="table-wrapper">
                              <div className="main-title">ASSIGNED USERS</div>
                              <div className="table-container">
                                  <UsersTable filter="project" value={project} />
                              </div>
                          </div>

                          <div className="table-wrapper">
                              <div className="main-title">TICKETS FOR PROJECT</div>
                              <div className="table-container">
                                  <TicketsTable filter="project" value={project} />
                              </div>
                          </div>
                      </div>
           
                </div>
            </div>
        </main>
    </>
  ) : null
}

export default SingleProject
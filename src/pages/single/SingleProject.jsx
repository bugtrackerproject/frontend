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
              <div className="flexWrapper">
                  <div className="formWrapper">

                      <div className="formHeader">
                          <h2>PROJECT DETAILS</h2>
                      </div>

                      <div className="formContainer">

                          <div>
                              <div className="mainTitle">PROJECT TITLE</div>
                              {project.name}
                              <div className="mainTitle">PROJECT DESCRIPTION</div>
                              {project.description}
                          </div>


                          <div className="table-wrapper">
                              <div className="mainTitle">ASSIGNED USERS</div>
                              <div className="tableContainer">
                                  <UsersTable filter="project" value={project} />
                              </div>
                          </div>

                          <div className="table-wrapper">
                              <div className="mainTitle">TICKETS FOR PROJECT</div>
                              <div className="tableContainer">
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
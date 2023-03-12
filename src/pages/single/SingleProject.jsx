import "./single.scss"

import Sidebar from '../../components/sidebar/Sidebar'
import Header from '../../components/header/Header'

import { useSelector } from 'react-redux'

import UsersTable from "../../components/tables/UsersTable"
import TicketsTable from "../../components/tables/TicketsTable"


const SingleProject = ({ project, isSidebarActive, toggleSidebar }) => {

  const user = useSelector(state => state.user)

  return project ? (
    <>
        <Sidebar isSidebarActive={isSidebarActive}/>
        
        <div className="main-content">
          <Header page={project.name} user={user} toggleSidebar={toggleSidebar} />


          <main>
            <div className="main-title">PROJECT TITLE</div>
              {project.name}

              <div className="main-title">PROJECT DESCRIPTION</div>
              {project.description}

              <div className="main-title">ASSIGNED USERS</div>
              <UsersTable filter="project" value={project}/>

              <div className="main-title">TICKETS FOR PROJECT</div>
              <TicketsTable filter="project" value={project}/>
           
                

          </main>
      </div>
    </>
  ) : null
}
//<BasicTable type="Tickets"/>
export default SingleProject
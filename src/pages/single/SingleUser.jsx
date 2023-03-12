import "./single.scss"

import Sidebar from '../../components/sidebar/Sidebar'
import { useSelector } from "react-redux"

import ProjectsTable from "../../components/tables/ProjectsTable"
import TicketsTable from "../../components/tables/TicketsTable"
import Header from "../../components/header/Header"


const SingleUser = ({ isSidebarActive, toggleSidebar }) => {
  const user = useSelector(state => state.user)

  return user ? (
    <>
        <Sidebar isSidebarActive={isSidebarActive} />
        
        <div className="main-content">
          <Header page={"My Profile"} user={user} toggleSidebar={toggleSidebar}/>


          <main>
            <div className='split'>
              <div className="splitProject">
                <div className="main-title">EMAIL</div>
                  {user.email}
                  <div className="main-title">NAME</div>
                  {user.name}
                  <div className="main-title">ROLE</div>
                  {user.role}
                  <div className="main-title">ASSIGNED PROJECTS</div>
                  <ProjectsTable filter="user" value={user}/>
                  <div className="main-title">ASSIGNED TICKETS</div>
                  <TicketsTable filter="user" value={user}/>
                </div>
            
              </div>
          </main>
      </div>
    </>
  ) : null
}
//<BasicTable type="Tickets"/>
export default SingleUser
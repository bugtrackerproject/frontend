
import { useSelector } from 'react-redux'
import Header from '../../components/header/Header'
import ProjectsTable from '../../components/tables/ProjectsTable'
import TicketsTable from '../../components/tables/TicketsTable'
import Widget from '../../components/widgets/Widget'
import "./home.scss"


const Home = ({ toggleSidebar }) => {

  let ticketsSelector = useSelector(state => state.tickets)
  let tickets = ticketsSelector.slice()

  let projectsSelector = useSelector((state) => state.projects)
  let projects = projectsSelector.slice()

  
  const user = useSelector(state => state.user)


  projects = projectsSelector.filter(project => project.users.some(
    u => u === user.id
  ))

  tickets = ticketsSelector.filter(ticket => ticket.assignee === user.id)

  const totals = {
    tickets: tickets.length,
    projects: projects.length,
    todo: (tickets.filter(t => {
      return t.status==="To Do"
    })).length,
    inprogress: (tickets.filter(t => {
      return t.status==="In Progress"
    })).length,
    completed: (tickets.filter(t => {
      return t.status==="Completed"
    })).length
  }

  return user ? (
    <>
        <Header page={"Dashboard"} user={user} toggleSidebar={toggleSidebar}/>

        <main>

            <div className="main-title">TOTAL</div>
            <div className="widgets">
                <Widget type="tickets" count={totals.tickets}/>
                <Widget type="projects" count={totals.projects}/>
            </div>

            <hr />

            <div className="main-title">TICKET PROGRESS</div>
            <div className="widgets">
              
                <Widget type="to do" count={totals.todo}/>
                <Widget type="in progress" count={totals.inprogress}/>
                <Widget type="completed" count={totals.completed}/>
            </div>
            <div className="tables">
                <div className="tableWrapper">
                <div className="main-title">RECENT TICKETS</div>
                <TicketsTable filter="user" value={user} />
                </div>
                <div className='tableWrapper'>
                <div className="main-title">RECENT PROJECTS</div>
                <ProjectsTable filter="user" value={user} />
                </div>
            </div>
          

        </main>
      </>
  ) : null
}

export default Home


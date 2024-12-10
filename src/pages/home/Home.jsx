
import { useSelector } from 'react-redux'
import ProjectsTable from '../../components/tables/ProjectsTable'
import TicketsTable from '../../components/tables/TicketsTable'
import Widget from '../../components/widgets/Widget'
import "./home.scss"


const Home = () => {

  let ticketsSelector = useSelector(state => state.tickets.data)
  let tickets = ticketsSelector.slice()

  let projectsSelector = useSelector((state) => state.projects.data)
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

        <main>
            
              <div className="flex-wrapper">
            
            <div className="widgets-header">
                <h2>Total</h2>
            </div>
            <div className="widgets">

                
                  <Widget type="tickets" count={totals.tickets}/>
                  <Widget type="projects" count={totals.projects}/>

            </div>
           
       

            <div className="widgets-header">
                <h2>Ticket Progress</h2>
            </div>
            <div className="widgets">
                <Widget type="to do" count={totals.todo}/>
                <Widget type="in progress" count={totals.inprogress}/>
                <Widget type="completed" count={totals.completed}/>
            </div>

            <div className="table-wrapper">
                    <div className="form-header">
                        <h2>Recent Tickets</h2>
                    </div>
                <TicketsTable filter="user" value={user} />
            </div>
            <div className='table-wrapper'>
                <div className="form-header">
                        <h2>Recent Projects</h2>
                    </div>
                <ProjectsTable filter="user" value={user} />
                </div>
                  </div>

        </main>
      </>
  ) : null
}

export default Home

